import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast, ToastContainer } from 'react-toastify';
const PatientRegistrationForm = ({patientData, setPatientData}) => 
{
  const [patientFormData, setPatientFormData]=useState(
    {
      first_name: '',
      last_name: '',
      email: " ",
      phone_number: '',
      gender: '',
      dob: '',
      address: '' ,
      blood_group: ''
    }
  )

  const handleChange= e => setPatientFormData(
    {
      ...patientFormData,
      [e.target.id]: e.target.value
    }
  )

  const handlePhoneNumberChange = (value) => 
  {
    setPatientFormData(
      {
        ...patientFormData,
        phone_number : value
      })
  };

  const handleSubmit = (e) => 
  {
    e.preventDefault();  
    fetch("/patients",
    {
      method: "POST",
      headers:
      {
        "Content-type": "application/json"
      },
      body: JSON.stringify(patientFormData)
    })
    .then(response =>
      {
        if(response.ok)
        {
          response.json()
          .then(patient => 
            {
              setPatientData([...patientData, patient])
              toast.success("User added successfully",
              {
                position : 'top-right'
              })
            })
        }
        else
        {
          response.json()
          .then(error => console.log(error))
        }
      })
      .then(setPatientFormData(
        {
          first_name: '',
          last_name: '',
          email: " ",
          phone_number: '',
          gender: '',
          dob: '',
          address: '' ,
          blood_group: ''
        }
      ))
  };
  return(
    <>
    <ToastContainer autoClose={2000} className="mx-1" pauseOnHover={false}/>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="name" placeholder="First Name" id="first_name" value={patientFormData.first_name} onChange={handleChange} required></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="name" placeholder="Last Name" id="last_name" value={patientFormData.last_name} onChange={handleChange} required></Form.Control>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="City" type="text" id="address" value={patientFormData.address} onChange={handleChange} required></Form.Control>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Email address" id="email" value={patientFormData.email} onChange={handleChange} required></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Phone Number</Form.Label>
            <PhoneInput international defaultCountry="KE" value={patientFormData.phone_number} onChange={handlePhoneNumberChange} required></PhoneInput>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Date of birth</Form.Label>
            <Form.Control type="date" placeholder="Date of birth" id="dob" value={patientFormData.dob} onChange={handleChange} required></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label="Select gender" value={patientFormData.gender} onChange={handleChange} id="gender">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Blood group</Form.Label>
            <Form.Select aria-label="Select the blood group" value={patientFormData.blood_group} onChange={handleChange} id="blood_group">
              <option value="">Select the blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Stack gap={2} className="col-md-5 mx-auto">
          <Button type="submit" variant="dark">Add new patient</Button>
        </Stack>
      </Form>    
    </>  
  )
};

export default PatientRegistrationForm;