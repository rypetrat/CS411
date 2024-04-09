import React, { useState, useEffect } from 'react';
import './App.css';
import './TextInput.css';

function App() {
  const [message, setMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessage(data.result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
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
              placeholder="Symptoms"
              name="symptoms"
              id="symptoms"
              required
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <label htmlFor="symptoms" className="form__label">
              Symptoms
            </label>
          </div>
        </form>
        {loading && <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e596a334-ec86-4a84-96df-17900077efc2/d7gwtxy-a0648d53-d900-425d-85e4-96fdeb5e7968.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9lNTk2YTMzNC1lYzg2LTRhODQtOTZkZi0xNzkwMDA3N2VmYzIvZDdnd3R4eS1hMDY0OGQ1My1kOTAwLTQyNWQtODVlNC05NmZkZWI1ZTc5NjguZ2lmIn1dXX0.EUXeqrmX0WznMmIeDsU2e2oViUjumxXkYxFrK3A1OOY" alt="Loading..." className="loading" />} 
        {message && !loading && <p>Response: {message}</p>}
      </header>
    </div>
  );
}

export default App;