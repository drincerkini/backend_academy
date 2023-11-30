import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class OrganizationService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createOrganizationDto: CreateOrganizationDto): Promise<{
        id: number;
        name: string;
        logo: string;
    }>;
    filterOrganization(name: string): Promise<{
        id: number;
        name: string;
        logo: string;
    }>;
    findAll(): Promise<({
        employees: {
            id: number;
            email: string;
            name: string;
            role: string;
        }[];
    } & {
        id: number;
        name: string;
        logo: string;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__OrganizationClient<{
        id: number;
        name: string;
        logo: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<{
        id: number;
        name: string;
        logo: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        logo: string;
    }>;
    addEmployeeToOrganization(id: number, userId: number): Promise<{
        id: number;
        name: string;
        logo: string;
    }>;
    getEmployeeFromOrganization(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
    }[]>;
    deleteUserFromOrganization(id: number, userId: number): Promise<{
        id: number;
        name: string;
        logo: string;
    }>;
}
