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
      <Accordion>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Add a new patient</Accordion.Header>
          <Accordion.Body>
            <PatientRegistrationForm setPatientData={setPatientData} patientData={patientData}/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Table striped variant='light' className='table-bordered'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Blood Group</th>
          </tr>
        </thead>
        <tbody>
          {patientData.length === 0 ? 
            <tr>
              <td colSpan={7} className='text-center'>No data available</td>
            </tr>
          :
            patientDataMap  
          } 
        </tbody>
      </Table>
    </>
   );
}
 
export default PatientsPage;