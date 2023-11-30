import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global validation pipes and middlewares
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
