"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    cognito: {
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        userPoolClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
        identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
        region: 'us-east-1',
    },
});
//# sourceMappingURL=cognito.config.js.map