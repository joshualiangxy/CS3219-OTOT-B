import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/users.const";

export interface JwtPayload {
  sub: number;
  username: string;
}

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(serviceConfig: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: serviceConfig.get<string>('jwtSecret'),
    })
  }

  public async validate(payload: JwtPayload): Promise<User> {
    return { userId: payload.sub, username: payload.username };
  }
}
