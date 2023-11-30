import { NestMiddleware } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UserService);
    use(req: any, res: any, next: () => void): void;
}
