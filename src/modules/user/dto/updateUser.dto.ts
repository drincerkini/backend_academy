import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Roles } from 'src/enums/roles.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ type: 'string' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsEnum(Roles)
  @ApiPropertyOptional({ type: 'string', enum: Roles, default: Roles.Member })
  role?: string;
}
