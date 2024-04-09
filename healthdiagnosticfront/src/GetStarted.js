import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const GetStarted = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="App">
      <header className="App-text">
        <h1>Welcome to the Health Diagnostic Tool!</h1>
        <p>This is a web app that anyone can help diagnose any illness based on symptoms and basic health information</p>
        <button class="button1" onClick={handleClick} ><span>Get Started</span></button>
      </header>
    </div>
  );
};

export default GetStarted;