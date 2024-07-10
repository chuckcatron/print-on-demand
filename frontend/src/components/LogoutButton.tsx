import React from 'react';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@aws-amplify/ui-react';
const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/'); // Redirect to the home page after logout
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <Button className='btn btn-outline-danger' onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
export {};
