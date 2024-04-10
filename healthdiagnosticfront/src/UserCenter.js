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
      <Navbar />
      <header className="App-text">
        <h1>HDT User Center</h1>
        <p>Welcome user_X!</p>
        <div class="btn-group">
          <button class="button" onClick={handleClick1}>Go to Search</button>
          <button class="button" onClick={handleClick2}>Go to past searches</button>
        </div>
        {/* <button class="button1" onClick={handleClick1} ><span>Go to Search </span></button>
        <button class="button1" onClick={handleClick2} ><span>Go to past searches </span></button> */}
      </header>
    </div>
  );
};

export default UserCenter;