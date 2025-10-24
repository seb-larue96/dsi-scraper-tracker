import { Offre } from "../entities/offre.entity";
import { FindOfferDto } from "../dto/find-offer.dto";

export function mapToFindOfferDto(offer: Offre): FindOfferDto {
    return {
        id: offer.id,
        key: offer.cle_composee,
        type: offer.type,
        prix: offer.prix,
        urlScraped: offer.url_scraped,
        urlSource: offer.url_source,
        dateScraping: offer.date_scraping.toString()
    }
}