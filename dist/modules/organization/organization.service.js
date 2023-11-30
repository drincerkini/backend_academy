"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrganizationService = class OrganizationService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createOrganizationDto) {
        const { name } = createOrganizationDto;
        const newOrganozation = this.prismaService.organization.create({
            data: {
                name,
                logo: 'test',
            },
        });
        return newOrganozation;
    }
    async filterOrganization(name) {
        return this.prismaService.organization.findFirst({
            where: {
                name,
            },
        });
    }
    async findAll() {
        return this.prismaService.organization.findMany({
            include: {
                employees: true,
            },
        });
    }
    findOne(id) {
        return this.prismaService.organization.findUnique({ where: { id } });
    }
    async update(id, updateOrganizationDto) {
        const findOrganization = await this.prismaService.organization.findUnique({
            where: { id },
        });
        if (!findOrganization) {
            throw new common_1.NotFoundException(' Organization not found');
        }
        return await this.prismaService.organization.update({
            where: { id },
            data: updateOrganizationDto,
        });
    }
    async remove(id) {
        const findOrganization = await this.prismaService.organization.findUnique({
            where: { id },
        });
        if (!findOrganization) {
            throw new common_1.NotFoundException('Organization not Found1');
        }
        return await this.prismaService.organization.delete({ where: { id } });
    }
    async addEmployeeToOrganization(id, userId) {
        const findOrganization = await this.prismaService.organization.findUnique({
            where: { id },
            include: {
                employees: true,
            },
        });
        if (!findOrganization) {
            throw new common_1.NotFoundException('User not Found!');
        }
        const findUser = await this.prismaService.user.findUnique({
            where: { id: userId },
        });
        if (!findUser) {
            throw new common_1.NotFoundException('User Not found');
        }
        return this.prismaService.organization.update({
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
    async getEmployeeFromOrganization(id) {
        const list = await this.prismaService.organization.findUnique({
            where: { id },
            include: {
                employees: true,
            },
        });
        return list.employees;
    }
    async deleteUserFromOrganization(id, userId) {
        const findOrganization = await this.prismaService.organization.update({
            where: { id },
            data: {
                employees: {
                    disconnect: { id: userId },
                },
            },
        });
        return findOrganization;
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map