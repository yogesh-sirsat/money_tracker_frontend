import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthCheck = ({ children }) => {

  const token = localStorage.getItem('auth_token');

  if (token) {
      return children
  } else {
      return <Navigate to="/authenticate" />;
  }
};


export default AuthCheck;
