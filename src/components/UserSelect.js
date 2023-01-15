import React, {useCallback, useEffect, useState} from 'react';
import axios from "../api/axios";
import Select from 'react-select';
import Form from "react-bootstrap/Form";


const UserSelect = (props) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback( async () => {
    try {
        const { data } = (await axios.get('api/users'));
        if(data && Array.isArray(data)){
          setUsers(data.map((user) => {
            return { value: user.id, label: user.username }
          }));
        }else{
          props.setError(`Unexpected user response data`);
        }
    } catch (err) {
        props.setError(err.message);
    }
  },[props]);

  useEffect(() => {
    fetchUsers().then(r => r);
  }, [fetchUsers]);

  return (
    <Form.Group controlId="user_select">
      <Form.Group className="mb-3" controlId="paid_users">
        <Form.Label >Payer</Form.Label>
        <Select options={users} placeholder={"Select payer"} onChange={props.onPaidUserChange}  value={props.selectedPaidUser} isClearable={true}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="owed_users">
        <Form.Label>Owed Users</Form.Label>
        <Select options={users} placeholder={"Select who owe"} isMulti={true} onChange={props.onOwedUsersChange} value={props.selectedOwedUsers}/>
      </Form.Group>
    </Form.Group>
  );
}

export default UserSelect;
