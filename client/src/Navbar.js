// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => 
{
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link to="/dashboard" className="navbar-brand">Hospital Dashboard</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/dashboard/appointments" className="nav-link">Appointments</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/doctors" className="nav-link">Doctors</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/patients" className="nav-link">Patients</Link>
        </li>
      </ul>
    </div>
  </nav>
  )
  
};

export default Navbar;