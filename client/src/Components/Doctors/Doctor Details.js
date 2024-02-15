import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const DoctorDetails = () => 
{
    const {id}=useParams()
    const navigate=useNavigate()
    const [doctor, setDoctor]=useState(null)

    useEffect(()=>
    {
        fetch(`https://appointify-project-api.onrender.com/doctors/${id}`)
        .then(response => 
            {
                if(response.ok)
                {
                    response.json()
                    .then(data=>setDoctor(data))
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
    },[id])

    console.log(doctor)
    const [updatedDetails, setUpdatedDetails]=useState(
        {
            first_name: '',
            last_name: '',
            department: ''
        })

    const handleInputChange= e =>setUpdatedDetails({...updatedDetails, [e.target.id]: e.target.value})

    const handleUpdate = e =>
    {
        e.preventDefault()
        fetch(`https://appointify-project-api.onrender.com/doctors/${id}`,
        {
            method: "PATCH",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedDetails)
        })
        .then(response => 
            {
                if(response.ok)
                {
                    response.json()
                    .then(message => toast.success(message,
                        {
                            position: "top-right"
                        }))
                }
                else
                {
                    response.json()
                    .then(message => toast.error(message,
                        {
                            position: "top-right"
                        }))
                }
            })
    }

    const handleDelete = () =>
    {
        fetch(`/doctors/${id}`,
        {
            method: "DELETE",
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        .then(response =>
            {
                if(response.ok)
                {
                    response.json()
                    .then(message => 
                        {
                            toast.success(message,
                            {
                                position: "top-right"
                            })
                            navigate("/dashboard/doctors")
                        })
                }
                else
                {
                    response.json()
                    .then(message => toast.error(message,
                        {
                            position: "top-right"
                        }))
                }
            })
    }

    return ( 
        <>
            <ToastContainer autoClose={2000} className="mx-1" pauseOnHover={false}/>
            {doctor &&
                <Form className="form" style={{margin: "40px auto"}}>
                    <Row>
                    <Form.Group className='col-md-6 mb-3'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="name" placeholder="First Name" id="first_name" defaultValue={doctor.first_name}  onChange={handleInputChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group  className="col-md-6 mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="name" placeholder="Last Name" id="last_name" defaultValue={doctor.last_name} onChange={handleInputChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group  className="col-md-6 mb-3">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="Age" id="age" value={doctor.age} readOnly></Form.Control>
                    </Form.Group>
                    <Form.Group  className="col-md-6 mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control aria-label="Select gender" value={doctor.gender} id="gender" readOnly></Form.Control>
                    </Form.Group>
                    <Form.Group  className="col-md-6 mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Select aria-label="Select department" defaultValue={doctor.department} onChange={handleInputChange} id="department">
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
                        <Form.Control type="number" placeholder="Years of experience" id="experience" value={doctor.experience} readOnly></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="dark" className="col-md-2 mx-auto mt-3" onClick={handleUpdate}>Update information</Button>
                    <Button variant="danger" className="col-md-2 mx-auto mt-3" onClick={handleDelete}>Delete doctor</Button>
                    </Row>
                </Form>
            }
        </>
     );
}
 
export default DoctorDetails;