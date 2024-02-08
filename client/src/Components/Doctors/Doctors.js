import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import DoctorsForm from './Doctor Form';
import { useEffect, useState } from 'react';
import DoctorsTable from './Doctors Table';

const Doctors = () => 
{
    const [doctors, setDoctors]=useState([])
    useEffect(()=>
    {
       fetch("/doctors")
       .then(response => response.json())
       .then(data => setDoctors(data)) 
    },[])

    const doctorsMap=doctors.map(doctor =>
        {
            return <DoctorsTable doctor={doctor}/>
        })
    return ( 
        <>
            <Accordion>
                <Accordion.Item eventKey='0'>
                <Accordion.Header>Add a new doctor</Accordion.Header>
                <Accordion.Body>
                    <DoctorsForm setDoctors={setDoctors} doctors={doctors}/>
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Table striped variant='light' className='table-bordered'>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Department</th>
                    <th>Gender</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {doctors.length === 0 ?
                        <tr>
                            <td colSpan={5} className='text-center'>No data available.</td>
                        </tr>    
                    :
                        doctorsMap
                    }
                </tbody>
            </Table>
        </>
     );
}
 
export default Doctors;