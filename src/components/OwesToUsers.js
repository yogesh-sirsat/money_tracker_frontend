import React from "react"
import Container from "react-bootstrap/Container";
import UserOweAmountList from "./UserOweAmountList";

const OwesToUsers = () => {
  return (
    <Container>
      <h1 className="mb-4">Users who you owe</h1>
      <UserOweAmountList endpoint={'owes_to_users'}/>
    </Container>
  );
}

export default OwesToUsers;