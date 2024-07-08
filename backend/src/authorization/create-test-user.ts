import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import * as dotenv from 'dotenv';
import { fromIni } from '@aws-sdk/credential-provider-ini';

dotenv.config();

const userPoolId = 'us-east-1_UiDioi3Jz';
const username = 'testuser@example.com';
const email = 'testuser@example.com';
const temporaryPassword = 'Test@1234';
const permanentPassword = 'Test@1234';

const client = new CognitoIdentityProviderClient({
  region: 'us-east-1',
  credentials: fromIni({ profile: 'chuckcatron' }), // Specify your profile name here
});

async function createUser() {
  try {
    // Create the user
    const createUserCommand = new AdminCreateUserCommand({
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

    // Set a permanent password
    const setPasswordCommand = new AdminSetUserPasswordCommand({
      UserPoolId: userPoolId,
      Username: username,
      Password: permanentPassword,
      Permanent: true,
    });

    await client.send(setPasswordCommand);
    console.log('User password set successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();
