import React, { ReactNode } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Outlet } from 'react-router-dom';
import { SignIn } from '@aws-amplify/ui-react/dist/types/components/Authenticator/SignIn';

interface AdminAuthenticatorProps {
  children: ReactNode;
}

const AdminAuthenticator: React.FC<AdminAuthenticatorProps> = ({ children }) => {
  return <Authenticator hideSignUp>{children}</Authenticator>;
};

export default AdminAuthenticator;
export {};
