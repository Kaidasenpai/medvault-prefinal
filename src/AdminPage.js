import React, { useState } from 'react';
import './AdminPage.css';

const AdminPage = ({ registeredPatients }) => {
  const [newPatient, setNewPatient] = useState({
    id: '',
    name: '',
    gender: '',
    dateOfBirth: '',
    bloodType: '',
    imageUrl: '',
    medicalHistory: '',
    treatmentHistory: '',
    patientAddress: ''
  });

  const [patients, setPatients] = useState(registeredPatients);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleRegister = () => {
    setPatients([...patients, newPatient]);
    setNewPatient({
      id: '',
      name: '',
      gender: '',
      dateOfBirth: '',
      bloodType: '',
      imageUrl: '',
      medicalHistory: '',
      treatmentHistory: '',
      patientAddress: ''
    });
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <div className="form-container">
        <h2>Register New Patient</h2>
        <form>
          <label>
            Patient ID:
            <input
              type="text"
              name="id"
              value={newPatient.id}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newPatient.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={newPatient.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={newPatient.dateOfBirth}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Blood Type:
            <select
              name="bloodType"
              value={newPatient.bloodType}
              onChange={handleInputChange}
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              value={newPatient.imageUrl}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Medical History:
            <textarea
              name="medicalHistory"
              value={newPatient.medicalHistory}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            Treatment History:
            <textarea
              name="treatmentHistory"
              value={newPatient.treatmentHistory}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            Patient Address:
            <input
              type="text"
              name="patientAddress"
              value={newPatient.patientAddress}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={handleRegister}>
            Confirm
          </button>
        </form>
      </div>
      <div className="patients-list">
        <h2>Current Patients</h2>
        <div className="patients-cards">
          {patients.map((patient, index) => (
            <div className="patient-card" key={index}>
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
      </div>
    </div>
  );
};

export default AdminPage;
