import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationDto } from './dto/organization.dto';
import { EmployeeFromOrgDto } from './dto/employeeFromOrg.dto';
import { AddEmployeeToOrgDto } from './dto/addEmployeeToOrg.dto';

@Injectable()
export class OrganizationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const { name } = createOrganizationDto;

    const existingOrg = await this.prismaService.organization.findUnique({
      where: { name },
    });

    //checking if the organization with the same name already exists
    if (existingOrg) {
      throw new ConflictException(
        'Organization with this name already exists!',
      );
    }

    const newOrganozation = await this.prismaService.organization.create({
      data: {
        name,
      },
    });

    return newOrganozation;
  }

  async findAll(name?: string) {
    // checking if the name from query is not null and returning a single organization depending on that query
    // if name is null returning the whole list of organizations
    if (name) {
      const organization = await this.prismaService.organization.findUnique({
        where: { name },
        include: { employees: true },
      });

      if (!organization) {
        throw new NotFoundException('Organization not Found!');
      }

      const org: OrganizationDto = {
        name: organization.name,
        employees: organization.employees.map((emp) => ({
          name: emp.name,
        })),
      };

      return org;
    } else {
      const list = await this.prismaService.organization.findMany({
        select: {
          name: true,
          _count: {
            select: {
              employees: true,
            },
          },
        },
      });

      const organizationsDto = list.map((org) => ({
        name: org.name,
        numberOfEmployees: org._count,
      }));

      return organizationsDto;
    }
  }

  async findOne(id: number) {
    const organization = await this.prismaService.organization.findUnique({
      where: { id },
    });

    if (!organization) {
      throw new NotFoundException('Organization not found!');
    }

    return organization;
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

    const employees: EmployeeFromOrgDto[] = list.employees.map((emp) => ({
      name: emp.name,
      email: emp.email,
    }));

    return employees;
  }

  async addEmployeeToOrganization(id: number, userData: AddEmployeeToOrgDto) {
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
      where: {
        id: userData.userId,
      },
    });

    if (!findUser) {
      throw new NotFoundException('User Not found');
    }

    // searching if an employee with the same id is already added
    const isEmployeeAlreadyAdded = findOrganization.employees.some(
      (emp) => emp.id === findUser.id,
    );

    // if the employee is already added return an error
    if (isEmployeeAlreadyAdded) {
      throw new ConflictException(
        'Employee already is added to this organization!',
      );
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

  async addLogoToOrganization(id: number, file: Express.Multer.File) {
    const findOrg = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!findOrg) {
      throw new NotFoundException('Organization not found!');
    }

    return this.prismaService.organization.update({
      where: { id },
      data: {
        logo: file.filename,
      },
    });
  }
}
