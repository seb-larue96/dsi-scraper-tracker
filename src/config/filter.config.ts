import { INestApplication } from '@nestjs/common';
import { GlobalExceptionFilter } from '../common/filters/global-exception.filter';
import { LoggerService } from 'src/logger/logger.service';

export function configureGlobalFilters(app: INestApplication): void {
  const logger = app.get(LoggerService)
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
}