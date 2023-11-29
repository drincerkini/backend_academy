import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Roles } from 'src/enums/roles.enum';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPosts() {
    return await this.prismaService.post.findMany({
      include: { author: true },
    });
  }

  async getPostById(id: number) {
    const post = await this.prismaService.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found!');
    }

    return post;
  }

  async createPost(post: CreatePostDto, userId: number) {
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

  async updatePost(id: number, user: any, updatePostDto: UpdatePostDto) {
    const findPost = await this.prismaService.post.findUnique({
      where: {
        id: id,
      },
      include: { author: true },
    });

    if (!findPost) {
      throw new NotFoundException('Post not found!');
    }

    if (findPost.author.id !== user.id && user.role !== Roles.Admin) {
      throw new UnauthorizedException('Not authorized!');
    }

    return await this.prismaService.post.update({
      where: { id: id },
      data: updatePostDto,
    });
  }

  async deletePost(id: number, user: any) {
    const findPost = await this.prismaService.post.findUnique({
      where: { id: id },
    });

    if (!findPost) {
      throw new NotFoundException('Post not found!');
    }

    if (findPost.authorId !== user.id && user.role !== Roles.Admin) {
      throw new UnauthorizedException('You are Not Authorized!');
    }

    return await this.prismaService.post.delete({ where: { id: id } });
  }
}
