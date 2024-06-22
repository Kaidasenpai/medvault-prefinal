import React, { useState } from 'react';
import './DoctorPage.css';

const DoctorPage = ({ registeredPatients }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newMedicalHistory, setNewMedicalHistory] = useState('');

  const handleCardClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleClosePatientView = () => {
    setSelectedPatient(null);
  };

  const updateMedicalHistory = () => {
    if (!selectedPatient) return;

    const updatedPatient = { 
      ...selectedPatient, 
      medicalHistory: selectedPatient.medicalHistory + '\n' + newMedicalHistory 
    };
    const index = registeredPatients.findIndex(p => p.id === selectedPatient.id);
    registeredPatients[index] = updatedPatient;

    setSelectedPatient(null);
    setNewMedicalHistory('');
  };

  return (
    <div className="doctor-page">
      <h1>Doctor Page</h1>
      <div className="patient-cards">
        {registeredPatients.map((patient, index) => (
          <div className="patient-card" key={index} onClick={() => handleCardClick(patient)}>
            <img src={patient.imageUrl} alt={patient.name} className="patient-card-img" />
            <div className="patient-card-info">
              <h3>{patient.name}</h3>
              <p><strong>ID:</strong> {patient.id}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
              <p><strong>Blood Type:</strong> {patient.bloodType}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedPatient && (
        <div className="patient-modal">
          <div className="patient-modal-content">
            <span className="close" onClick={handleClosePatientView}>&times;</span>
            <h2>{selectedPatient.name}</h2>
            <p><strong>ID:</strong> {selectedPatient.id}</p>
            <p><strong>Gender:</strong> {selectedPatient.gender}</p>
            <p><strong>Date of Birth:</strong> {selectedPatient.dateOfBirth}</p>
            <p><strong>Blood Type:</strong> {selectedPatient.bloodType}</p>
            <p><strong>Medical History:</strong> {selectedPatient.medicalHistory}</p>
            <p><strong>Treatment History:</strong> {selectedPatient.treatmentHistory}</p>
            <textarea
              value={newMedicalHistory}
              onChange={(e) => setNewMedicalHistory(e.target.value)}
              placeholder="Enter new medical history"
            />
            <button onClick={updateMedicalHistory}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPage;
