import { withAuthenticator } from '@aws-amplify/ui-react';
import AdminLayout from './AdminLayout';

const AdminLayoutWithAuth = withAuthenticator(AdminLayout);

export default AdminLayoutWithAuth;

export {};
