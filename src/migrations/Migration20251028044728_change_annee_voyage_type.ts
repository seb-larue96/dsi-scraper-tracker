import { Migration } from '@mikro-orm/migrations';

export class Migration20251028044728_change_annee_voyage_type extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`offre_date\` modify \`annee_voyage\` varchar(255);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`offre_date\` modify \`annee_voyage\` int;`);
  }

}
