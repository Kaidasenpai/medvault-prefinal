// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract MedVaultRecords {
    address public owner;
    uint256 public patientCount = 0;
    
    // Struct to store patient information
    struct Patient {
        uint256 id;
        string name;
        string gender;
        string dateOfBirth;
        string bloodType;
        string imageUrl;
        string medicalHistory;
        string treatmentHistory;
        address patientAddress;
    }

    // Mapping to store patients
    mapping(uint256 => Patient) public patients;

    // Mapping to store addresses of doctors
    mapping(address => bool) public doctors;

    // Mapping to store addresses of admins
    mapping(address => bool) public admins;

    event PatientRegistered(uint256 indexed id, string name);
    event DoctorAdded(address doctor);
    event AdminAdded(address admin);
    event MedicalHistoryUpdated(uint256 id, string updatedHistory);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyDoctor() {
        require(doctors[msg.sender], "Only doctor can perform this action");
        _;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admin can perform this action");
        _;
    }

    modifier onlyPatient(uint256 id) {
        require(patients[id].patientAddress == msg.sender, "Only patient can view their medical history");
        _;
    }

    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true; // Set the deployer as the initial admin
    }

    // Function to register a new patient (by admin)
    function registerPatient(
        uint256 id,
        string memory name, 
        string memory gender, 
        string memory dateOfBirth, 
        string memory bloodType, 
        string memory imageUrl, 
        string memory medicalHistory, 
        string memory treatmentHistory,
        address patientAddress
        ) public onlyAdmin {

        Patient memory patient = Patient(
            id, 
            name, 
            gender, 
            dateOfBirth, 
            bloodType, 
            imageUrl, 
            medicalHistory, 
            treatmentHistory,
            patientAddress
        );
        patients[id] = patient;

        // Emit registration event
        emit PatientRegistered(id, name);
    }


    function getPatientByAddress(address patientAddress) public view returns (Patient memory) {
        for (uint256 i = 1; i <= patientCount; i++) { // Assuming you have a patientCount variable
            if (patients[i].patientAddress == patientAddress) {
                return patients[i];
            }
        }
        revert("Patient not found");
    }

    // Function to add a new doctor
    function addDoctor(address doctor) public onlyOwner {
        doctors[doctor] = true;

        // Emit doctor added event
        emit DoctorAdded(doctor);
    }

    // Function to add a new admin
    function addAdmin(address admin) public onlyOwner {
        admins[admin] = true;

        // Emit admin added event
        emit AdminAdded(admin);
    }

    // Function to update medical history (only by doctors)
    function updateMedicalHistory(uint256 id, string memory newMedicalHistory) public onlyDoctor {
        require(patients[id].id != 0, "Patient not found");
        patients[id].medicalHistory = newMedicalHistory;

        // Emit medical history updated event
        emit MedicalHistoryUpdated(id, newMedicalHistory);
    }

    // Function for a patient to view their medical history
    function viewMedicalHistory(uint256 id) public view onlyPatient(id) returns (string memory) {
        require(patients[id].id != 0, "Patient not found");
        return patients[id].medicalHistory;
    }
}
