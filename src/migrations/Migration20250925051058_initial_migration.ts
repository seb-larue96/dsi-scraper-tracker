import { Migration } from '@mikro-orm/migrations';

export class Migration20250925051058_initial_migration extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`offre\` add \`package\` varchar(255) null, add \`remise\` varchar(255) null, add \`promo\` varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`offre\` drop column \`package\`, drop column \`remise\`, drop column \`promo\`;`);
  }

}
