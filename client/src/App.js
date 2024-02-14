import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import RegistrationForm from './Components/Admin Registration Form';
import Dashboard from './Components/Dashboard';
import React, { useState } from 'react';
function App() 
{
  const [loggedIn, setLoggedIn]=useState(false);
  const [accessToken, setAccessToken]=useState(null)

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login setLoggedIn={setLoggedIn} setAccessToken={setAccessToken}/>}></Route>
        <Route exact path='/register' element={<RegistrationForm/>}></Route>
        <Route exact path='/dashboard/*' element={<Dashboard loggedIn={loggedIn} accessToken={accessToken}/>}></Route>
      </Routes>
    </>
  );
}

export default App;
