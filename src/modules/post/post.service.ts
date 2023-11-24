import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostDto } from 'src/modules/post/dto/post.dto';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

const posts: PostDto[] = [
  {
    id: 1,
    title: 'post 1',
    userId: 1,
  },
  {
    id: 2,
    title: 'post 2',
    userId: 2,
  },
  {
    id: 3,
    title: 'post 3',
    userId: 1,
  },
];

@Injectable()
export class PostService {
  getPosts() {
    return posts;
  }

  getPostById(id: number) {
    return posts.find((post) => post.id === id);
  }

  createPost(post: CreatePostDto) {
    const newPost = { id: posts.length - 1, ...post };
    posts.push(newPost);

    return newPost;
  }

  updatePost(id: number, userId: number, updatePostDto: UpdatePostDto) {
    const findPost = posts.find((post) => post.id === id);

    if (!findPost) {
      throw new NotFoundException('Post not found!');
    }

    if (findPost.userId !== userId && userId !== 1) {
      throw new UnauthorizedException('Not authorized!');
    }

    if (updatePostDto.title !== undefined) {
      findPost.title = updatePostDto.title;
    }

    return `updated succesfuly`;
  }

  deletePost(id: number) {
    const index = posts.findIndex((post) => post.id === id);

    if (index === -1) {
      throw new NotFoundException('Post not found!');
    }
    posts.splice(index, 1);
    return 'deleted succesfuly';
  }
}
