import React, { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';
import LogoutButton from './LogoutButton';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
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
                <Link className='nav-link' to='/admin/dashboard'>
                  Dashboard
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/admin/users'>
                  Users
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/admin/orders'>
                  Orders
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Back to Main Site
                </Link>
              </li>
              <li className='nav-item'>
                <LogoutButton /> {/* Add the LogoutButton here */}
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
