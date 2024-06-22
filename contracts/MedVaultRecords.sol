// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract MedVaultRecords {
    address public owner;

    // Struct to store patient information
    struct Patient {
        string id;
        string name;
        string gender;
        string dateOfBirth;
        string bloodType;
        string imageUrl;
        string medicalHistory;
        string treatmentHistory;
    }

    // Mapping to store patients
    mapping(string => Patient) public patients;

    // Mapping to store addresses of doctors
    mapping(address => bool) public doctors;

    // Mapping to store addresses of admins
    mapping(address => bool) public admins;

    event PatientRegistered(string id, string patientName);
    event DoctorAdded(address doctor);
    event AdminAdded(address admin);
    event MedicalHistoryUpdated(string id, string updatedHistory);

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

    modifier onlyPatient(string memory id) {
        require(keccak256(abi.encodePacked(patients[id].id)) == keccak256(abi.encodePacked(id)), "Only patient can view their medical history");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Function to register a new patient (by admin)
    function registerPatient(string memory id, string memory name, string memory gender, string memory dateOfBirth, string memory bloodType, string memory imageUrl, string memory medicalHistory, string memory treatmentHistory) public onlyAdmin {
        Patient memory patient = Patient(id, name, gender, dateOfBirth, bloodType, imageUrl, medicalHistory, treatmentHistory);
        patients[id] = patient;

        // Emit registration event
        emit PatientRegistered(id, name);
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
    function updateMedicalHistory(string memory id, string memory newMedicalHistory) public onlyDoctor {
        require(bytes(patients[id].id).length != 0, "Patient not found");
        patients[id].medicalHistory = newMedicalHistory;

        // Emit medical history updated event
        emit MedicalHistoryUpdated(id, newMedicalHistory);
    }

    // Function for a patient to view their medical history
    function viewMedicalHistory(string memory id) public view onlyPatient(id) returns (string memory) {
        require(bytes(patients[id].id).length != 0, "Patient not found");
        return patients[id].medicalHistory;
    }
}
