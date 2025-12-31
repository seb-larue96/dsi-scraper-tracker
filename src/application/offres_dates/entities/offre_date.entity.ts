import { Entity, Index, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Offre } from "src/application/offres/entities/offre.entity";

@Entity()
export class OffreDate {
    @PrimaryKey()
    id: number;

    @ManyToOne(() => Offre, { hidden: true })
    offre: Offre;

    @Property({ nullable: true })
    date_depart?: string;

    @Property({ nullable: true })
    date_retour?: string;

    @Property()
    nb_jours: string;

    @Property({ nullable: true })
    mois_voyage?: string;

    @Property({ nullable: true })
    annee_voyage?: string;
}