import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Offre } from "src/application/offres/entities/offre.entity";

@Entity()
export class OffresPrixHistorique {
    @PrimaryKey()
    id: number;

    @ManyToOne(() => Offre, { hidden: true })
    offre: Offre;

    @Property()
    prix: string;

    @Property()
    devise: string;

    @Property({ type: 'datetime' })
    date_scraped: Date;
}