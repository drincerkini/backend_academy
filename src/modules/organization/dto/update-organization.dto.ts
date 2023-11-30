import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-organization.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @IsString()
  @IsOptional()
  name: string;
}
