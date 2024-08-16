import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container'>
          <a className='navbar-brand' href='/'>
            Print-On-Demand
          </a>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <a className='nav-link' href='/'>
                  Home
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/products'>
                  Products
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/about'>
                  About
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/contact'>
                  Contact
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/faq'>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className='container mt-4'>
        <Outlet />
      </main>

      <footer className='bg-light text-center mt-4 py-3'>
        <div className='container'>
          <p>© 2024 Print-On-Demand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
