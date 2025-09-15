import { INestApplication } from '@nestjs/common';
import { GlobalExceptionFilter } from '../common/filters/global-exception.filter';

export function configureGlobalFilters(app: INestApplication): void {
  app.useGlobalFilters(new GlobalExceptionFilter());
}