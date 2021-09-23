import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import AuthService, { JwtAccessToken } from './auth.service';
import LocalAuthGuard from './strategies/local.guard';

@Controller('login')
export default class AuthController {
  public constructor(private readonly serviceAuth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  public async login(@Request() req): Promise<JwtAccessToken> {
    return this.serviceAuth.login(req.user);
  }
}
