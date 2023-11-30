import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
    }[]>;
    getUserById(id: number): Promise<{
        posts: {
            id: number;
            title: string;
            content: string;
            publish: boolean;
            authorId: number;
        }[];
    } & {
        id: number;
        email: string;
        name: string;
        role: string;
    }>;
    createUser(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
    }>;
    updateUser(id: number, updateUserDto: UpdateUserDto, user: any): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
    }>;
    deleteUser(id: number, user: User): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
    }>;
}
