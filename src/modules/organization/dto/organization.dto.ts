import { IsString, ValidateNested } from 'class-validator';
import { ListUsersDto } from 'src/modules/user/dto/listUsersDto';

export class OrganizationDto {
  @IsString()
  name: string;

  @ValidateNested({ each: true })
  employees: ListUsersDto[];
}
