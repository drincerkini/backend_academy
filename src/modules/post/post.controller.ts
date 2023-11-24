import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Roles } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/decorators/user.decorator';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Post()
  createPost(@Body() post: CreatePostDto, @GetUser() user: any) {
    console.log('hi');
    post.userId = user.id;
    return this.postService.createPost(post);
  }

  @Patch('/:id')
  @SetMetadata('roles', [Roles.Admin])
  @UseGuards(AuthGuard)
  updatePost(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: any,
  ) {
    return this.postService.updatePost(id, user.id, updatePostDto);
  }

  @Delete(':id')
  @SetMetadata('roles', [Roles.Admin])
  @UseGuards(RolesGuard)
  deletePost(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Request() req: any,
  ) {
    const post = this.postService.getPostById(id);
    return this.postService.deletePost(id);
  }
}
