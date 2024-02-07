import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import { useState } from 'react';
const Login = () => 
{
    const [loginFormData, setLoginFormData]=useState(
        {
            email: "",
            password: ""
        }
    )

    const handleChange= e => setLoginFormData(
        {
            ...loginFormData,
            [e.target.id]: e.target.value
        }
    )
    console.log(loginFormData)
    return ( 
        <>
            <Form className='login-form'>
                <h1 className='mb-3 fs-2'>Admin Login Form</h1>
                <Form.Group className='mb-3'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' id='email' onChange={handleChange} placeholder='Enter your email address' value={loginFormData.email}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" id='password' value={loginFormData.password} onChange={handleChange} placeholder="Password" />
                </Form.Group>
                <Row className='ms-3'>
                    <Col>
                        <Button variant='dark' type='submit' className='mb-1'>Login</Button>
                    </Col>
                    <Col>
                        <Link to="/register" className='btn btn-info'>Sign Up</Link>
                    </Col>
                </Row>
            </Form>
        </>
     );
}
 
export default Login;