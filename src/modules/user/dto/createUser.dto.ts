import { IsEmail, IsOptional, IsString } from 'class-validator';
import { PostDto } from 'src/modules/post/dto/post.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;
  //   posts: PostDto[];
}
