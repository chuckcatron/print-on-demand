import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLoggerService } from 'src/logger.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({}), ConfigModule],
  providers: [
    AuthorizationService,
    CustomLoggerService,
    JwtStrategy,
    LocalStrategy,
  ],
  controllers: [AuthorizationController],
})
export class AuthorizationModule {}
