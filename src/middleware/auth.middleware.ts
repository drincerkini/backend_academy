// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AppService } from 'src/app.service';
import CustomRequest from './custom-request.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}

  use(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const [, idValue] = authHeader.split('Basic ');

    // Parse the idValue to a number
    const userId = parseInt(idValue);

    // Find the user in the service
    const user = this.appService.getUserById(userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Assign the authenticated user to the request object
    req.user = user;

    next();
  }
}
