import { IsArray, IsString } from 'class-validator';

export class OrganizationListDto {
  @IsString()
  name: string;
}
