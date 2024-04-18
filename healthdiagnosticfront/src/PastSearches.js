import React, { useEffect, useState } from 'react';
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




const PastSearches = () => {
  // retrieves past searches from database
  const [searches, setSearches] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbData = await fetch('http://localhost:5000/dataSend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userID: 'PLACEHOLDER' }) // make this a variable based on userID
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
        <h1>{searches.length > 0 ? searches[0].userID + "'s past searches" : "No past searches"}</h1>
        {searches.map((search, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <strong>UserID:</strong> {search.userID}, 
            <strong> Age:</strong> {search.age}, 
            <strong> Race:</strong> {search.race}, 
            <strong> Sex:</strong> {search.sex}, 
            <strong> Height:</strong> {search.height}, 
            <strong> Weight:</strong> {search.weight}, 
            <strong> Symptoms:</strong> {search.symptoms}, 
            <strong> Current Medications:</strong> {search.currentMedications}
          </div>
        ))}
      </header>
    </div>
  );
};

export default PastSearches;