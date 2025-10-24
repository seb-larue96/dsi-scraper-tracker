import { Test, TestingModule } from '@nestjs/testing';
import { OffresDatesController } from './offres_dates.controller';
import { OffresDatesService } from './offres_dates.service';

describe('OffresDatesController', () => {
  let controller: OffresDatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffresDatesController],
      providers: [OffresDatesService],
    }).compile();

    controller = module.get<OffresDatesController>(OffresDatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
