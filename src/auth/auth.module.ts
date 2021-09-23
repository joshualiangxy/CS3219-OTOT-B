import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import UsersModule from 'src/users/users.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import JwtStrategy from './strategies/jwt.strategy';
import LocalStrategy from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (serviceConfig: ConfigService) => ({
        secret: serviceConfig.get<string>('jwtSecret'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
