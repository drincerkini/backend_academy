import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PostService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getPosts(): Promise<({
        author: {
            id: number;
            email: string;
            name: string;
            role: string;
        };
    } & {
        id: number;
        title: string;
        content: string;
        publish: boolean;
        authorId: number;
    })[]>;
    getPostById(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        publish: boolean;
        authorId: number;
    }>;
    createPost(post: CreatePostDto, userId: number): Promise<{
        id: number;
        title: string;
        content: string;
        publish: boolean;
        authorId: number;
    }>;
    updatePost(id: number, user: any, updatePostDto: UpdatePostDto): Promise<{
        id: number;
        title: string;
        content: string;
        publish: boolean;
        authorId: number;
    }>;
    deletePost(id: number, user: any): Promise<{
        id: number;
        title: string;
        content: string;
        publish: boolean;
        authorId: number;
    }>;
}
