import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './config/mikro-orm.config'
import { HttpModule } from '@nestjs/axios';
import { OffresModule } from './application/offres/offres.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    OffresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
