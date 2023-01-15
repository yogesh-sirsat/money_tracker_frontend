import React, {useEffect, useState} from "react"
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card'
import Col from "react-bootstrap/Col";

const UserOweAmountList = (props) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const token = localStorage.getItem('auth_token');
      const config = {
        headers: {
          Authorization: `token ${token}`
        }
      }
      axios.get(`api/${props.endpoint}`, config).then(
        response => {
          setUsers(response.data)
        }).catch(error => {
        setError(error)
      });
    } catch (error) {
      setError(error)
    }
  }, [props.endpoint]);

  if(users === null || users.length === 0) {
    return (
      <Container>
        <h1>No users to display.</h1>
      </Container>
    );
  }

  return (
    <div className="row">
      {error && <p>{error.message}</p>}
      {users.map((user) => (
        <Col key={user.id} xs={12} md={6} lg={3} className="mb-4">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Subtitle className="text-muted"><cite>{user.amount_owed}</cite></Card.Subtitle>
          </Card.Body>
        </Card>
        </Col>
      ))}
    </div>
  );
}

export default UserOweAmountList;