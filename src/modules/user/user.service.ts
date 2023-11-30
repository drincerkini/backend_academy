import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Roles } from 'src/enums/roles.enum';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUsers() {
    return await this.prismaService.user.findMany();
  }

  async getUserById(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: {
        posts: true,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, user: any) {
    const findUser = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!findUser) {
      throw new NotFoundException('User Not Found');
    }

    if (user.id !== findUser.id && user.role !== Roles.Admin) {
      throw new UnauthorizedException(
        'You are not Authorized to update this user!',
      );
    }

    const userToUpdate = await this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto,
    });

    return userToUpdate;
  }

  async deleteUser(id: number, user: any) {
    const findUser = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!findUser) {
      throw new NotFoundException('User not Found!');
    }

    if (user.id !== findUser.id && user.role !== Roles.Admin) {
      throw new UnauthorizedException('You are Not authorized!');
    }

    const userDeleted = await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
    return userDeleted;
  }
}
