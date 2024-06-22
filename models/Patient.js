// models/Patient.js
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  bloodType: { type: String, required: true },
  imageUrl: { type: String, required: true },
  medicalHistory: { type: String, required: true },
  treatmentHistory: { type: String, required: true },
  patientAddress: { type: String, required: true }
});

module.exports = mongoose.model('Patient', PatientSchema);
