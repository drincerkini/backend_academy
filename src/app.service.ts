import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Roles } from './enums/roles.enum';
import { PrismaService } from './modules/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';

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
  constructor(private readonly prismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUsers() {
    return await this.prismaService.user.findMany();
  }

  async getUserById(id: number) {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }

    return foundUser;
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, user: any) {
    // const userToUpdate = users.find((user) => user.id === id);

    const userToUpdate = await this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto,
    });

    // if (!userToUpdate) {
    //   throw new NotFoundException('User not found!');
    // }

    // if (updateUserDto.name) {
    //   userToUpdate.name = updateUserDto.name;
    // }

    // if (updateUserDto.email) {
    //   userToUpdate.email = updateUserDto.email;
    // }

    return userToUpdate;
  }

  async deleteUser(id: number) {
    // const index = users.findIndex((user) => user.id === id);

    // if (index === -1) {
    //   throw new NotFoundException('User not Found!');
    // }

    // const userDeleted = users.splice(index, 1);
    const userDeleted = await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
    return userDeleted;
  }
}
