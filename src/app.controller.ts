import { Body, Controller, Delete, Get, Post, Request, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './db';

import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

class CreateUserDto {
  @IsEmail({}, { message: 'You must provide valid email' })
  email: string;


  @IsNotEmpty({ message: 'Password should not be empty' })
  @Matches(passwordRegex, {
    message: 'You password should contain at least 1 capital letter, 1 digit and have length between 8 and 16'
  })
  password: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/createUser')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return User.create(createUserDto);
  }

  @Get('/getUserList')
  getUsersList(): Promise<User[]> {
    return User.findAll();
  }

  @Delete('/:id')
  deleteUser(@Request() request): Promise<any> {
    return User.destroy({ where: { id: request.params.id } });
  }

  @Post('/login')
  login() {

  }
}
