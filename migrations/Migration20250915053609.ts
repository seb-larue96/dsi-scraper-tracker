import { Migration } from '@mikro-orm/migrations';

export class Migration20250915053609 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`offre\` (\`id\` int unsigned not null auto_increment primary key, \`key\` varchar(255) not null, \`hotel\` varchar(255) null, \`type\` varchar(255) null, \`prix\` numeric(10,2) null, \`url_site\` varchar(255) not null, \`scraped_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`drop table if exists \`test_connexion\`;`);

    this.addSql(`drop table if exists \`scraped_offers\`;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table \`test_connexion\` (\`id\` int null default NULL) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`scraped_offers\` (\`id\` int unsigned not null auto_increment primary key, \`title\` varchar(255) not null, \`etoile\` tinyint unsigned null default NULL, \`nbjour\` varchar(255) null default 'NULL', \`type\` varchar(100) null default 'NULL', \`destination\` varchar(255) null default 'NULL', \`description\` text null default ('NULL'), \`remise\` varchar(255) null default 'NULL', \`price\` varchar(255) null default 'NULL', \`data\` mediumtext null default NULL, \`url_scraper\` text not null, \`url_site\` text null default ('NULL'), \`date\` date not null, \`status\` text null default ('NULL')) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`drop table if exists \`offre\`;`);
  }

}
