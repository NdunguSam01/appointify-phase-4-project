import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = ({setLoggedIn}) => 
{
    const navigate=useNavigate()
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

    const login= e =>
    {
        e.preventDefault()
        fetch("https://appointify-project-api.onrender.com/login", 
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginFormData)
        })
        .then(response => 
            {
                if(response.ok)
                {
                    response.json()
                    .then(message =>
                    {
                        toast.success(message.message,
                            {
                                position: "top-right"
                            })
                        
                        setTimeout(()=>
                        {
                            navigate("/dashboard")
                        },2600)
                    })
                    setLoggedIn(true)
                }
                else
                {
                    response.json()
                    .then(data =>
                    {
                        toast.error(data,
                            {
                                position: "top-right"
                            })
                    })
                    .then(navigate("/"))
                }
            })
    }
    return ( 
        <>
            <ToastContainer autoClose={2000} className="mx-1" pauseOnHover={false}/>
            <Form className='login-form' onSubmit={login}>
                <h1 className='mb-3 fs-2'>Admin Login Form</h1>
                <Form.Group className='mb-3'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' id='email' onChange={handleChange} placeholder='Enter your email address' value={loginFormData.email} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" id='password' value={loginFormData.password} onChange={handleChange} placeholder="Password" required/>
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