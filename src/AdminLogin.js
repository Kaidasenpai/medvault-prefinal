import React, { useState } from 'react';
import './AdminLogin.css';
import adminIcon from './admin.png';

const AdminLogin = ({ navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      navigate('adminPage');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <img src={adminIcon} alt="Admin" className="login__icon" />
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default AdminLogin;
