import React, { useEffect, useState } from "react"
import axios from "../api/axios";
import { Alert, Form, Button, Stack } from 'react-bootstrap';

const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [budget, setBudget] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setIsLoading(true);
        try {
            const apiUrl = `api/userprofile`;
            axios.get(apiUrl).then((profile) => {
                setUsername(profile.data.user.username);
                setEmail(profile.data.user.email);
                setBudget(profile.data.budget);
                setIsLoading(false);
            }).catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
        }
        catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        
        try {

            const apiUrl = `api/userprofile`;
            const body = {
                user: {
                    username: username,
                    email: email,
                },
                budget: budget,
            };

            await axios.put(apiUrl, body).then((response) => {
                setSuccess(response.data.message);
            }).catch((err) => {
                setError(err.message);
            });
        } catch (err) {
            setError(err.message);
        }
    }

    if(isLoading) {
        return (
            <div className='userprofile-form container-md'>
                <h1>Your Profile</h1>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className="userprofile-form container-md">
            <h1>Your Profile</h1>
            <Form onSubmit={updateProfile}>
                <Stack gap={2} className="col-md-5 mx-auto">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        disabled
                    />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Budget</Form.Label>
                    <Form.Control
                        type="number"
                        value={budget}
                        onChange={(event) => setBudget(event.target.value)}
                        required
                    />
                    </Form.Group>
                    <Button type="submit">Update profile</Button>
                </Stack>
            </Form>
        </div>
    );
}

export default UserProfile;
