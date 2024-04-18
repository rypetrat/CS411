import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';



// defines the navBar and each destinations route
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



const GetStarted = () => {
  // directs routing for button press
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };



  // page display
  return (
    <div className="App">
      <Navbar />
      <header className="App-text">
        <h1>Welcome to the Health Diagnostic Tool!</h1>
        <p>This is a web app that anyone can help diagnose any illness based on symptoms and basic health information</p>
        <button class="button1" onClick={handleClick} ><span>Get Started</span></button>
      </header>
    </div>
  );
};

export default GetStarted;