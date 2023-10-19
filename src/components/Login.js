// src/Login.js
import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      setUser({ username });
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/');
    }
  };

  return (
    <div className='login-background'>

   
    <div className="login-container">
      <h1>Login</h1>
      <div className="input-container">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      </div>
      <div className="input-container">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
};

export default Login;
