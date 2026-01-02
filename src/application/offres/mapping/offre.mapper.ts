import { Offre } from "../entities/offre.entity";
import { FindOfferDto } from "../dto/find-offer.dto";

export function mapToFindOfferDto(offer: Offre): FindOfferDto {
    return {
        id: offer.id,
        key: offer.cle_composee,
        duplicateKey: offer.cle_doublon,
        type: offer.type,
        prix: offer.prix,
        urlScraped: offer.url_scraped,
        urlSource: offer.url_source,
        dateScraping: offer.date_scraping.toString(),
        destination: offer.destinations
            ? offer.destinations.getItems().map(destination => ({
                id: destination.id,
                name: destination.pays,
                ville: destination.ville,
                depart_retour: destination.depart_retour,
            }))
        : [],
        hotel: offer.hotels
            ? offer.hotels.getItems().map(hotel => ({
                id: hotel.id,
                nom: hotel.nom,
                etoiles: hotel.etoiles,
            }))
        : [],
        offreDate: offer.offreDates
            ? offer.offreDates.getItems().map(offreDate => ({
                id: offreDate.id,
                date_depart: offreDate.date_depart,
                date_retour: offreDate.date_retour,
                nb_jours: offreDate.nb_jours,
                mois_voyage: offreDate.mois_voyage,
                annee_voyage: offreDate.annee_voyage,
            }))
        : [],
        offrePrixHistorique: offer.offrePrixHistorique
            ? offer.offrePrixHistorique.getItems().map(offrePrixHistorique => ({
                id: offrePrixHistorique.id,
                prix: offrePrixHistorique.prix,
                devise: offrePrixHistorique.devise,
                date_scraped: offrePrixHistorique.date_scraped.toString(),
            }))
        : [],
    }
}