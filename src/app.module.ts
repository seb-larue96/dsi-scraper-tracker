import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './config/mikro-orm.config'
import { HttpModule } from '@nestjs/axios';
import { OffresModule } from './application/offres/offres.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './logger/logger.service';
import { Log } from './logger/entities/log.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature([Log]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    OffresModule
  ],
  providers: [LoggerService],
  exports: [LoggerService]
})
export class AppModule {}
