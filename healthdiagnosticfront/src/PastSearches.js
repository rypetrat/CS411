import React from 'react';
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



const PastSearches = () => {
  return (
    <div className="App">
      <Navbar />
      <header className="App-text">
        <h1>User_X past searches</h1>
        <p>display stored pasted searches and display here</p>
      </header>
    </div>
  );
};

export default PastSearches;