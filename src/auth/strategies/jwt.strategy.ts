import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/users.const';
import Role from '../roles/role.enum';

export interface JwtPayload {
  sub: number;
  username: string;
  roles: Role[];
}

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(serviceConfig: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: serviceConfig.get<string>('jwtSecret'),
    });
  }

  public async validate({ sub, username, roles }: JwtPayload): Promise<User> {
    return { userId: sub, username, roles };
  }
}
