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
import { Destination } from '../destinations/entities/destination.entity';
import { Hotel } from '../hotels/entities/hotel.entity';
import { OffreDate } from '../offres_dates/entities/offre_date.entity';

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

  async findAll(): Promise<FindOfferDto[]> {
    const offers = await this.offreRepository.findAll({ populate: ['destinations', 'hotels', 'offreDates'] });
    return offers.map(mapToFindOfferDto);
  }

  async findOne(id: number): Promise<FindOfferDto> {
    const offer = await this.offreRepository.findOne(id, { populate: ['destinations', 'hotels', 'offreDates'] });

    if (!offer) throw new NotFoundException(`Offre with ID ${id} not found`);

    return mapToFindOfferDto(offer);
  }

  async fetchAndStore() {
    const em = this.em.fork();
    try {
      const offres = await this.fetchExternalOffers(em);
      this.logger.info(`Successfully synced ${offres.length} offers`, 'OffresService');
    } catch (error) {
      this.logger.error('Failed to fetch and store offers', 'OffresService', error.stack);
      throw new InternalServerErrorException('Offer sync failed');
    }
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

  private async fetchExternalOffers(em: EntityManager): Promise<Offre[]> {
    const { token } = await this.fetchToken();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/syncOffers`, { headers }));
      
      const data = response.data;
      if (!Array.isArray(data) || data.length === 0) return [];

      const offers = data.map(item => this.mapOffer(item, em));
      await em.persistAndFlush(offers);
      return offers;
    } catch (error) {
      this.logger.error('Failed to fetch external offers', 'OffresService', error.stack);
      throw new InternalServerErrorException('Failed to fetch external offers');
    }
  }

  private mapOffer(item: any, em: EntityManager): Offre {
    const offer = em.create(Offre, {
      cle_composee: item.key,
      cle_doublon: item.duplicateKey,
      package: item.package,
      type: item.type,
      prix: item.prix,
      remise: item.remise,
      promo: item.promo,
      url_scraped: item.urlScraped,
      url_source: item.urlSource,
      date_scraping: item.dateScraping ? new Date(item.dateScraping) : new Date(),
      date_cree: new Date(),
    });

    if (item.destinations?.length) this.mapDestinations(item.destinations, offer, em);
    if (item.hotels?.length) this.mapHotels(item.hotels, offer, em);
    if (item.offresDates?.length) this.mapOffreDates(item.offresDates, offer, em);

    return offer;
  }

  private mapDestinations(destinations: Destination[], offer: Offre, em: EntityManager): void {
    destinations.forEach(destinationItem => {
      const destination = em.create(Destination, {
        pays: destinationItem.pays,
        ville: destinationItem.ville,
        depart_retour: destinationItem.depart_retour || null,
        offre: offer,
      });
      offer.destinations.add(destination);
    });
  }

  private mapHotels(hotels: Hotel[], offer: Offre, em: EntityManager): void {
    hotels.forEach(hotelItem => {
      const hotel = em.create(Hotel, {
        nom: hotelItem.nom,
        etoiles: hotelItem.etoiles,
        offre: offer,
      });
      offer.hotels.add(hotel);
    });
  }

  private mapOffreDates(offresDates: OffreDate[], offer: Offre, em: EntityManager): void {
    offresDates.forEach(dateItem => {
      const offreDate = em.create(OffreDate, {
        date_depart: dateItem.date_depart,
        date_retour: dateItem.date_retour,
        nb_jours: dateItem.nb_jours,
        mois_voyage: dateItem.mois_voyage,
        annee_voyage: dateItem.annee_voyage,
        offre: offer,
      });
      offer.offreDates.add(offreDate);
    });
  }
}
