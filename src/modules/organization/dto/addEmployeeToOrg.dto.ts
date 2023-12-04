import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AddEmployeeToOrgDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
