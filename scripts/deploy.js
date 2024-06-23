const { ethers } = require("hardhat");
let patientsData;

try {
  patientsData = require("../src/patients.json");
} catch (error) {
  console.error("Failed to load patients.json:", error);
  process.exit(1);
}

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const MedVaultRecords = await ethers.getContractFactory("MedVaultRecords");
  const medVaultRecords = await MedVaultRecords.deploy();
  await medVaultRecords.deployed();

  console.log(`Deployed MedVaultRecords Contract at: ${medVaultRecords.address}\n`);

  const patients = patientsData;

  if (!Array.isArray(patients) || patients.length === 0) {
    throw new Error("No patients found in the JSON file");
  }

  for (const patient of patients) {
    const transaction = await medVaultRecords.connect(deployer).registerPatient(
      parseInt(patient.id, 10),
      patient.name,
      patient.gender,
      patient.dateOfBirth,
      patient.bloodType,
      patient.imageUrl,
      patient.medicalHistory,
      patient.treatmentHistory,
      patient.patientAddress
    );

    await transaction.wait();
    console.log(`Registered patient ${patient.id}: ${patient.name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
