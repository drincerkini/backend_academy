import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ type: 'string' })
  email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string' })
  name?: string;
}
