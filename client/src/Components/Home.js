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
                            <Card.Title className='fw-bolder text-uppercase'>Patients</Card.Title>
                            <Card.Text className='fw-bold'>{patientCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4} className='mb-3'>
                    <Card>
                        <Card.Body>
                            <Card.Title className='fw-bolder text-uppercase'>Doctors</Card.Title>
                            <Card.Text className='fw-bold'>{doctorsCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4} className='mb-3'>
                    <Card>
                        <Card.Body>
                            <Card.Title className='fw-bolder text-uppercase'>Appointments</Card.Title>
                            <Card.Text className='fw-bold'>{appointmentCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
 
export default Home;