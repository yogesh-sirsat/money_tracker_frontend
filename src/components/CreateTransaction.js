import React from "react";
import {Container} from 'react-bootstrap';
import TransactionForm from './TransactionForm';


const CreateTransaction = () => {
  const initialTransactionState = {
    description: '',
    amount: '',
    category: [],
    payer: [],
    owed_users: [],
    payer_owes_slit: false,
  };

  return (
    <Container className="create-transaction">
      <h1>Create a new transaction</h1>
      <TransactionForm initTransaction={initialTransactionState} />
    </Container>

  );
};


export default CreateTransaction;
