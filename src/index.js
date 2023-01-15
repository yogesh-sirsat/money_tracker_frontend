import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import AuthCheck from './components/AuthCheck';
import Authenticate from "./components/Authenticate";
import CreateTransaction from "./components/CreateTransaction";
import Friends from './components/Friends';
import NavBar from "./components/NavBar";
import OwedUsers from "./components/OwedUsers";
import OwesToUsers from "./components/OwesToUsers";
import Register from "./components/Register";
import UpdateTransaction from "./components/UpdateTransaction";
import UserProfile from "./components/UserProfile";
import AllTransactions from "./components/AllTransactions";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/" element={<AuthCheck> <App /> </AuthCheck>} />
        <Route path="/userprofile" element={<AuthCheck> <UserProfile /> </AuthCheck>} />
        <Route path="/friends" element={<AuthCheck> <Friends /> </AuthCheck>} />
        <Route path="/create_transaction" element={<AuthCheck> <CreateTransaction /> </AuthCheck>} />
        <Route path="/update_transaction/:id" element={<AuthCheck> <UpdateTransaction /> </AuthCheck>} />
        <Route path="/alltransactions" element={<AuthCheck> <AllTransactions /> </AuthCheck>} />
        <Route path="/owed_users" element={<AuthCheck> <OwedUsers /> </AuthCheck>}/>
        <Route path="/owes_to_users" element={<AuthCheck> <OwesToUsers /> </AuthCheck>}/>
      </Routes>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
