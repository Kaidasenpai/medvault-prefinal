import React from 'react';
import './Login.css';
import adminIcon from './admin.png';
import doctorIcon from './doctor.png';
import patientIcon from './patient.png';

const Login = ({ navigate }) => {
  return (
    <div className="login">
      <div className="login__content">
        <div className="login__button-container">
          <div className="login__button-wrapper">
            <img src={patientIcon} alt="Patient" className="login__icon" />
            <button onClick={() => navigate('patientLogin')} className="login__button">Patient</button>
          </div>
          <div className="login__button-wrapper">
            <img src={doctorIcon} alt="Doctor" className="login__icon" />
            <button onClick={() => navigate('doctorLogin')} className="login__button">Doctor</button>
          </div>
          <div className="login__button-wrapper">
            <img src={adminIcon} alt="Admin" className="login__icon" />
            <button onClick={() => navigate('adminLogin')} className="login__button">Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
