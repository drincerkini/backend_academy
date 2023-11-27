import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global validation pipes and middlewares
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
