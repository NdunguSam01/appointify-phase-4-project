import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col';
import { useState, useEffect } from 'react';
const Home = () => 
{
    const [patientCount, setPatientCount]=useState(0)
    const [doctorsCount, setDoctorsCount]=useState(0)
    const [appointmentCount, setAppointmentCount]=useState(0)
    const [adminName, setAdminName]=useState("")

    useEffect(()=>
    {
        fetch("https://appointify-project-api.onrender.com/dashboard")
        .then(response => response.json())
        .then(data => 
            {
                setAdminName(`${data.admin.first_name} ${data.admin.last_name}`)
                setAppointmentCount(data.appointments)
                setDoctorsCount(data.doctors)
                setPatientCount(data.patients)
            })
    })

    return (  
        <>
            <h1 className="text-center text-uppercase">Appointment Management System</h1>
            <h2 className="text-center text-uppercase mt-3">Welcome back, {adminName}</h2>
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