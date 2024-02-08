// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link to="/" className="navbar-brand">Dashboard</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/appointments" className="nav-link">Appointments</Link>
        </li>
        <li className="nav-item">
          <Link to="/doctors" className="nav-link">Doctors</Link>
        </li>
        <li className="nav-item">
          <Link to="/patients" className="nav-link">Patients</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;