import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import Role from './auth/roles/role.enum';
import { Roles } from './auth/roles/roles.decorator';
import RolesGuard from './auth/roles/roles.guard';
import JwtAuthGuard from './auth/strategies/jwt.guard';
import { User } from './users/users.const';

@Controller()
export default class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getProfile(@Request() req): Promise<User> {
    return req.user;
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('secret-message')
  public async getSecretMessage(): Promise<string> {
    return 'This is a secret message';
  }
}
