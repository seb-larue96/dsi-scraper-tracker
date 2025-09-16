import { Migration } from '@mikro-orm/migrations';

export class Migration20250916053432_add_logger_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`log\` (\`id\` int unsigned not null auto_increment primary key, \`level\` varchar(255) not null, \`message\` varchar(255) not null, \`context\` text null, \`stack\` text null, \`timestamp\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`log\`;`);
  }

}
