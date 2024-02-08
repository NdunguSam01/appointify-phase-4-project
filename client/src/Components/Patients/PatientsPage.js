import Table from 'react-bootstrap/Table'
import PatientTable from './Patient Records Table';
import PatientRegistrationForm from './Patient Registration Form'
import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion'
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
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Add a new patient</Accordion.Header>
          <Accordion.Body>
            <PatientRegistrationForm/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
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