import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  title: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  content?: string;
}
