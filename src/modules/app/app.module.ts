import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PostModule } from '../post/post.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [PostModule, PrismaModule, UserModule, OrganizationModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users', 'posts');
  }
}
