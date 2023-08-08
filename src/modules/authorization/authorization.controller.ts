import { Controller, Get, Body, Request, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { AuthorizationService } from './authorization.service';

// todo: nested controllers for admin/user
@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authService: AuthorizationService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request): any {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req): any {
    return req.user;
  }
}
