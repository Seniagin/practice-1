import { Controller, Post, Put, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../authorization/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  // @UseGuards(JwtAuthGuard)
  // @Put('githubInstallationId')
  // updateGithubInstallationId(@Request() request) {
  //   const user = request.user;
  //   const installationId = request.body.installationId;
  //   this.usersService.updateGithubInstallationId(user.id, installationId);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get('connectedRepositories')
  // getConnectedRepositories(@Request() request) {
  //   const user = request.user;
  //   return this.usersService.getConnectedGithubRepositories(user.id);
  // }
}
