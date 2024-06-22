import React from 'react';
import './Landing.css';
import medvaultLogo from './medvault.png';

const Landing = ({ navigate }) => {
  return (
    <div className="landing">
      <div className="landing__content">
        <img src={medvaultLogo} alt="MedVault" className="landing__logo" />
        <h1 className="landing__title">MedVault</h1>
        <button onClick={() => navigate('login')} className="landing__button">Continue to Log In</button>
      </div>
    </div>
  );
};

export default Landing;
