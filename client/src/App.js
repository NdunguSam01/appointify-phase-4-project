import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import RegistrationForm from './Components/Admin Registration Form';
import Dashboard from './Components/Dashboard';
// import PatientRegistrationForm from './Components/PatientRegistrationForm';
// import PatientDetailPage  from './Components/PatientDetails';
// import patientpage  from '/Components/patientpage';
// import PatientRecords from './Components/PatientRecords';
// import DoctorsTable   from  "./Components/DoctorTable";
// import DoctorsPage from './Components/DoctorsPage';

import React from 'react';
function App() 
{
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login/>}></Route>
        <Route exact path='/register' element={<RegistrationForm/>}></Route>
        <Route exact path='/dashboard/*' element={<Dashboard/>}></Route>
      </Routes>
    </>
  );
}

export default App;
