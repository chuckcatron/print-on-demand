import { CognitoUserPool } from 'amazon-cognito-identity-js';
const poolData = {
  UserPoolId: 'us-east-1_UiDioi3Jz',
  ClientId: 'vmdrja7r6v5l45mjk3qf8tqfl',
};
export default new CognitoUserPool(poolData);
