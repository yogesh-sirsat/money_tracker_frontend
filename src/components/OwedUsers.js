import React from "react"
import Container from "react-bootstrap/Container";
import UserOweAmountList from "./UserOweAmountList";


const OwedUsers = () => {
  return (
    <Container>
      <h1>Users who owes you</h1>
      <UserOweAmountList endpoint="owed_users"/>
    </Container>
  );
}

export default OwedUsers;
