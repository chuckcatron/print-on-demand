import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';
import Layout from './components/Layout';
import AdminLayoutWithAuth from './components/AdminLayoutWithAuth';
import '@aws-amplify/ui-react/styles.css';
import AdminAuthenticator from './components/AdminAuthenticator';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='faq' element={<FAQ />} />
        </Route>

        {/* Protected admin routes */}
        <Route
          path='/admin'
          element={
            <AdminAuthenticator>
              <AdminLayoutWithAuth />
            </AdminAuthenticator>
          }
        >
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
