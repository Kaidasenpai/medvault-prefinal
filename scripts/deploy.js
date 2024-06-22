// scripts/deploy.js
const { ethers } = require("hardhat");
const { patients } = require("../src/patients.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const MedVaultRecords = await ethers.getContractFactory("MedVaultRecords");
  const medVaultRecords = await MedVaultRecords.deploy();
  await medVaultRecords.deployed();

  console.log(`Deployed MedVaultRecords Contract at: ${medVaultRecords.address}\n`);

  for (let i = 0; i < patients.length; i++) {
    const transaction = await medVaultRecords.connect(deployer).registerPatient(
      patients[i].id,
      patients[i].name,
      patients[i].gender,
      patients[i].dateOfBirth,
      patients[i].bloodType,
      patients[i].imageUrl,
      patients[i].medicalHistory,
      patients[i].treatmentHistory
    );

    await transaction.wait();
    console.log(`Registered patient ${patients[i].id}: ${patients[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
