import { Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/createUser')
  createUser(@Request() request): Promise<User> {
    return User.create(request.body);
  }

  @Get('/getUserList')
  getUsersList(): Promise<User[]> {
    return User.findAll();
  }

  @Delete('/:id')
  deleteUser(@Request() request): Promise<any> {
    return User.destroy({ where: { id: request.params.id } });
  }
}
