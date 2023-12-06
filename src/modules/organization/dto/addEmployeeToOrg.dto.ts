import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AddEmployeeToOrgDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  userId: number;
}
