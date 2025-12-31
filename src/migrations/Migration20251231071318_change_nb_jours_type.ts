import { Migration } from '@mikro-orm/migrations';

export class Migration20251231071318_change_nb_jours_type extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`offre_date\` modify \`nb_jours\` varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`offre_date\` modify \`nb_jours\` int not null;`);
  }

}
