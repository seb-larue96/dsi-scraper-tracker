import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Offre } from './entities/offre.entity';
import { FindOfferDto } from './dto/find-offer.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OffresService {
  private readonly apiUrl?: string;

  constructor(
    @InjectRepository(Offre)
    private readonly offreRepository: EntityRepository<Offre>,
    private readonly em: EntityManager,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiUrl = this.configService.get<string>('API_URL');
    if (!this.apiUrl) {
      throw new Error('API_URL is not set in the environment variables');
    }
  }

  async fetchAndStore() {
    try {
      const offres = await this.fetchExternalOffers();
      await this.saveOffers(offres);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<FindOfferDto[]> {
    const offers = await this.offreRepository.findAll();
    return offers.map(this.mapToFindOfferDto);
  }

  async findOne(id: number) {
    const offer = await this.offreRepository.findOne({ id });

    if (!offer) throw new NotFoundException(`Offre with ID ${id} not found`);

    return this.mapToFindOfferDto(offer);
  }

  private async fetchExternalOffers(): Promise<Offre[]> {
    const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/syncOffers`));
    const rawData = response.data;

    if (!rawData) return [];

    return rawData.map((item: Offre) => this.em.create(Offre, item));
  }

  private async saveOffers(offres: Offre[]) {
    this.em.persist(offres);
    await this.em.flush();
  }

  private mapToFindOfferDto(offer: Offre): FindOfferDto {
    return {
      id: offer.id,
      key: offer.key,
      destination: offer.destination,
      hotel: offer.hotel,
      type: offer.type,
      prix: offer.prix,
      urlSite: offer.urlSite,
      urlScraper: offer.urlScraper,
      scrapedAt: offer.scrapedAt.toString()
    }
  }
}
