import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/user');
  };

  return (
    <div className="App">
      <header className="App-text">
        <h1>Login</h1>
        <p>login stuff here</p>
        <button class="button1" onClick={handleClick} ><span>Go to User Center </span></button>
      </header>
    </div>
  );
};

export default Login;