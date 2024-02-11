import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/esm/Row";
import { toast, ToastContainer } from 'react-toastify';

const AppointmentsForm = ({appointments, patients, doctors, setAppointments}) => 
{
    const [appointmentData, setAppointmentData]=useState(
        {
            patient_id: '',
            doctor_id: '',
            date: '',
            time: '',
            purpose: '',
        })

    const handleInputChange= e => setAppointmentData({...appointmentData, [e.target.id]: e.target.value})

    const handleSubmit= e =>
    {
        e.preventDefault()
        console.log("Form submitted")
        fetch("/appointments",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointmentData)
        })
        .then(response => 
            {
                if(response.ok)
                {
                    response.json()
                    .then(appointment=> 
                    {
                        setAppointments([...appointments, appointment])
                        toast.success("Appointment created successfully",
                        {
                            position: "top-right"
                        })
                    })
                    .then(setAppointmentData(
                        {
                            patient_id: '',
                            doctor_id: '',
                            date: '',
                            time: '',
                            purpose: '',
                        }
                    ))
                }
                else
                {
                    response.json()
                    .then(error => toast.error(error,
                        {
                            position: "top-right"
                        }))
                }
            })
    }

    return ( 
        <>
            <ToastContainer autoClose={2000} className="mx-1" pauseOnHover={false}/>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group className="col-md-6 mb-3">
                        <Form.Label>Patient</Form.Label>
                        <Form.Select aria-label="Select patient" id="patient_id" onChange={handleInputChange} required value={appointmentData.patient_id}>
                            <option value="">Please select a patient</option>
                            {patients.map(patient =>
                                {
                                    return <option key={patient.id} value={patient.id}>{patient.first_name} {patient.last_name}</option>
                                })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="col-md-6 mb-3">
                        <Form.Label>Doctor</Form.Label>
                        <Form.Select aria-label="Select doctor" id="doctor_id" onChange={handleInputChange} value={appointmentData.doctor_id} required>
                            <option value="">Please select a doctor</option>
                            {doctors.map(doctor =>
                                {
                                    return <option key={doctor.id} value={doctor.id}>{doctor.first_name} {doctor.last_name}</option>
                                })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="col-md-6 mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" id="date" value={appointmentData.date} required onChange={handleInputChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className="col-md-6 mb-3">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" id="time" value={appointmentData.time} required onChange={handleInputChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className="col-md-12 mb-3">
                        <Form.Label>Purpose</Form.Label>
                        <Form.Control type="textarea" id="purpose" value={appointmentData.purpose} style={{ height: '50px' }} onChange={handleInputChange} required></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="dark" className="col-md-3 mx-auto mt-3">Create new appointment</Button>
                </Row>
            </Form>
        </>
     );
}
 
export default AppointmentsForm;