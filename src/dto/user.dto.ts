import { Roles } from 'src/enums/roles.enum';

export class UserDto {
  id: number;
  name: string;
  email: string;
  role: Roles;
}
