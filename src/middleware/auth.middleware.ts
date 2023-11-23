import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Invalid or missing authorization header',
      );
    }

    const userId = parseInt(authHeader.split(' ')[1], 10);

    // Assign user to request
    req.user = { id: userId };

    next();
  }
}
