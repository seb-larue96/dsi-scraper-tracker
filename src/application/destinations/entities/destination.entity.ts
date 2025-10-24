import { Entity, Index, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Offre } from "src/application/offres/entities/offre.entity";

@Entity()
export class Destination {
    @PrimaryKey()
    id: number;

    @ManyToOne(() => Offre)
    offre: Offre;

    @Property({ nullable: true })
    pays?: string;

    @Property({ nullable: true })
    ville?: string;

    @Property({ nullable: true })
    depart_retour?: string;
}