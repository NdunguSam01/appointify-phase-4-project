import React, { useState, useEffect } from 'react';
import PatientRecords from './PatientRecords';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div>
      <h1>patients</h1>
      <PatientRecords patients={patients} />
    </div>
  );
};

export default PatientsPage;
