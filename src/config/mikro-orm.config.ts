import { MySqlDriver } from '@mikro-orm/mysql';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import * as dotenv from 'dotenv';
import { Offre } from 'src/application/offres/entities/offre.entity';
import { Log } from 'src/logger/entities/log.entity';

dotenv.config();

const config: MikroOrmModuleOptions = {
  entities: [Log, Offre],
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  driver: MySqlDriver,
  migrations: {
    tableName: 'mo_migrations',
    path: process.env.NODE_ENV === 'production' ? './dist/migrations' : './src/migrations',
    pathTs: './src/migrations',
    emit: 'ts',
  },
};

export default config;