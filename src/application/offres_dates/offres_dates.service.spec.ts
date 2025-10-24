import { Test, TestingModule } from '@nestjs/testing';
import { OffresDatesService } from './offres_dates.service';

describe('OffresDatesService', () => {
  let service: OffresDatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffresDatesService],
    }).compile();

    service = module.get<OffresDatesService>(OffresDatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
