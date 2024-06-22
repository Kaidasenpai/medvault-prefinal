const mongoose = require('mongoose');
const Patient = require('../models/Patient'); // Ensure this path is correct based on your project structure
const patients = require('../src/patients.json');

const loadPatients = async () => {
  await mongoose.connect('mongodb://localhost:27017/medvault', { useNewUrlParser: true, useUnifiedTopology: true });

  for (let patient of patients) {
    const newPatient = new Patient(patient);
    await newPatient.save();
  }

  console.log('Patients loaded successfully');
  mongoose.disconnect();
};

loadPatients().catch(err => console.error(err));
