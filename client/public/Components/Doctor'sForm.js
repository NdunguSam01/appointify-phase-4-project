import React, { useState } from 'react';
import DoctorsTable from './DoctorsTable';

const DoctorsForm = () => {
  const [doctor, setDoctor] = useState({
    id: '',
    name: '',
    specialty: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted doctor:', doctor);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={doctor.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="specialty">Specialty:</label>
      <input
        type="text"
        id="specialty"
        name="specialty"
        value={doctor.specialty}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Doctor</button>
    </form>
  );
};

const App = () => {
  return (
    <div>
      <h1>Doctors Form</h1>
      <DoctorsForm />
      <h2>Doctors Table</h2>
      <DoctorsTable />
    </div>
  );
};

export default App;