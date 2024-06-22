import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Landing from './Landing';
import Login from './Login';
import PatientLogin from './PatientLogin';
import DoctorLogin from './DoctorLogin';
import AdminLogin from './AdminLogin';
import PatientPage from './PatientPage';
import DoctorPage from './DoctorPage';
import AdminPage from './AdminPage';
import Navigation from './components/Navigation';
import './App.css';

const registeredPatients = [
  {
    "id": "001",
    "name": "John Doe",
    "gender": "male",
    "dateOfBirth": "1990-01-01",
    "bloodType": "O+",
    "imageUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
    "medicalHistory": "No major illnesses.",
    "treatmentHistory": "Regular check-ups.",
    "patientAddress": "0x123456789abcdef"
  },
  {
    "id": "002",
    "name": "Jane Smith",
    "gender": "female",
    "dateOfBirth": "1985-05-12",
    "bloodType": "A+",
    "imageUrl": "https://media.istockphoto.com/id/615279718/photo/businesswoman-portrait-on-white.jpg?s=612x612&w=0&k=20&c=Aa2Vy4faAPe9fAE68Z01jej9YqPqy-RbAteIlF3wcjk=",
    "medicalHistory": "Diabetic.",
    "treatmentHistory": "Insulin treatment.",
    "patientAddress": "0xabcdef123456789"
  },
  {
    "id": "003",
    "name": "Alice Johnson",
    "gender": "female",
    "dateOfBirth": "1978-11-23",
    "bloodType": "B+",
    "imageUrl": "https://t3.ftcdn.net/jpg/04/18/13/92/360_F_418139265_COA2l5jcOW4gF2k0w5NDQVvLnGPwsTcv.jpg",
    "medicalHistory": "Hypertension.",
    "treatmentHistory": "Blood pressure medication.",
    "patientAddress": "0x789abcdef123456"
  },
  {
    "id": "004",
    "name": "Bob Brown",
    "gender": "male",
    "dateOfBirth": "2000-07-15",
    "bloodType": "O-",
    "imageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
    "medicalHistory": "Asthma.",
    "treatmentHistory": "Inhaler treatment.",
    "patientAddress": "0x456123789abcdef"
  },
  {
    "id": "005",
    "name": "Charlie Green",
    "gender": "male",
    "dateOfBirth": "1995-03-10",
    "bloodType": "AB+",
    "imageUrl": "https://www.shutterstock.com/image-photo/id-photo-portrait-handsome-mature-260nw-1592137060.jpg",
    "medicalHistory": "Allergies.",
    "treatmentHistory": "Antihistamines.",
    "patientAddress": "0x654789abcdef123"
  },
  {
    "id": "006",
    "name": "Diana Blue",
    "gender": "female",
    "dateOfBirth": "1982-08-30",
    "bloodType": "A-",
    "imageUrl": "https://media.istockphoto.com/id/1691969118/photo/smiling-beautiful-woman-on-white-background-passport-photo.jpg?s=612x612&w=0&k=20&c=sUSZogJiUCOjYSB1sD_dXhsRgstqOGDsEGpsq63N2jY=",
    "medicalHistory": "Thyroid issues.",
    "treatmentHistory": "Thyroid hormone replacement.",
    "patientAddress": "0x321456789abcdef"
  },
  {
    "id": "007",
    "name": "Evan White",
    "gender": "male",
    "dateOfBirth": "1970-04-18",
    "bloodType": "B-",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Frank-Walter_Steinmeier_at_Brazil.jpg/800px-Frank-Walter_Steinmeier_at_Brazil.jpg",
    "medicalHistory": "Heart disease.",
    "treatmentHistory": "Cardiac surgery.",
    "patientAddress": "0x987654321abcdef"
  },
  {
    "id": "008",
    "name": "Fiona Black",
    "gender": "female",
    "dateOfBirth": "1965-09-05",
    "bloodType": "O+",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC2k_mRTtn4ZCuaCWY1crj3V_Of6VE3VmsOA&s",
    "medicalHistory": "Cancer survivor.",
    "treatmentHistory": "Chemotherapy.",
    "patientAddress": "0xabcdef987654321"
  },
  {
    "id": "009",
    "name": "Emma",
    "gender": "female",
    "dateOfBirth": "2001-12-08",
    "bloodType": "O-",
    "imageUrl": "https://img.freepik.com/free-photo/portrait-fair-haired-woman-with-warm-blue-eyes-dry-lips-healthy-skin-looking-directly-alluring-girl-with-beautiful-appearance-dressed-casually-posing_273609-7635.jpg",
    "medicalHistory": "Cancer survivor.",
    "treatmentHistory": "Chemotherapy.",
    "patientAddress": "0xabcdef987654301"
  }
];

const App = () => {
  const [page, setPage] = useState('landing');
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const checkMetaMask = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        console.log('MetaMask is installed!');
      } else {
        console.log('Please install MetaMask!');
      }
    };
    checkMetaMask();
  }, []);

  const connectMetaMask = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('User rejected the request.');
      }
    }
  };

  const handleLogout = () => {
    setAccount(null);
    setPage('landing');
  };

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <Login navigate={setPage} />;
      case 'patientLogin':
        return <PatientLogin navigate={setPage} registeredPatients={registeredPatients} account={account} connectMetaMask={connectMetaMask} handleLogout={handleLogout} />;
      case 'patientPage':
        return <PatientPage navigate={setPage} registeredPatients={registeredPatients} account={account} connectMetaMask={connectMetaMask} handleLogout={handleLogout} />;
      case 'doctorLogin':
        return <DoctorLogin navigate={setPage} account={account} connectMetaMask={connectMetaMask} handleLogout={handleLogout} />;
      case 'doctorPage':
        return <DoctorPage navigate={setPage} registeredPatients={registeredPatients} account={account} connectMetaMask={connectMetaMask} handleLogout={handleLogout} />;
      case 'adminLogin':
        return <AdminLogin navigate={setPage} account={account} connectMetaMask={connectMetaMask} handleLogout={handleLogout} />;
      case 'adminPage':
        return <AdminPage navigate={setPage} registeredPatients={registeredPatients} account={account} connectMetaMask={connectMetaMask} handleLogout={handleLogout} />;
      default:
        return <Landing navigate={setPage} />;
    }
  };

  return (
    <div className="App">
      <Navigation account={account} setAccount={setAccount} setView={setPage} />
      {renderPage()}
    </div>
  );
};

export default App;
