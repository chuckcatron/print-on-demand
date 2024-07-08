"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const logger_service_1 = require("../logger.service");
let AuthorizationService = class AuthorizationService {
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
        this.cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: this.configService.get('cognito.region'),
        });
    }
    async signUp(username, password, email) {
        const command = new client_cognito_identity_provider_1.SignUpCommand({
            ClientId: this.configService.get('cognito.userPoolClientId'),
            Username: username,
            Password: password,
            UserAttributes: [{ Name: 'email', Value: email }],
        });
        return await this.cognitoClient.send(command);
    }
    async confirmSignUp(username, code) {
        const command = new client_cognito_identity_provider_1.ConfirmSignUpCommand({
            ClientId: this.configService.get('cognito.userPoolClientId'),
            Username: username,
            ConfirmationCode: code,
        });
        return await this.cognitoClient.send(command);
    }
    async signIn(username, password) {
        const command = new client_cognito_identity_provider_1.InitiateAuthCommand({
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: this.configService.get('cognito.userPoolClientId'),
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
            },
        });
        return await this.cognitoClient.send(command);
    }
};
exports.AuthorizationService = AuthorizationService;
exports.AuthorizationService = AuthorizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        logger_service_1.CustomLoggerService])
], AuthorizationService);
//# sourceMappingURL=authorization.service.js.map