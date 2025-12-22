import { Migration } from '@mikro-orm/migrations';

export class Migration20251222065208_add_cle_doublon_column extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`offre\` add \`cle_doublon\` varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`offre\` drop column \`cle_doublon\`;`);
  }

}
