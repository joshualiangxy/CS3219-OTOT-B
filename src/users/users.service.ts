import { Injectable } from '@nestjs/common';
import { User, users } from './users.const';

@Injectable()
export default class UsersService {
  public async findUser(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }
}
