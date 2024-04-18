import React, { useEffect, useState } from 'react';
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



const UserCenter = () => {
  // directs routing for button presses
  const navigate = useNavigate();
  const handleClick1 = () => {
    navigate('/search');
  };
  const handleClick2 = () => {
    navigate('/pastSearch');
  };



  // retrieves data from database
  const [searches, setSearches] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbData = await fetch('http://localhost:5000/dataSend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userID: 'Ryan' }) // make this variable based on userID
        });
        if (!dbData.ok) {
          throw new Error('Network response was not ok');
        }
        const response = await dbData.json();
        setSearches(response); 
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []); 


  // page display
  return (
    <div className="App">
      <Navbar />
      <header className="App-text">
        <h1>HDT User Center</h1>
        <p><strong style={{ color: 'white' }}>{searches.length > 0 ? "Welcome " + searches[0].userID : "Guest"}</strong></p>
        <div class="btn-group">
          <button class="button" onClick={handleClick1}>Go to Search</button>
          <button class="button" onClick={handleClick2}>Go to past searches</button>
        </div>
      </header>
    </div>
  );
};

export default UserCenter;