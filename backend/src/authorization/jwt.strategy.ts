import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import * as jwksRsa from 'jwks-rsa';
import { CustomLoggerService } from 'src/logger.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly loggerService: CustomLoggerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        //jwksUri: `https://cognito-idp.${configService.get<string>('AWS_REGION')}.amazonaws.com/${configService.get<string>('COGNITO_USER_POOL_ID')}/.well-known/jwks.json`,
        jwksUri: `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_UiDioi3Jz/.well-known/jwks.json`,
      }),
      algorithms: ['RS256'],
    });
    this.loggerService.log(`${configService.get('COGNITO_USER_POOL_ID')}`);
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
