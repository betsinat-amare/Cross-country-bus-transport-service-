import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',  // Allows requests from all origins
    methods: '*',
    allowedHeaders: 'Content-Type, Accept, Authorization', // Include Authorization header if needed
  });

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
