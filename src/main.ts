import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { configureSwagger } from './config/swagger.config';
import { configureGlobalInterceptors } from './config/interceptor.config';
import { configureGlobalFilters } from './config/filter.config';
import { FeatureFlags, FeatureFlagEnv } from './config/feature-flags.config';

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
  await logger.info('Feature flags configuration:', context);

  Object.entries(FeatureFlags).forEach(([flagName, flagFn]) => {
    const value = (flagFn as () => boolean)();
    const rawEnv = FeatureFlagEnv[flagName as keyof typeof FeatureFlagEnv]?.() ?? 'undefined';

    logger.info(`${flagName} = ${value} (env: ${rawEnv})`, context);
  });

  configureApp(app);

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');

  await logger.info(`Application successfully started on port ${port}`, context);
}
bootstrap();
