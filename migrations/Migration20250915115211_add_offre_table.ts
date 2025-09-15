import { Migration } from '@mikro-orm/migrations';

export class Migration20250915115211_add_offre_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`offre\` (\`id\` int unsigned not null auto_increment primary key, \`key\` varchar(255) not null, \`destination\` varchar(255) null, \`hotel\` varchar(255) null, \`type\` varchar(255) null, \`prix\` numeric(10,2) null, \`url_site\` varchar(255) null, \`url_scraper\` varchar(255) not null, \`scraped_at\` date not null) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`offre\`;`);
  }

}
