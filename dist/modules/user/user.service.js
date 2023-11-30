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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const roles_enum_1 = require("../../enums/roles.enum");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getHello() {
        return 'Hello World!';
    }
    async getUsers() {
        return await this.prismaService.user.findMany();
    }
    async getUserById(id) {
        return await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
            include: {
                posts: true,
            },
        });
    }
    async createUser(createUserDto) {
        return await this.prismaService.user.create({
            data: createUserDto,
        });
    }
    async updateUser(id, updateUserDto, user) {
        const findUser = await this.prismaService.user.findUnique({
            where: { id: id },
        });
        if (!findUser) {
            throw new common_1.NotFoundException('User Not Found');
        }
        if (user.id !== findUser.id && user.role !== roles_enum_1.Roles.Admin) {
            throw new common_1.UnauthorizedException('You are not Authorized to update this user!');
        }
        const userToUpdate = await this.prismaService.user.update({
            where: { id: id },
            data: updateUserDto,
        });
        return userToUpdate;
    }
    async deleteUser(id, user) {
        const findUser = await this.prismaService.user.findUnique({
            where: { id: id },
        });
        if (!findUser) {
            throw new common_1.NotFoundException('User not Found!');
        }
        if (user.id !== findUser.id && user.role !== roles_enum_1.Roles.Admin) {
            throw new common_1.UnauthorizedException('You are Not authorized!');
        }
        const userDeleted = await this.prismaService.user.delete({
            where: {
                id: id,
            },
        });
        return userDeleted;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map