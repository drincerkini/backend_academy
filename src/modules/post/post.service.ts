import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostDto } from 'src/modules/post/dto/post.dto';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Roles } from 'src/enums/roles.enum';

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

let index = 4;

@Injectable()
export class PostService {
  getPosts() {
    return posts;
  }

  getPostById(id: number) {
    return posts.find((post) => post.id === id);
  }

  createPost(post: CreatePostDto, id: number) {
    const newPost = { id: index++, ...post, userId: id };
    posts.push(newPost);

    return newPost;
  }

  updatePost(id: number, user: any, updatePostDto: UpdatePostDto) {
    const findPost = posts.find((post) => post.id === id);

    if (!findPost) {
      throw new NotFoundException('Post not found!');
    }

    if (findPost.userId !== user.id && user.role !== Roles.Admin) {
      throw new UnauthorizedException('Not authorized!');
    }

    if (updatePostDto.title !== undefined) {
      findPost.title = updatePostDto.title;
    }

    return findPost;
  }

  deletePost(id: number, user: any) {
    const index = posts.findIndex((post) => post.id === id);

    if (index === -1) {
      throw new NotFoundException('Post not found!');
    }

    if (posts[index].userId !== user.id && user.role !== Roles.Admin) {
      throw new UnauthorizedException(' Not Authorized!');
    }

    posts.splice(index, 1);
    return 'deleted succesfuly';
  }
}
