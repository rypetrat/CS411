import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';


function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="user">Home</a></li>
        <li><a href="pastSearch">Past Searches</a></li>
        <li><a href="search">Search</a></li>
        <li><a href="login">Login</a></li>
      </ul>
    </nav>
  );
}



const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/user');
  };

  return (
    <div className="App">
      <Navbar />
      <header className="App-text">
        <h1>Login</h1>
        <p>login stuff here</p>
        <button class="button1" onClick={handleClick} ><span>Go to User Center </span></button>
      </header>
    </div>
  );
};

export default Login;