import { Controller } from '@nestjs/common';
import { OffresDatesService } from './offres_dates.service';

@Controller('offres-dates')
export class OffresDatesController {
  constructor(private readonly offresDatesService: OffresDatesService) {}
}
