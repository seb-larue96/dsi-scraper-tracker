import { Module } from '@nestjs/common';
import { OffresDatesService } from './offres_dates.service';
import { OffresDatesController } from './offres_dates.controller';

@Module({
  controllers: [OffresDatesController],
  providers: [OffresDatesService],
})
export class OffresDatesModule {}
