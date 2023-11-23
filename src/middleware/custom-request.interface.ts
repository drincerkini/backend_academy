// Create a file custom-request.interface.ts

import { Request } from 'express';
import { UserDto } from 'src/dto/user.dto';

interface CustomRequest extends Request {
  user: UserDto;
}

export default CustomRequest;
