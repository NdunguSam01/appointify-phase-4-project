import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'
const RegistrationForm = () => 
{
    const navigate=useNavigate()
    const [formData, setFormData]=useState(
        {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    )

    const handleChange= e => setFormData(
        {
            ...formData,
            [e.target.id]: e.target.value
        }
    )

    const register= e =>
    {   
        e.preventDefault()
        fetch("/register", 
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
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
                        position:'top-right',
                        })

                        setTimeout(()=>
                        {
                            navigate("/")
                        },2600)
                    })
            }
            else
            {
                response.json()
                .then(error => 
                    {
                        console.log(error)
                        toast.error(error,
                        {
                        position:'top-right',
                        })

                        setTimeout(()=>
                        {
                            navigate("/register")
                        },2600)
                    })
            }
        })
        .then(setTimeout(() => setFormData(
            {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirm_password: ''
            }), 3000))
    }
    return ( 
        <>
            <ToastContainer autoClose={2000} className="mx-1" pauseOnHover={false}/>
            <Form className='registration-form' onSubmit={register}>
                <h1>Admin Registration Form</h1>
                <Row className='mb-3'>
                    <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='name' id='first_name' placeholder='First Name' onChange={handleChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='name' id='last_name' onChange={handleChange} placeholder='Last Name' required></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" id='email' placeholder='Email address' onChange={handleChange} required />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id='password' placeholder='Enter your password' onChange={handleChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' id='confirm_password' placeholder='Confirm your password' onChange={handleChange} required></Form.Control>
                    </Form.Group>
                </Row>
                <Button variant='primary' type='submit' className='mt-3'>Submit</Button>
            </Form>
        </>
     );
}
 
export default RegistrationForm;