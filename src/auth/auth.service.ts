import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.const';
import UsersService from 'src/users/users.service';
import { JwtPayload } from './strategies/jwt.strategy';

export interface JwtAccessToken {
  accessToken: string;
}

@Injectable()
export default class AuthService {
  public constructor(
    private readonly serviceUsers: UsersService,
    private readonly serviceJwt: JwtService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.serviceUsers.findUser(username);

    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }
  }

  public async login({
    username,
    userId,
    roles,
  }: User): Promise<JwtAccessToken> {
    const jwtPayload: JwtPayload = { sub: userId, username, roles };
    const accessToken: string = this.serviceJwt.sign(jwtPayload);

    return { accessToken };
  }
}
