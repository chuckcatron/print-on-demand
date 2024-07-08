import { AuthorizationService } from './authorization.service';
import { CustomLoggerService } from 'src/logger.service';
export declare class AuthorizationController {
    private readonly loggerService;
    private authService;
    constructor(loggerService: CustomLoggerService, authService: AuthorizationService);
    signIn(body: {
        username: string;
        password: string;
    }): Promise<import("@aws-sdk/client-cognito-identity-provider").InitiateAuthCommandOutput>;
    validate(req: any): Promise<any>;
}
