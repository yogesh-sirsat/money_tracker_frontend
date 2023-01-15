import React, {useState} from "react";
import axios from "../api/axios";
import {Alert, Form, Button, Stack, FormGroup} from 'react-bootstrap';
import CategorySelect from './CategorySelect';
import UserSelect from "./UserSelect";


const TransactionForm = ({ initTransaction }) => {
  const [transactionData, setTransactionData] = useState({
    description: initTransaction.description,
    amount: initTransaction.amount,
    category: initTransaction.category,
    payer: initTransaction.payer,
    owed_users: initTransaction.owed_users,
    payer_owes_split: initTransaction.payer_owes_split,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    if (transactionData.description === '') {
      setError('Description is required');
      return false;
    }
    if (!transactionData.amount || isNaN(transactionData.amount)) {
      setError('Amount is required and must be a number');
      return false;
    }
    if (!transactionData.category) {
      setError('Category is required');
      return false;
    }
    if (!transactionData.payer) {
      setError('Payer is required');
      return false;
    }
    return true;
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(transactionData);
    setError('');

    if (!validate()) return;
    try {
      const owed_users = transactionData.owed_users.map(user => user.value);
      const body = {
        description: transactionData.description,
        amount: transactionData.amount,
        category: transactionData.category.value,
        payer: transactionData.payer.value,
        owed_users: owed_users,
        payer_owes_split: transactionData.payer_owes_split,
      };
      console.log(body);
      let response;
      if(initTransaction.id) {
        const apiUrl = `api/transaction/${initTransaction.id}`;
        response = await axios.put(apiUrl, body);
      }
      else{
        const apiUrl = `api/create_transaction`;
        response = await axios.post(apiUrl, body);

        setTransactionData({
          ...initTransaction
        });
      }
      setSuccess(response.data.message);
      setTimeout(() => {
        setSuccess('');
      }, 3000)


    } catch (error) {
        if(error.response.status === 400 && error.response.data.non_field_errors){
          setError(error.response.data.non_field_errors[0]);
        }
        else if(error.response.data.message) {
          setError(error.response.data.message);
        }
        else{
          setError(error.message);
        }
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
        <Stack gap={2} className="col-md-5 mx-auto">
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}
          {success && <Alert variant="success" className="text-center">{success}</Alert>}
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter description" value={transactionData.description}
                          onChange={(e) => setTransactionData({...transactionData, description: e.target.value})}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" placeholder="Enter amount" value={transactionData.amount}
                          onChange={(e) => setTransactionData({...transactionData, amount: e.target.value})}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <CategorySelect setError={setError} selectedCategory={transactionData.category}
                            onChange={(e) => setTransactionData({...transactionData, category: e})}/>
          </Form.Group>
          <UserSelect setError={setError} selectedPaidUser={transactionData.payer}
                      selectedOwedUsers={transactionData.owed_users}
                      onPaidUserChange={(e) => setTransactionData({...transactionData, payer: e})}
                      onOwedUsersChange={(e) => setTransactionData({...transactionData, owed_users: e})}/>
          <FormGroup className="mb-3" controlId="payer_owes_slit">
            <Form.Check type="checkbox" label="Payer owes split" checked={transactionData.payer_owes_split}
                        onChange={(e) => setTransactionData({...transactionData, payer_owes_split: e.target.checked})}/>
          </FormGroup>
          <Button variant="primary" type="submit">
            Submit Transaction
          </Button>
        </Stack>
      </Form>
  );
}

export default TransactionForm;
