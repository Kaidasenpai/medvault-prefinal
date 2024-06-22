import React, { useState } from 'react';
import './PatientLogin.css';
import patientIcon from './patient.png';

const PatientLogin = ({ navigate, registeredPatients }) => {
  const [patientId, setPatientId] = useState('');

  const handleLogin = () => {
   console.log(registeredPatients)
    const patient = registeredPatients.find(p => p.id === patientId);
    console.log(patient)
    if (patient) {
      navigate('patientPage', { state: { patient } });
    } else {
      alert('Invalid patient ID');
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__button-wrapper">
          <img src={patientIcon} alt="Patient" className="login__icon" />
          <input
            type="text"
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="login__input"
          />
          <button onClick={handleLogin} className="login__button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;

