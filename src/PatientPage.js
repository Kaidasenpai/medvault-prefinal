import React from 'react';
import './PatientPage.css';

const PatientPage = ({ registeredPatients, patientId }) => {
  const patient = registeredPatients.find(p => p.id === patientId);

  
  if (!patient) {
    return <div>Patient not found.</div>;
  }

  return (
    <div className="patient-page">
      <div className="patient-card">
        <img src={patient.imageUrl} alt={patient.name} className="patient-card-img" />
        <div className="patient-card-info">
          <h3>{patient.name}</h3>
          <p><strong>ID:</strong> {patient.id}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
          <p><strong>Blood Type:</strong> {patient.bloodType}</p>
          <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
          <p><strong>Treatment History:</strong> {patient.treatmentHistory}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;



//navigation to patient, call patientid and regustered patient -- let navigation be the same as the doctor