import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './config/swagger.config';
import { configureGlobalInterceptors } from './config/interceptor.config';
import { configureGlobalFilters } from './config/filter.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);
  configureGlobalInterceptors(app);
  configureGlobalFilters(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
