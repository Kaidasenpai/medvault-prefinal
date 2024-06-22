// server.js
const express = require('express');
const connectDB = require('./db');
const Patient = require('./models/Patient');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get('/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findOne({ id: req.params.id });
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/patients', async (req, res) => {
  const { id, name, gender, dateOfBirth, bloodType, imageUrl, medicalHistory, treatmentHistory, patientAddress } = req.body;
  try {
    let patient = new Patient({
      id,
      name,
      gender,
      dateOfBirth,
      bloodType,
      imageUrl,
      medicalHistory,
      treatmentHistory,
      patientAddress
    });
    await patient.save();
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
