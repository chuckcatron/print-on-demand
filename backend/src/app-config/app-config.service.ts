import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  logLevel = this.configService.get('LOG_LEVEL') || 'debug';
  region = this.configService.get('REGION') || 'us-east-1';
  wwwAuthenticateHeader = 'Basic realm="sensi integration", charset="UTF-8"';
  authenticationAppUrl = this.configService.get('AUTHENTICATION_APP_URL');
  nodeEnv = this.configService.get('NODE_ENV');
}
