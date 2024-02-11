import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import RegistrationForm from './Components/Admin Registration Form';
import Dashboard from './Components/Dashboard';
import React, { useState } from 'react';
function App() 
{
  const [loggedIn, setLoggedIn]=useState(false);
  
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login setLoggedIn={setLoggedIn}/>}></Route>
        <Route exact path='/register' element={<RegistrationForm/>}></Route>
        <Route exact path='/dashboard/*' element={<Dashboard loggedIn={loggedIn}/>}></Route>
      </Routes>
    </>
  );
}

export default App;
