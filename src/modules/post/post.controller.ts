import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Post()
  createPost(@Body() post: CreatePostDto, @GetUser() user: any) {
    return this.postService.createPost(post, user.id);
  }

  @Patch('/:id')
  @SetMetadata('roles', [Roles.Admin])
  updatePost(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: any,
  ) {
    return this.postService.updatePost(id, user, updatePostDto);
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
    @GetUser() user: any,
  ) {
    return this.postService.deletePost(id, user);
  }
}
