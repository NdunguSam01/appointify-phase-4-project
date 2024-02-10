import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col';
import { useState, useEffect } from 'react';
const Home = () => 
{
    const [patientCount, setPatientCount]=useState(0)
    const [doctorsCount, setDoctorsCount]=useState(0)
    const [appointmentCount, setAppointmentCount]=useState(0)

    useEffect(()=>
    {
        fetch("/dashboard")
        .then(response => response.json())
        .then(data => 
            {
                setAppointmentCount(data.appointments)
                setDoctorsCount(data.doctors)
                setPatientCount(data.patients)
            })
    })
    return (  
        <>
            <h1 className="text-center text-uppercase">Appointment Management System</h1>
            <Row style={{width: "90%", margin: "50px auto"}}>
                <Col sm={4} className='mb-3'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Patients</Card.Title>
                            <Card.Text>{patientCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4} className='mb-3'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Doctors</Card.Title>
                            <Card.Text>{doctorsCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4} className='mb-3'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Appointments</Card.Title>
                            <Card.Text>{appointmentCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
 
export default Home;