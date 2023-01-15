import {useState} from "react";
import axios from "axios";
import { Alert, Form, Button, Stack } from 'react-bootstrap';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = async (e) => {
    e.preventDefault();
    let response
    try {
      response = await axios.post(
        'api/register/',
        {
          username: username,
          email: email,
          password: password
        }
      );
      localStorage.setItem('auth_token', response.data.token);
      window.location.href = '/';
    } catch (error) {
      setError(error.response.data.message || 'Something went wrong.');
    }
  }

  return (
    <div className="register-form container-md">
      <h1 className="mb-4">Welcome, register yourself</h1>
      <Form onSubmit={register}>
        <Stack gap={2} className="col-md-5 mx-auto">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
        </Stack>
      </Form>
    </div>
  );
}


export default RegisterForm;