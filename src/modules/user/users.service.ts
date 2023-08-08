import { Injectable } from '@nestjs/common';
import { User } from '../../db';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {

  constructor() {
  }

  async findOne(username: string): Promise<any> {
    return User.findOne({ where: { email: username } });
  }
}


