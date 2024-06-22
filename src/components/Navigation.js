import React from 'react';
import { ethers } from 'ethers';
import './Navigation.css';
import medvaultLogo from './health.png';

const Navigation = ({ account, setAccount, setView }) => {
  const connectHandler = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    } catch (error) {
      console.error("Error connecting to wallet: ", error);
    }
  };

  const logoutHandler = () => {
    setAccount(null);
    setView('landing');
  };

  return (
    <nav className="nav">
      <div className='nav__brand'>
        <img src={medvaultLogo} alt="MedVault Logo" className="nav__logo" />
        <h1>MedVault</h1>
      </div>
      <div className="nav__buttons">
        {account ? (
          <>
            <button type="button" className='nav__connect'>
              {account.slice(0, 6) + '...' + account.slice(38, 42)}
            </button>
            <button type="button" className='nav__logout' onClick={logoutHandler}>
              Log Out
            </button>
          </>
        ) : (
          <button type="button" className='nav__connect' onClick={connectHandler}>
            Connect
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
