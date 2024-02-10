// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => 
{
  const navigate=useNavigate()
  const handleLogOut = ()=>
  {
    fetch("/logout",
    {
      method: "POST"
    })
    .then(response =>
      {
        if(response.ok)
        {
          navigate("/")
        }
      })
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/dashboard" className="navbar-brand"> Dashboard</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/dashboard/appointments" className="nav-link">Appointments</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard/doctors" className="nav-link">Doctors</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard/patients" className="nav-link">Patients</Link>
          </li>
          <li className="nav-item">
            <Link onClick={handleLogOut} className="nav-link">Log out</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
