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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../../enums/roles.enum");
const prisma_service_1 = require("../prisma/prisma.service");
let PostService = class PostService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getPosts() {
        return await this.prismaService.post.findMany({
            include: { author: true },
        });
    }
    async getPostById(id) {
        const post = await this.prismaService.post.findUnique({ where: { id } });
        if (!post) {
            throw new common_1.NotFoundException('Post not found!');
        }
        return post;
    }
    async createPost(post, userId) {
        const { title, content } = post;
        const newPost = await this.prismaService.post.create({
            data: {
                title,
                content,
                authorId: userId,
            },
        });
        return newPost;
    }
    async updatePost(id, user, updatePostDto) {
        const findPost = await this.prismaService.post.findUnique({
            where: {
                id: id,
            },
            include: { author: true },
        });
        if (!findPost) {
            throw new common_1.NotFoundException('Post not found!');
        }
        if (findPost.author.id !== user.id && user.role !== roles_enum_1.Roles.Admin) {
            throw new common_1.UnauthorizedException('Not authorized!');
        }
        return await this.prismaService.post.update({
            where: { id: id },
            data: updatePostDto,
        });
    }
    async deletePost(id, user) {
        const findPost = await this.prismaService.post.findUnique({
            where: { id: id },
        });
        if (!findPost) {
            throw new common_1.NotFoundException('Post not found!');
        }
        if (findPost.authorId !== user.id && user.role !== roles_enum_1.Roles.Admin) {
            throw new common_1.UnauthorizedException('You are Not Authorized!');
        }
        return await this.prismaService.post.delete({ where: { id: id } });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
//# sourceMappingURL=post.service.js.map