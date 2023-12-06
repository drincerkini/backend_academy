import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty!' })
  @ApiProperty({ type: 'string' })
  name: string;
}
