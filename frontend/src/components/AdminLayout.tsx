import React, { ReactNode, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { getUserSession } from '../services/authenticate'; // Service to get the user session
import LogoutButton from './LogoutButton';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    getUserSession()
      .then((session: CognitoUserSession | null) => {
        if (session) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Loading state while checking authentication
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <a className='navbar-brand' href='/admin'>
            Admin Panel
          </a>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarAdminNav' aria-controls='navbarAdminNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarAdminNav'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <a className='nav-link' href='/admin/dashboard'>
                  Dashboard
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/admin/products'>
                  Products
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/admin/users'>
                  Users
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/admin/orders'>
                  Orders
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/'>
                  Back to Main Site
                </a>
              </li>
              <li className='nav-item'>
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className='container mt-4'>
        <Outlet />
      </main>

      <footer className='bg-dark text-white text-center mt-4 py-3'>
        <div className='container'>
          <p>© 2024 Admin Panel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
