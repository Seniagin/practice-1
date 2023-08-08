import { Injectable } from '@nestjs/common';
import { User } from '../../db';
// import { ISignUpPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';
// import { HttpService } from '@nestjs/axios';
// import { GithubService } from '../common/github/github.service';

@Injectable()
export class AuthorizationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    // private httpService: HttpService,
    // private githubService: GithubService,
  ) {
  }

  // async signUp({ email, password }: ISignUpPayload): Promise<any> {
  //   return User.create({ email, password });
  // }
  //
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  //
  // adminLogin(user: any) {
  //   const payload = { username: user.email, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
  //
  // async validateAdminUser(username: string, password: string) {
  //   const admin = await this.usersService.findAdminUser(username);
  //   if (admin && admin.validatePassword(password)) {
  //     return admin;
  //   }
  //   return null;
  // }
  //
  // async updateGithubAccessToken(user, code) {
  //   const token = await this.githubService.getUserGithubAccessToken(code);
  //   await this.usersService.updateUserGithubToken(user.id, token);
  //   await this.githubService.getUser(token.access_token);
  //   // await this.githubService.getUserRepos(token.access_token);
  //
  //   return {};
  // }
}
