import React, { useEffect, useState } from "react"
import axios from "../api/axios";
import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const Friends = () => {
  const [friendsData, setFriendsData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    try {
      const apiUrl = `api/friends`;
      axios.get(apiUrl).then((friends) => {
        setFriendsData(friends.data);
      });

    } catch (error) {
      setError(error);
    }

  }, [setFriendsData]);

  return (
    <Container className="friends_list">
      {error && <p>{error.message}</p>}
      <h1>Your MT friends</h1>
      <div className="row">
        {friendsData.map((friend) => (
          <Col key={friend.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                Username: <b>{friend.username}</b>
                <br/>
                Email: <b>{friend.email}</b>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </Container>
  );
}

export default Friends;