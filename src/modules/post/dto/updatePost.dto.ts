import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string' })
  readonly title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string' })
  content?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ type: 'boolean' })
  publish?: boolean;
}
