import Table from "react-bootstrap/esm/Table";
import Accordion from 'react-bootstrap/Accordion'
import AppointmentsForm from "./Appointment Form";
import { useEffect, useState } from "react";
import AppointmentsTable from "./Appointments Table";

const Appointments = () => 
{
    const [appointments, setAppointments]=useState([])
    const [doctors, setDoctors]=useState([])
    const [patients, setPatients]=useState([])

    useEffect(()=>
    {
        fetch("/appointments")
        .then(response => response.json())
        .then(appointments => 
            {
                appointments.forEach(appointment => 
                {
                    setAppointments(appointment.appointments)
                    setDoctors(appointment.doctors)
                    setPatients(appointment.patients)
                });
                
            })
    },[])

    return ( 
        <>
            <h1>Appointments Page</h1>
            <Accordion>
                <Accordion.Item eventKey='0'>
                <Accordion.Header>Create a new appointment</Accordion.Header>
                <Accordion.Body>
                    <AppointmentsForm patients={patients} doctors={doctors} appointments={appointments} setAppointments={setAppointments}/>
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Table striped variant="light" className="table-bordered">
                <thead>
                    <tr>
                        <th>Patient's Name</th>
                        <th>Doctor's Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Purpose</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <AppointmentsTable appointments={appointments}/>
            </Table>
        </>
     );
}
 
export default Appointments;