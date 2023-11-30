import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    create(createOrganizationDto: CreateOrganizationDto): Promise<{
        id: number;
        name: string;
        logo: string;
    }>;
    getFilteredOrganizations(name: string): Promise<{
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__OrganizationClient<{
        id: number;
        name: string;
        logo: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<{
        id: number;
        name: string;
        logo: string;
    }>;
    remove(id: string): Promise<{
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
