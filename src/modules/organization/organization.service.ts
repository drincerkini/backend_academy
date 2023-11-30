import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const { name } = createOrganizationDto;

    const newOrganozation = await this.prismaService.organization.create({
      data: {
        name,
        logo: 'test',
      },
    });

    return newOrganozation;
  }

  async findAll(name?: string) {
    if (name) {
      return await this.prismaService.organization.findFirst({
        where: { name },
        include: {
          employees: true,
        },
      });
    } else {
      return await this.prismaService.organization.findMany({
        include: {
          employees: true,
        },
      });
    }
  }

  async findOne(id: number) {
    return await this.prismaService.organization.findUnique({ where: { id } });
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const findOrganization = await this.prismaService.organization.findUnique({
      where: { id },
    });

    if (!findOrganization) {
      throw new NotFoundException(' Organization not found');
    }
    return await this.prismaService.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
  }

  async remove(id: number) {
    const findOrganization = await this.prismaService.organization.findUnique({
      where: { id },
    });

    if (!findOrganization) {
      throw new NotFoundException('Organization not Found1');
    }

    return await this.prismaService.organization.delete({ where: { id } });
  }

  // -------------------------------------------------------------------------

  // test to add duplicate users to organization
  //read abput connect and disconnect

  async getEmployeeFromOrganization(id: number) {
    const list = await this.prismaService.organization.findUnique({
      where: { id },
      include: {
        employees: true,
      },
    });

    return list.employees;
  }

  async addEmployeeToOrganization(id: number, userId: number) {
    const findOrganization = await this.prismaService.organization.findUnique({
      where: { id },
      include: {
        employees: true,
      },
    });

    if (!findOrganization) {
      throw new NotFoundException('Organization not Found!');
    }

    const findUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!findUser) {
      throw new NotFoundException('User Not found');
    }

    return await this.prismaService.organization.update({
      where: { id },
      data: {
        employees: {
          connect: {
            id: findUser.id,
          },
        },
      },
    });
  }

  async deleteUserFromOrganization(id: number, userId: number) {
    const findOrganization = await this.prismaService.organization.update({
      where: { id },
      data: {
        employees: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    return findOrganization;
  }

  async addLogoToOrganization(id: number) {}
}
