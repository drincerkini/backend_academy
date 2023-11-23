import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global validation pipes and middlewares
  app.useGlobalPipes(new ValidationPipe());
  const authMiddleware = new AuthMiddleware(app.get(AppService));
  app.use(authMiddleware.use.bind(authMiddleware));

  await app.listen(3000);
}
bootstrap();
