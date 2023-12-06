import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Invalid or missing authorization header',
      );
    }

    const base64Credentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(
      base64Credentials,
      'base64',
    ).toString('utf-8');
    const userId = parseInt(decodedCredentials, 10);
    const user = this.userService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    req.user = user;

    next();
  }
}
