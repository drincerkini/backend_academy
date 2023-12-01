import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ListUsersDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
