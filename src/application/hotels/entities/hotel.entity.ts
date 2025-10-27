import { Entity, Index, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Offre } from "src/application/offres/entities/offre.entity";

@Entity()
export class Hotel {
    @PrimaryKey()
    id: number;

    @ManyToOne(() => Offre, { hidden: true })
    offre: Offre;

    @Property({ nullable: true })
    nom?: string;

    @Property({ nullable: true })
    etoiles?: number;
}