import React, {useState} from "react";
import axios from "axios";
import { Alert, Form, Button, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const authenticate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'api/authenticate/',
        {
          username: username,
          password: password
        }
      );

      localStorage.setItem('auth_token', response.data.token);
      navigate('/');
    } catch (error) {
      setError(error.response.data.message || 'Something went wrong.');
    }
  };

  return (
    <div className="login-form container-md">
      <h1 className="mb-4">Welcome back, please authenticate yourself!</h1>
      <Form onSubmit={authenticate}>
        <Stack gap={2} className="col-md-5 mx-auto">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit">Authenticate</Button>
            <Button variant={"outline-success"} onClick={() => navigate('/register') }>Register</Button>
        </Stack>
      </Form>
    </div>
  );
};

export default LoginForm;