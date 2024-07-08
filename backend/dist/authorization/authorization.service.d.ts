import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from 'src/logger.service';
export declare class AuthorizationService {
    private configService;
    private readonly logger;
    private cognitoClient;
    constructor(configService: ConfigService, logger: CustomLoggerService);
    signUp(username: string, password: string, email: string): Promise<import("@aws-sdk/client-cognito-identity-provider").SignUpCommandOutput>;
    confirmSignUp(username: string, code: string): Promise<import("@aws-sdk/client-cognito-identity-provider").ConfirmSignUpCommandOutput>;
    signIn(username: string, password: string): Promise<import("@aws-sdk/client-cognito-identity-provider").InitiateAuthCommandOutput>;
}
