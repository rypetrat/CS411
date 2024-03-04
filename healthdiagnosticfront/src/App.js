import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessage(data.text);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-text">
        <h1>Hey team welcome to the frontend of our Health Diagnostic tool!</h1>
        <p>Message from the backend server: {message}</p>
      </header>
    </div>
  );
}

export default App;