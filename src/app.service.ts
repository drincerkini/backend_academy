import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

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

  getUsers() {
    return users;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto, user: any) {
    const userToUpdate = users.find((user) => user.id === id);

    if (!userToUpdate) {
      throw new NotFoundException('User not found!');
    }

    if (user && user.id !== userToUpdate.id) {
      throw new UnauthorizedException('You are not authorized to update!');
    }

    if (updateUserDto.name !== undefined) {
      userToUpdate.name = updateUserDto.name;
    }

    if (updateUserDto.email !== undefined) {
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
