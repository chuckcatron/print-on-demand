import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the ConfigService to pass to the CustomLoggerService
  const configService = app.get(ConfigService);
  const logger = new CustomLoggerService(configService);

  // Set the custom logger globally for the app
  app.useLogger(logger);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use((req, res, next) => {
    logger.debug(`Incoming request: ${req.method} ${req.url}`);
    next();
  });
  app.enableCors({ origin: 'http://localhost:4200' });
  await app.listen(3000);
}
bootstrap();
