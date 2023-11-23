import { Injectable, NotFoundException } from '@nestjs/common';
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
let idIdex = 4;

@Injectable()
export class PostService {
  getPosts() {
    return posts;
  }

  createPost(post: CreatePostDto) {
    const newPost = new PostDto();
    newPost.id = idIdex++;
    newPost.title = post.title;
    newPost.userId = post.userId;
    return posts.push(newPost);
  }

  updatePost(id: number, updatePostDto: UpdatePostDto){
    const findPost = posts.find((post) => post.id === id);

    if (!findPost) {
      throw new NotFoundException('Post not found!');
    }

    if (updatePostDto.title !== undefined) {
      findPost.title = updatePostDto.title;
    }

    return updatePostDto;
  }
}
