import React, {useEffect, useState} from "react"
import axios from "../api/axios";
import TransactionsList from "./TransactionsList";
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import CategorySelect from "./CategorySelect";

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState(transactionsData);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const apiUrl = `api/transactions`;
    axios.get(apiUrl).then((transactions) => {
      setTransactionsData(transactions.data);
      setFilteredTransactions(transactions.data);
    });
  }, [setTransactionsData]);

  const onDeleteHandler = async (transactionId) => {
    setError('');
    try {
      await axios.delete(`api/transaction/${transactionId}`);
      setSuccess('Transaction deleted successfully!');
      setTimeout(() => {
        setSuccess('');
      }, 3000);

      const index = transactionsData.findIndex((transaction) => transaction.id === transactionId);
      transactionsData.splice(index, 1);
      setTransactionsData([...transactionsData]);
      const filteredIndex = filteredTransactions.findIndex((transaction) => transaction.id === transactionId);
      filteredTransactions.splice(filteredIndex, 1);
      setFilteredTransactions([...filteredTransactions]);
    } catch (err) {
      setError(err.message);
    }
  };


  const filterTransactionsData = (e) => {
    e.preventDefault()

    let filteredTransactions = transactionsData;
    if (selectedCategory) {
      filteredTransactions = filteredTransactions.filter((transaction) => selectedCategory.value === transaction.category.id);
    }
    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      const startDate = new Date(selectedDateRange.startDate);
      const endDate = new Date(selectedDateRange.endDate);
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }
    else if(selectedDateRange.startDate) {
      const startDate = new Date(selectedDateRange.startDate);
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate;
      });
    }
    else if(selectedDateRange.endDate) {
      const endDate = new Date(selectedDateRange.endDate);
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate <= endDate;
      });
    }
    setFilteredTransactions(filteredTransactions);
  };

  return (
    <Container className="all_transactions">
      <h1>Your transactions history</h1>
      {error && <Alert variant='danger'>{error}</Alert>}
      {success && <Alert variant='success'>{success}</Alert>}
      <div className="transactions_filter_form mb-4">
        <Form onSubmit={filterTransactionsData}>
          <Row className="align-items-center gap-1">
            <Col sm={3} className="filter-start-date">
              <FloatingLabel
                label="Select start date"
              >
                <Form.Control type="date" placeholder="Select start date"
                              onChange={(e) => setSelectedDateRange({...selectedDateRange, startDate: e.target.value})}/>
              </FloatingLabel>
            </Col>
            <Col sm={3} className="filter-end-date">
              <FloatingLabel
                label="Select end date"
              >
                <Form.Control type="date" placeholder="Select end date"
                              onChange={(e) => setSelectedDateRange({...selectedDateRange, endDate: e.target.value})}/>
              </FloatingLabel>
            </Col>
            <Col sm={5} className="filter-category">
              <Form.Label visuallyHidden>
                Category
              </Form.Label>
              <CategorySelect onChange={(e) => setSelectedCategory(e)} value={selectedCategory}/>
            </Col>
            <Col xs="auto" className="my-1">
              <Button type="submit">Filter</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <TransactionsList transactions={filteredTransactions} onDelete={onDeleteHandler}/>
    </Container>
  );
}

export default Transactions;

