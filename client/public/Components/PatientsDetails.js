import React, { useState, useEffect } from 'react';

const PatientDetailsPage = ({ match }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = () => {
      fetch(`/api/patients/${match.params.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch patient');
          }

          return response.json();
        })
        .then((data) => {
          setPatient(data);
        })
        .catch((error) => {
          console.error('Error fetching patient:', error);
        });
    };

    fetchPatient();
  }, [match.params.id]);

  const handleDelete = () => {
    fetch(`/api/patients/${patient.id}`, { method: 'DELETE' })
      .then(() => {
        window.history.back();
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
      });
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Patient Details</h1>
      <p>ID: {patient.id}</p>
      <p>Name: {patient.name}</p>
      <p>Email: {patient.email}</p>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default PatientDetailsPage;