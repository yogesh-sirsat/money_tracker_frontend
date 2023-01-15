import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const TransactionsList = (props) => {
  const transactions = props.transactions;
  const navigate = useNavigate();

  if(transactions === null || transactions.length === 0) { return (<h2>No transactions to display!</h2>);}
  return (
    <Row className="transaction_cards">
      {props.transactions.map((transaction) => {
        return (
          <Col key={transaction.id} xs={12} md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{transaction.amount}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{transaction.category.name}</Card.Subtitle>
                <Card.Text>
                  {transaction.description}
                </Card.Text>
                <footer className="mb-2">
                  <small>Payer: {transaction.payer.username}</small>
                  <br/>
                  <small>Created by: {transaction.created_by.username}</small>
                  <br/>
                  <small>{transaction.date}</small>
                </footer>
                <Button variant="outline-dark" size="sm" onClick={() => navigate(`/update_transaction/${transaction.id}`)}>Update</Button>{' '}
                <Button variant="outline-danger" size="sm" onClick={() => props.onDelete(transaction.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default TransactionsList;