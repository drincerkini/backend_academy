import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { GetUser } from './decorators/user.decorator';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello World';
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
