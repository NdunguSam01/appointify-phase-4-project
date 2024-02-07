import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
const Login = () => 
{
    return ( 
        <>
            <Form className='login-form'>
                <h1 className='mb-3 fs-2'>Admin Login Form</h1>
                <Form.Group className='mb-3'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' placeholder='Enter your email address'></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
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