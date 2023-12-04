import { ListUsersDto } from 'src/modules/user/dto/listUsersDto';

export class OrganizationDto {
  name: string;
  employees: ListUsersDto[];
}
