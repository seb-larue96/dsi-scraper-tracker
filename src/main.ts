import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { configureSwagger } from './config/swagger.config';
import { configureGlobalInterceptors } from './config/interceptor.config';
import { configureGlobalFilters } from './config/filter.config';


function configureApp(app: INestApplication): void {
  configureSwagger(app);
  configureGlobalInterceptors(app);
  configureGlobalFilters(app);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(LoggerService);
  const context = 'NestFactory';

  await logger.info('Application starting...', context);

  configureApp(app);

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');

  await logger.info(`Application successfully started on port ${port}`, context);
}
bootstrap();
