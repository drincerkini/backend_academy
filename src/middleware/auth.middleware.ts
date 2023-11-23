import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}

  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Invalid or missing authorization header',
      );
    }

    const userId = parseInt(authHeader.split(' ')[1], 10);

    const user = this.appService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    req.user = user;

    next();
  }
}
