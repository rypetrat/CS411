import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const UserCenter = () => {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/search');
  };

  const handleClick2 = () => {
    navigate('/pastSearch');
  };

  return (
    <div className="App">
      <header className="App-text">
        <h1>HDT User Center</h1>
        <p>Welcome user_X!</p>
        <button class="button1" onClick={handleClick1} ><span>Go to Search </span></button>
        <button class="button1" onClick={handleClick2} ><span>Go to past searches </span></button>
      </header>
    </div>
  );
};

export default UserCenter;