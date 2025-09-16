import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Log {
    @PrimaryKey()
    id: number;

    @Property()
    level: 'info' | 'error';

    @Property()
    message: string; 

    @Property({ nullable: true, type: 'text' })
    context?: string;

    @Property({ nullable: true, type: 'text' })
    stack?: string;

    @Property({ onCreate: () => new Date() })
    timestamp: Date;
}