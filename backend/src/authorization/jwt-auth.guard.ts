import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomLoggerService } from '../logger.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly logger: CustomLoggerService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    this.logger.log(`Authenticating request for URL: ${request.url}`);
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    if (err || !user) {
      this.logger.error(
        `Authentication failed for URL: ${request.url} - Error: ${err || info.message}`,
        err?.stack,
      );
      throw err || new UnauthorizedException();
    }
    this.logger.log(`Authentication successful for URL: ${request.url}`);
    return user;
  }
}
