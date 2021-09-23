import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/users/users.const";
import AuthService from "../auth.service";

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private serviceAuth: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user: User | undefined = await this.serviceAuth.validateUser(username, password);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
