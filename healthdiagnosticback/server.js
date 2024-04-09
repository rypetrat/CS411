const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser'); // Add this line for parsing JSON

require('dotenv').config();

const app = express();

// Enable CORS for all requests
app.use(cors());
app.use(bodyParser.json()); // Use bodyParser for parsing JSON

const PORT = 5000;

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Health Diagnostic Tool backend server!');
});

// test route
app.get('/api/test', (req, res) => {
  res.json({ text: 'hello frontend!' });
});

// openAI chatGPT4 API route
app.post('/api/data', async (req, res) => {
  const { text } = req.body; // Get the text from the request body
  const API_KEY = process.env.API_KEY; // Get the API key from env file
  const options = {
    method: 'POST',
    url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: text // Use the user's input text
        }
      ],
      system_prompt: '',
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      res.status(500).json({ error: 'Request timed out' });
    } else {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});