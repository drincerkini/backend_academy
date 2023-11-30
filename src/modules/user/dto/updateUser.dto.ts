import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Roles } from 'src/enums/roles.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsEnum(Roles)
  role?: string;
}
