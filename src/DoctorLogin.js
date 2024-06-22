import React, { useState } from 'react';
import './DoctorLogin.css';
import doctorIcon from './doctor.png';

const DoctorLogin = ({ navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'doctor' && password === 'doctor') {
      navigate('doctorPage');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <img src={doctorIcon} alt="Doctor" className="login__icon" />
        <h2>Doctor Login</h2>
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

export default DoctorLogin;
