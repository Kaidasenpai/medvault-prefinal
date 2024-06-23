import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './PatientLogin.css';
import patientIcon from './patient.png';
import contractABI from './abis/MedVaultRecords.json'; // Ensure the correct path

const PatientLogin = ({ navigate }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const connectToLocalNode = async () => {
      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
      const signer = provider.getSigner(0); // Use the first account
      const address = await signer.getAddress();
      setWalletAddress(address);

      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your deployed contract address
      const checksummedAddress = ethers.utils.getAddress(contractAddress);
      const contractInstance = new ethers.Contract(checksummedAddress, contractABI, signer);
      setContract(contractInstance);
    };

    connectToLocalNode();
  }, []);

  const handleLogin = async () => {
    if (!walletAddress) {
      alert('No wallet connected');
      return;
    }

    if (!contract) {
      console.error('Contract is not set');
      return;
    }

    try {
      const patient = await contract.getPatientByAddress(walletAddress);
      console.log('Fetched patient:', patient); // Debugging information
      navigate('patientPage', { state: { patient } });
    } catch (error) {
      console.error('Error fetching patient data:', error);
      alert('No patient found with the connected wallet address');
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__button-wrapper">
          <img src={patientIcon} alt="Patient" className="login__icon" />
          <input
            type="text"
            placeholder="Wallet Address"
            value={walletAddress}
            readOnly
            className="login__input"
          />
          <button onClick={handleLogin} className="login__button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
