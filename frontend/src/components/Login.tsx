import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../services/authenticate';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [loginErr, setLoginErr] = useState('');

  const formInputChange = (formField: string, value: string) => {
    if (formField === 'email') {
      setEmail(value);
    }
    if (formField === 'password') {
      setPassword(value);
    }
  };

  const validation = (): Promise<{ email: string; password: string }> => {
    return new Promise((resolve) => {
      if (email === '' && password === '') {
        setEmailErr('Email is Required');
        setPasswordErr('Password is required');
        resolve({ email: 'Email is Required', password: 'Password is required' });
      } else if (email === '') {
        setEmailErr('Email is Required');
        resolve({ email: 'Email is Required', password: '' });
      } else if (password === '') {
        setPasswordErr('Password is required');
        resolve({ email: '', password: 'Password is required' });
      } else if (password.length < 6) {
        setPasswordErr('Password must be at least 6 characters');
        resolve({ email: '', password: 'Password must be at least 6 characters' });
      } else {
        resolve({ email: '', password: '' });
      }
    });
  };

  const handleClick = () => {
    setEmailErr('');
    setPasswordErr('');
    validation()
      .then((res) => {
        if (res.email === '' && res.password === '') {
          authenticate(email, password)
            .then(() => {
              setLoginErr('');
              navigate('/admin/dashboard');
            })
            .catch((err) => {
              console.log(err);
              setLoginErr(err.message);
            });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='container-sm d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
      <div className='login' style={{ width: '300px' }}>
        <div className='form'>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' className={`form-control ${emailErr ? 'is-invalid' : ''}`} id='email' value={email} onChange={(e) => formInputChange('email', e.target.value)} />
            <div className='invalid-feedback'>{emailErr}</div>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' className={`form-control ${passwordErr ? 'is-invalid' : ''}`} id='password' value={password} onChange={(e) => formInputChange('password', e.target.value)} />
            <div className='invalid-feedback'>{passwordErr}</div>
          </div>
          <div className='form-group'>
            <button type='button' className='btn btn-primary' onClick={handleClick}>
              Login
            </button>
          </div>
          {loginErr && <div className='alert alert-danger mt-3'>{loginErr}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
