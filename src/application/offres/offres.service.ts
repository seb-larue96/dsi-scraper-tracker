import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { LoggerService } from 'src/logger/logger.service';
import { Offre } from './entities/offre.entity';
import { FindOfferDto } from './dto/find-offer.dto';
import { mapToFindOfferDto } from './mapping/offre.mapper';
import { firstValueFrom } from 'rxjs';
import { TokenResponseDto } from 'src/common/dto/token-reponse.dto';

@Injectable()
export class OffresService {
  private readonly apiUrl?: string;

  constructor(
    @InjectRepository(Offre)
    private readonly offreRepository: EntityRepository<Offre>,
    private readonly em: EntityManager,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly logger: LoggerService
  ) {
    this.apiUrl = this.configService.get<string>('API_URL');
    if (!this.apiUrl) {
      throw new Error('API_URL is not set in the environment variables');
    }
  }

  async fetchAndStore() {
    try {
      const forkedEm = this.em.fork();
      const offres = await this.fetchExternalOffers(forkedEm);
      await this.saveOffers(forkedEm, offres);
      this.logger.info(`Successfully synced ${offres.length} offers`, 'OffresService');
    } catch (error) {
      this.logger.error('Failed to fetch and store offers', 'OffresService', error.stack);
      throw new InternalServerErrorException('Offer sync failed');
    }
  }

  async findAll(): Promise<FindOfferDto[]> {
    const offers = await this.offreRepository.findAll();
    return offers.map(mapToFindOfferDto);
  }

  async findOne(id: number) {
    const offer = await this.offreRepository.findOne({ id });

    if (!offer) throw new NotFoundException(`Offre with ID ${id} not found`);

    return mapToFindOfferDto(offer);
  }

  private async fetchToken(): Promise<TokenResponseDto> {
    try {
      const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/getToken`));
      return response.data;
    } catch(error) {
      this.logger.error('Failed to fetch token', 'OffresServices', error.stack);
      throw new InternalServerErrorException('Failed to fetch token');
    }
  }

  private async fetchExternalOffers(forkedEm: EntityManager): Promise<Offre[]> {
    const responseToken = (await this.fetchToken()).token;
    
    try {
      const headersRequest = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${responseToken}`
      }

      const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/syncOffers`, { headers: headersRequest }));
      const rawData = response.data;

      if (!rawData) return [];

      return rawData.map((item: Offre) => forkedEm.create(Offre, item));
    } catch(error) {
      this.logger.error('Failed to fetch external offers', 'OffresService', error.stack)
      throw new InternalServerErrorException('Failed to fetch external offers');
    }
  }

  private async saveOffers(forkedEm: EntityManager, offres: Offre[]) {
    forkedEm.persist(offres);
    await forkedEm.flush();
  }
}
