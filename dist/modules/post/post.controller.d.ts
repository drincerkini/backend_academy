import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
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
    createPost(post: CreatePostDto, user: any): Promise<{
        id: number;
        title: string;
        content: string;
        publish: boolean;
        authorId: number;
    }>;
    updatePost(id: number, updatePostDto: UpdatePostDto, user: any): Promise<{
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
