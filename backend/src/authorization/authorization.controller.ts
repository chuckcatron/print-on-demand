import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { CustomLoggerService } from 'src/logger.service';

@Controller('authorization')
export class AuthorizationController {
  constructor(
    private readonly loggerService: CustomLoggerService,
    private authService: AuthorizationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Body() body: { username: string; password: string }) {
    this.loggerService.log('Sign in request: AuthorizationController.signIn');
    return this.authService.signIn(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate')
  async validate(@Request() req) {
    return req.user;
  }
}
