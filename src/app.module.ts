import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './config/mikro-orm.config'
import { HttpModule } from '@nestjs/axios';
import { ApplicationModule } from './application/application.module';
import { LoggerService } from './logger/logger.service';
import { Log } from './logger/entities/log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature([Log]),
    HttpModule,
    ApplicationModule
  ],
  providers: [LoggerService],
  exports: [LoggerService]
})
export class AppModule {}
