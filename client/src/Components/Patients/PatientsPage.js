import Table from 'react-bootstrap/Table'
import PatientTable from './Patient Records Table';
import { useState, useEffect } from 'react';

const PatientsPage = () => 
{
  const [patientData, setPatientData]=useState([])

  useEffect(()=>
  {
    fetch("/patients")
    .then(response => response.json())
    .then(data => setPatientData(data))
  },[])

  const patientDataMap= patientData.map(patient => 
    {
      return <PatientTable patient={patient}/>
    })
  return ( 
    <>
      <Table striped variant='light' className='table-bordered'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patientDataMap}
        </tbody>
      </Table>
    </>
   );
}
 
export default PatientsPage;