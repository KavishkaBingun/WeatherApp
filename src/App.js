// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route as RouteV6, Link, useLocation, useNavigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './components/AuthProvider';
import Login from './components/Login';
import Home from './components/Home';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <button className='logout' onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <RouteV6 path="/" element={<Login />} />
          <RouteV6 path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
