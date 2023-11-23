import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller()
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

  // @Get('/users')
  // getUsers(@Query('email') email: string) {
  //   return this.appService.getUsers(email);
  // }

  @Patch('/users/:id')
  updateUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.appService.updateUser(id, updateUserDto);
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
