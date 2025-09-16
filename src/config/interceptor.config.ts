import { INestApplication } from '@nestjs/common';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { LoggerService } from 'src/logger/logger.service';

export function configureGlobalInterceptors(app: INestApplication): void {
  const logger = app.get(LoggerService)
  app.useGlobalInterceptors(new ResponseInterceptor(logger));
}