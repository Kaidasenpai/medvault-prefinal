import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './Patient.css';
import config from '../config.json';

const Patient = ({ account }) => {
  const [patientData, setPatientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          config.contractAddress,
          config.abi,
          signer
        );
        
        const patientId = await contract.patientIds(account);
        const patient = await contract.patients(patientId);

        setPatientData({
          id: patient.id,
          name: patient.name,
          gender: patient.gender,
          dateOfBirth: patient.dateOfBirth,
          imageUrl: patient.imageUrl,
          medicalHistory: patient.medicalHistory,
          treatmentHistory: patient.treatmentHistory
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setIsLoading(false);
      }
    };

    if (account) {
      loadPatientData();
    }
  }, [account]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!patientData) {
    return <div>No patient data found for this account.</div>;
  }

  return (
    <div className="patient-page">
      <h1>Patient Information</h1>
      <div className="patient-card">
        <img src={patientData.imageUrl} alt={patientData.name} className="patient-card-img" />
        <div className="patient-card-info">
          <h3>{patientData.name}</h3>
          <p><strong>ID:</strong> {patientData.id}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
          <p><strong>Date of Birth:</strong> {patientData.dateOfBirth}</p>
          <p><strong>Medical History:</strong> {patientData.medicalHistory}</p>
          <p><strong>Treatment History:</strong> {patientData.treatmentHistory}</p>
        </div>
      </div>
    </div>
  );
};

export default Patient;
