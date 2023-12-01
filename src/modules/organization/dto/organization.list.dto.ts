import { IsArray, IsNumber, IsString } from 'class-validator';

export class OrganizationListDto {
  @IsString()
  name: string;

  @IsNumber()
  numberOfEmployees: number;
}
