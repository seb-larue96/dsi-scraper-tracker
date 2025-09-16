import { Offre } from "../entities/offre.entity";
import { FindOfferDto } from "../dto/find-offer.dto";

export function mapToFindOfferDto(offer: Offre): FindOfferDto {
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