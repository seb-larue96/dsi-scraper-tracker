import { Migration } from '@mikro-orm/migrations';

export class Migration20251024100957_initialMigration extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`log\` (\`id\` int unsigned not null auto_increment primary key, \`level\` varchar(255) not null, \`message\` varchar(255) not null, \`context\` text null, \`stack\` text null, \`timestamp\` datetime not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`offre\` (\`id\` int unsigned not null auto_increment primary key, \`cle_composee\` varchar(255) not null, \`package\` varchar(255) not null, \`type\` varchar(255) not null, \`prix\` varchar(255) not null, \`remise\` varchar(255) null, \`promo\` varchar(255) null, \`url_scraped\` varchar(255) not null, \`url_source\` varchar(255) not null, \`date_scraping\` datetime not null, \`date_cree\` datetime not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`hotel\` (\`id\` int unsigned not null auto_increment primary key, \`offre_id\` int unsigned not null, \`nom\` varchar(255) null, \`etoiles\` int null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`hotel\` add index \`hotel_offre_id_index\`(\`offre_id\`);`);

    this.addSql(`create table \`destination\` (\`id\` int unsigned not null auto_increment primary key, \`offre_id\` int unsigned not null, \`pays\` varchar(255) null, \`ville\` varchar(255) null, \`depart_retour\` varchar(255) null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`destination\` add index \`destination_offre_id_index\`(\`offre_id\`);`);

    this.addSql(`create table \`offre_date\` (\`id\` int unsigned not null auto_increment primary key, \`offre_id\` int unsigned not null, \`date_depart\` varchar(255) null, \`date_retour\` varchar(255) null, \`nb_jours\` int not null, \`mois_voyage\` varchar(255) null, \`annee_voyage\` int null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`offre_date\` add index \`offre_date_offre_id_index\`(\`offre_id\`);`);

    this.addSql(`alter table \`hotel\` add constraint \`hotel_offre_id_foreign\` foreign key (\`offre_id\`) references \`offre\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`destination\` add constraint \`destination_offre_id_foreign\` foreign key (\`offre_id\`) references \`offre\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`offre_date\` add constraint \`offre_date_offre_id_foreign\` foreign key (\`offre_id\`) references \`offre\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`hotel\` drop foreign key \`hotel_offre_id_foreign\`;`);

    this.addSql(`alter table \`destination\` drop foreign key \`destination_offre_id_foreign\`;`);

    this.addSql(`alter table \`offre_date\` drop foreign key \`offre_date_offre_id_foreign\`;`);

    this.addSql(`drop table if exists \`log\`;`);

    this.addSql(`drop table if exists \`offre\`;`);

    this.addSql(`drop table if exists \`hotel\`;`);

    this.addSql(`drop table if exists \`destination\`;`);

    this.addSql(`drop table if exists \`offre_date\`;`);
  }

}
