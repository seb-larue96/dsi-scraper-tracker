import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Offre {
    @PrimaryKey()
    id: number;
  
    @Property()
    key: string;

    @Property({ nullable: true })
    destination?: string;

    @Property({ nullable: true })
    hotel?: string;

    @Property({ nullable: true })
    type?: string;

    @Property({ nullable: true })
    prix?: string;

    @Property({ nullable: true })
    urlSite?: string;

    @Property()
    urlScraper: string;

    @Property({ type: 'date' })
    scrapedAt: Date;
}
