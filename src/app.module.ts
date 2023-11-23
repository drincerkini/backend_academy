import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [PostModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'ObjectA',
      useValue: {
        objKey: 'test',
      },
    },
    {
      provide: 'Connection',
      useFactory: () => {
        return 'test';
      },
    },
  ],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users');
  }
}
