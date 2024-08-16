import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { CustomLoggerService } from 'src/logger.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  providers: [JwtStrategy, JwtAuthGuard, CustomLoggerService],
  exports: [JwtAuthGuard],
})
export class AuthorizationModule {}
