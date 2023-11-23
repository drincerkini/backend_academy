import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AppService } from 'src/app.service';
import CustomRequest from './custom-request.interface';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const userId = request.user.id;
    const appService = new AppService();
    return appService.getUserById(userId);
  },
);
