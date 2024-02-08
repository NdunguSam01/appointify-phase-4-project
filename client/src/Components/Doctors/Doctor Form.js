import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast, ToastContainer } from 'react-toastify';

const DoctorsForm = ({doctors, setDoctors}) => 
{
  const [doctorData, setDoctorData]=useState(
    {
      first_name: "",
      last_name: "",
      age: 0,
      gender: "",
      department: "",
      experience: 0
    })

  const handleInputChange= e => setDoctorData(
    {
      ...doctorData,
      [e.target.id]: e.target.value
    })

  const handleSubmit= e =>
  {
    e.preventDefault()
    console.log("Form submitted")
    fetch("/doctors",
    {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(doctorData) 
    })
    .then(response =>
      {
        if(response.ok)
        {
          response.json()
          .then(doctor => 
            {
              setDoctors([...doctors, doctor])
              toast.success("Doctor created successfully",
              {
                position: "top-right"
              })
            })
            .then(setDoctorData(
              {
                first_name: "",
                last_name: "",
                age: 0,
                gender: "",
                department: "",
                experience: 0
              }
            ))
        }
        else
        {
          response.json()
          .then(error=> toast.error(error,
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
          <Form.Group className='col-md-6 mb-3'>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="name" placeholder="First Name" id="first_name" value={doctorData.first_name} onChange={handleInputChange} required></Form.Control>
          </Form.Group>
          <Form.Group  className="col-md-6 mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="name" placeholder="Last Name" id="last_name" value={doctorData.last_name} onChange={handleInputChange} required></Form.Control>
          </Form.Group>
          <Form.Group  className="col-md-6 mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Age" id="age" value={doctorData.age} onChange={handleInputChange} required></Form.Control>
          </Form.Group>
          <Form.Group  className="col-md-6 mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label="Select gender" value={doctorData.gender} onChange={handleInputChange} id="gender">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group  className="col-md-6 mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select aria-label="Select department" value={doctorData.department} onChange={handleInputChange} id="department">
              <option value="">Select department</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Surgery">Surgery</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Oncology">Oncology</option>
              <option value="Infectious Diseases">Infectious Diseases</option>
              <option value="Radiology">Radiology</option>
              <option value="Dermatology">Dermatology</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='col-md-6 mb-3'>
            <Form.Label>Years of experience</Form.Label>
            <Form.Control type="number" placeholder="Years of experience" id="experience" value={doctorData.experience} onChange={handleInputChange} required></Form.Control>
          </Form.Group>
          <Button type="submit" variant="dark" className="col-md-2 mx-auto mt-3">Add new doctor</Button>
        </Row>
      </Form>
    </>
   );
}
 
export default DoctorsForm;