const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Enable CORS for all requests
app.use(cors());

const PORT = 5000;

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Health Diagonstic Tool backend server!');
});

// test route
app.get('/api/test', (req, res) => {
  res.json({ text: 'hello frontend!' });
});

// openAI chatGPT4 API route
app.get('/api/data', async (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '624673b5b3mshd8d8edb53803e49p1a2ac4jsnd52e961782d0',
      'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: 'what are the colors of the american flag?'
        }
      ],
      system_prompt: '',
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false
    }};
  
  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      res.status(500).json({ error: 'Request timed out' });
    } 
      else {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});