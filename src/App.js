import React, {useEffect, useState} from "react";
import "./App.css";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
import axios from "./api/axios";


function App() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(0);
  const [spending, setSpending] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `api/budget_spending`;
        const response = await axios.get(apiUrl);
        setBudget(response.data.budget);
        setSpending(response.data.spending ? response.data.spending : 0);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData().then(r => r);
  }, []);

  return (
    <Container className="App">
      {error && <Alert variant="danger">{error}</Alert>}
      <Card bg={"success"} className="mb-4">
        <Card.Body>
          <Card.Title>Your total budget and spending's based on all transactions you paid</Card.Title>
          <Card.Text>
            You have a total budget of <b>{budget}</b> and you have spent <b>{spending}</b> so far.
          </Card.Text>
          <Button variant="outline-dark" onClick={() => navigate("/userprofile")}>Update Budget Here</Button>
        </Card.Body>
      </Card>
      <Row className="d-flex justify-content-around">
        <Col className="mb-4" xs={12} md={6} lg={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Create A New Transaction</Card.Title>
              <Card.Text>
                <small>
                  Click below button to create a new transaction
                </small>
              </Card.Text>
              <Button className="align-text-bottom" variant="outline-dark"
                      onClick={() => navigate("/create_transaction")}>CREATE</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4" xs={12} md={6} lg={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>View All Transactions</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>
                <small>
                  Click below button to view all transactions, you can also update or delete transactions from there
                </small>
              </Card.Text>
              <footer>
                <Button variant="outline-dark" onClick={() => navigate("/alltransactions")}>VIEW</Button>
              </footer>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4" xs={12} md={6} lg={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Your Profile</Card.Title>
              <Card.Text>
                <small>
                  Click below button to view or update your profile
                </small>
              </Card.Text>
              <Button className="align-text-bottom" variant="outline-dark"
                      onClick={() => navigate("/userprofile")}>VIEW</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex justify-content-around">
        <Col className="mb-4" xs={12} md={6} lg={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>View Owed Users</Card.Title>
              <Card.Text>
                <small>
                  Click below button to view users who owe you
                </small>
              </Card.Text>
              <Button className="align-text-bottom" variant="outline-dark"
                      onClick={() => navigate("/owed_users")}>VIEW</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4" xs={12} md={6} lg={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>View Owed To Users</Card.Title>
              <Card.Text>
                <small>
                  Click below button to view all users who you owe
                </small>
              </Card.Text>
              <footer>
                <Button variant="outline-dark" onClick={() => navigate("/owes_to_users")}>VIEW</Button>
              </footer>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4" xs={12} md={6} lg={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>View Your Friends</Card.Title>
              <Card.Text>
                <small>
                  Click below button to view all of your friends
                </small>
              </Card.Text>
              <footer>
                <Button variant="outline-dark" onClick={() => navigate("/friends")}>VIEW</Button>
              </footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
