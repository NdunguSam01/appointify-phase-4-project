import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import RegistrationForm from './Components/Admin Registration Form';
import Dashboard from './Components/Dashboard';
import React from 'react';
function App() 
{
  const accessToken=localStorage.getItem("token")
  
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login/>}></Route>
        <Route exact path='/register' element={<RegistrationForm/>}></Route>
        <Route exact path='/dashboard/*' element={<Dashboard accessToken={accessToken}/>}></Route>
      </Routes>
    </>
  );
}

export default App;
