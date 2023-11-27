import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Roles } from './enums/roles.enum';

const users: UserDto[] = [
  {
    id: 1,
    name: 'Drin',
    email: 'dcerkini@gmail.com',
    role: Roles.Admin,
  },
  {
    id: 2,
    name: 'filan',
    email: 'filan@gmail.com',
    role: Roles.Member,
  },
  {
    id: 3,
    name: 'fistek',
    email: 'filan@gmail.com',
    role: Roles.Member,
  },
];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUsers() {
    return users;
  }

  getUserById(id: number) {
    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }

    return foundUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto, user: any) {
    const userToUpdate = users.find((user) => user.id === id);

    if (!userToUpdate) {
      throw new NotFoundException('User not found!');
    }

    if (updateUserDto.name !== undefined && updateUserDto !== null) {
      userToUpdate.name = updateUserDto.name;
    }

    if (updateUserDto.email !== undefined && updateUserDto !== null) {
      userToUpdate.email = updateUserDto.email;
    }

    return updateUserDto;
  }

  deleteUser(id: number) {
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not Found!');
    }

    const userDeleted = users.splice(index, 1);
    return userDeleted;
  }
}
