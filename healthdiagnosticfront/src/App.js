import React, { useState, useEffect } from 'react';
import './App.css';
import './TextInput';

function App() {
  const [message, setMessage] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessage(data.result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserInput(''); // Clear the search bar
    try {
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessage(data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-text">
        <h1>Health Diagnostic tool</h1>
        <form onSubmit={handleSubmit}>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Name"
              name="name"
              id="name"
              required value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <label htmlFor="name" className="form__label">
              Symptoms
            </label>
          </div>
        </form>
        {message && <p>Response: {message}</p>}
      </header>
    </div>
  );
}

export default App;