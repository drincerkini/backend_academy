import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { GetUser } from './decorators/user.decorator';
import { AuthMiddleware } from './middleware/auth.middleware';

@Controller()
@UsePipes(new ValidationPipe())
@UsePipes(AuthMiddleware)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users/:id')
  getUserById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    const user = this.appService.getUserById(id);
    return user;
  }

  @Get('/users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Patch('/users/:id')
  updateUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: any,
  ) {
    return this.appService.updateUser(id, updateUserDto, user);
  }

  @Delete('/users/:id')
  deleteUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.appService.deleteUser(id);
  }
}
