import { Migration } from '@mikro-orm/migrations';

export class Migration20250916114713_modify_prix_type extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`offre\` modify \`prix\` varchar(255);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`offre\` modify \`prix\` numeric(10,2);`);
  }

}
