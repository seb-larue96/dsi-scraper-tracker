import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Destination } from "src/application/destinations/entities/destination.entity";
import { Hotel } from "src/application/hotels/entities/hotel.entity";
import { OffreDate } from "src/application/offres_dates/entities/offre_date.entity";
import { OffresPrixHistorique } from "src/application/offres_prix_historique/entities/offres_prix_historique.entity";

@Entity()
export class Offre {
    @PrimaryKey()
    id: number;
  
    @Property()
    cle_composee: string;

    @Property()
    cle_doublon: string;

    @Property()
    package: string;

    @Property()
    type: string;

    @Property()
    prix: string;

    @Property({ nullable: true })
    remise?: string;

    @Property({ nullable: true })
    promo?: string;

    @Property()
    url_scraped: string;

    @Property()
    url_source: string;

    @Property({ type: 'datetime' })
    date_scraping: Date;

    @Property({ type: 'datetime', onCreate: () => new Date() })
    date_cree: Date;

    @OneToMany(() => Destination, destination => destination.offre)
    destinations = new Collection<Destination>(this);

    @OneToMany(() => Hotel, hotel => hotel.offre)
    hotels = new Collection<Hotel>(this);

    @OneToMany(() => OffreDate, offreDate => offreDate.offre)
    offreDates = new Collection<OffreDate>(this);

    @OneToMany(() => OffresPrixHistorique, offresPrixHistorique => offresPrixHistorique.offre)
    offresPrixHistorique = new Collection<OffresPrixHistorique>(this);
}
