import { MySqlDriver } from '@mikro-orm/mysql';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import * as dotenv from 'dotenv';
import { Offre } from 'src/application/offres/entities/offre.entity';

dotenv.config();

const config: MikroOrmModuleOptions = {
  entities: [Offre],
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  driver: MySqlDriver,
  migrations: {
    tableName: 'mo_migrations',
    path: './migrations',
  },
};

export default config;