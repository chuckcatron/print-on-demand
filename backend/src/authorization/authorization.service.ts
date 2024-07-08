import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { CustomLoggerService } from 'src/logger.service';

@Injectable()
export class AuthorizationService {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor(
    private configService: ConfigService,
    private readonly logger: CustomLoggerService,
  ) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.configService.get<string>('cognito.region'),
    });
  }

  async signUp(username: string, password: string, email: string) {
    const command = new SignUpCommand({
      ClientId: this.configService.get<string>('cognito.userPoolClientId'),
      Username: username,
      Password: password,
      UserAttributes: [{ Name: 'email', Value: email }],
    });

    return await this.cognitoClient.send(command);
  }

  async confirmSignUp(username: string, code: string) {
    const command = new ConfirmSignUpCommand({
      ClientId: this.configService.get<string>('cognito.userPoolClientId'),
      Username: username,
      ConfirmationCode: code,
    });

    return await this.cognitoClient.send(command);
  }

  async signIn(username: string, password: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.configService.get<string>('cognito.userPoolClientId'),
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    return await this.cognitoClient.send(command);
  }
}
