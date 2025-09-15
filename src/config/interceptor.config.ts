import { INestApplication } from '@nestjs/common';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';

export function configureGlobalInterceptors(app: INestApplication): void {
  app.useGlobalInterceptors(new ResponseInterceptor());
}