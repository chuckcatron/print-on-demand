"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const dotenv = require("dotenv");
const credential_provider_ini_1 = require("@aws-sdk/credential-provider-ini");
dotenv.config();
const userPoolId = 'us-east-1_UiDioi3Jz';
const username = 'testuser@example.com';
const email = 'testuser@example.com';
const temporaryPassword = 'Test@1234';
const permanentPassword = 'Test@1234';
const client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
    region: 'us-east-1',
    credentials: (0, credential_provider_ini_1.fromIni)({ profile: 'chuckcatron' }),
});
async function createUser() {
    try {
        const createUserCommand = new client_cognito_identity_provider_1.AdminCreateUserCommand({
            UserPoolId: userPoolId,
            Username: username,
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'email_verified', Value: 'true' },
            ],
            TemporaryPassword: temporaryPassword,
            MessageAction: 'SUPPRESS',
        });
        await client.send(createUserCommand);
        console.log('User created successfully');
        const setPasswordCommand = new client_cognito_identity_provider_1.AdminSetUserPasswordCommand({
            UserPoolId: userPoolId,
            Username: username,
            Password: permanentPassword,
            Permanent: true,
        });
        await client.send(setPasswordCommand);
        console.log('User password set successfully');
    }
    catch (error) {
        console.error('Error creating user:', error);
    }
}
createUser();
//# sourceMappingURL=create-test-user.js.map