import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import RegistrationForm from './Admin Registration Form';
function App() 
{
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login/>}></Route>
        <Route exact path='/register' element={<RegistrationForm/>}></Route>
      </Routes>
    </>
  );
}

export default App;
