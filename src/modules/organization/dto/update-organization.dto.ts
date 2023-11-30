import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-organization.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { User } from '@prisma/client';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @IsString()
  @IsOptional()
  name: string;
}
