import React, {useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import TransactionForm from './TransactionForm';
import axios from '../api/axios';

const UpdateTransaction = (props) => {
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactionData, setTransactionData] = useState({
    id: '',
    description: '',
    amount: '',
    category: [],
    payer: [],
    owed_users: [],
    payer_owes_split: false,
  });

  useEffect(() => {
    setIsLoading(true);
    setError('');
    try {
      const apiUrl = `/api/transaction/${id}`;
      axios.get(apiUrl).then((transaction) => {
          setTransactionData({
            id: transaction.data.id,
            description: transaction.data.description,
            amount: transaction.data.amount,
            category: {value: transaction.data.category.id, label: transaction.data.category.name},
            payer: {value: transaction.data.payer.id, label: transaction.data.payer.username},
            owed_users: transaction.data.owed_users.map((user) => {
              return {value: user.id, label: user.username}
            }),
            payer_owes_split: transaction.data.payer_owes_split,
          });
          setIsLoading(false);
        }
      ).catch((error) => {
        setIsLoading(false);
        setError(error.response.data.detail);
      });
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }, [id]);

  if(isLoading || error){
    return (
      <Container>
        <h1>Update Transaction</h1>
        {isLoading &&  <h2>Loading...</h2>}
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
    )
  }

  return (
    <Container className="update_transaction">
      <h1>Update Transaction</h1>
      <TransactionForm initTransaction={transactionData}  />
    </Container>
  );
}

export default UpdateTransaction;