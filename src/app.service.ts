import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

const users: UserDto[] = [
  {
    id: 1,
    name: 'Drin',
    email: 'dce@gmail.com',
  },
  {
    id: 2,
    name: 'filan',
    email: 'filan@gmail.com',
  },
  {
    id: 3,
    name: 'fistek',
    email: 'filan@gmail.com',
  },
];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUserById(id: number) {
    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }

    return foundUser;
  }

  getUsers(email: string) {
    const usersByEmail = users.filter((user) => user.email === email);
    return usersByEmail;
  }
}
