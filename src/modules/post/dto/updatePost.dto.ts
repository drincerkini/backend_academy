import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  readonly title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  content?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ type: Boolean })
  publish?: boolean;
}
