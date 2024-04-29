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
  // gets the currently signed in user name
  const user = localStorage.getItem('profileName');

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
          body: JSON.stringify({ userID: user }) // make this a variable based on userID
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
  }, [user]); 



  // page display
  return (
    <div className="App">
      <Navbar />
      <header className="App-text">
        <h1>{searches.length > 0 ? searches[0].userID + "'s Past Searches" : "No Past Searches"}</h1>
        {searches.map((search, index) => (
          <div key={index} style={{ marginBottom: '50px' }}> 
            <strong style={{ color: 'white' }}>{index+1}.</strong>
            <strong style={{ color: 'white' }}> Age:</strong> {search.age ? search.age : "N/A"}
            <strong style={{ color: 'white' }}> Height:</strong> {search.height ? search.height : "N/A"}
            <strong style={{ color: 'white' }}> Weight:</strong> {search.weight ? search.weight : "N/A"}
            <strong style={{ color: 'white' }}> Symptoms:</strong> {search.symptoms ? search.symptoms : "N/A"}
            <strong style={{ color: 'white' }}> Current Medications:</strong> {search.currentMedications ? search.currentMedications : "N/A"}
            <strong style={{ color: 'white' }}> Diagnosis:</strong> {search.diagnoses ? search.diagnoses : "N/A"}
            <strong style={{ color: 'white' }}> Treatment Plan:</strong> {search.treatment ? search.treatment : "N/A"}
            <strong style={{ color: 'white' }}> Date:</strong> {search.timestamp ? search.timestamp : "N/A"}
          </div>
        ))}
      </header>
    </div>
  );
};

export default PastSearches;