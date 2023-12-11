import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Roles } from 'src/enums/roles.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ type: String })
  email?: string;

  @IsOptional()
  @IsString()
  @IsEnum(Roles)
  @ApiPropertyOptional({ enum: Roles, default: Roles.Member })
  role?: string;
}
