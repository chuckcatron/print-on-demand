import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import userpool from '../userpool.js';

export const getUserSession = (): Promise<CognitoUserSession | null> => {
  return new Promise((resolve, reject) => {
    const user = userpool.getCurrentUser();

    if (!user) {
      resolve(null);
      return;
    }

    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  });
};

export const authenticate = (Email: string, Password: string): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: Email,
      Pool: userpool,
    });

    const authDetails = new AuthenticationDetails({
      Username: Email,
      Password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('login successful');
        resolve(result);
      },
      onFailure: (err) => {
        console.log('login failed', err);
        reject(err);
      },
    });
  });
};

export const logout = (): void => {
  const user = userpool.getCurrentUser();
  if (user) {
    user.signOut();
  }
  window.location.href = '/';
};
