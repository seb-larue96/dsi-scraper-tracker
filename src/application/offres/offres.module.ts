import { Module } from '@nestjs/common';
import { OffresService } from './offres.service';
import { OffresController } from './offres.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Offre } from './entities/offre.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MikroOrmModule.forFeature([Offre]),
    HttpModule,
  ],
  controllers: [OffresController],
  providers: [OffresService],
})
export class OffresModule {}
