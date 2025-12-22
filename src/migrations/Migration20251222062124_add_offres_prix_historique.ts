import { Migration } from '@mikro-orm/migrations';

export class Migration20251222062124_add_offres_prix_historique extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`offres_prix_historique\` (\`id\` int unsigned not null auto_increment primary key, \`offre_id\` int unsigned not null, \`prix\` varchar(255) not null, \`devise\` varchar(255) not null, \`date_scraped\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`offres_prix_historique\` add index \`offres_prix_historique_offre_id_index\`(\`offre_id\`);`);

    this.addSql(`alter table \`offres_prix_historique\` add constraint \`offres_prix_historique_offre_id_foreign\` foreign key (\`offre_id\`) references \`offre\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`offres_prix_historique\`;`);
  }

}
