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
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Post()
  async createPost(@Body() post: CreatePostDto, @GetUser() user: any) {
    return await this.postService.createPost(post, user.id);
  }

  @Patch('/:id')
  @SetMetadata('roles', [Roles.Admin])
  async updatePost(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: any,
  ) {
    return await this.postService.updatePost(id, user, updatePostDto);
  }

  @Delete(':id')
  @SetMetadata('roles', [Roles.Admin])
  @UseGuards(RolesGuard)
  async deletePost(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @GetUser() user: any,
  ) {
    return await this.postService.deletePost(id, user);
  }
}
