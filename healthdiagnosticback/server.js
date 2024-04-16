const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const { MongoClient } = require('mongodb');



require('dotenv').config(); // allows for the reading of the .env file
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Use bodyParser for parsing JSON



// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Health Diagnostic Tool backend server!');
});



// Define MongoDB connection strings
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);



// Route to collect the data from the JSON sent from the frontend
app.post('/dataCollect', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db('user').collection('user_data');
    await collection.insertOne(req.body);
    res.status(200).send({ message: 'Data inserted into MongoDB' });
  } catch (e) {
    console.error('Error connecting to MongoDB:', e);
    res.status(500).send({ error: 'Error connecting to MongoDB' });
  } finally {
    await client.close();
  }
});



// External symptom checker API route
app.post('/api/get-diagnoses', async (req, res) => {
  const { text } = req.body; // Get the entire data string from the request body
  const { symptom } = req.body; // Get the symptom data from the request body
  const API_KEY1 = process.env.API_KEY1; // Get the API key from env file
  
  const options = {
    method: 'POST',
    url: 'https://symptom-checker4.p.rapidapi.com/analyze',
    params: {
      symptoms: symptom
    },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': API_KEY1,
      'X-RapidAPI-Host': 'symptom-checker4.p.rapidapi.com'
    },
    data: {
      symptoms: text
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});



// External chatGPT API route
app.post('/api/get-treatment', async (req, res) => {
  const { text } = req.body; // Get the text from the request body
  const API_KEY = process.env.API_KEY; // Get the API key from env file
  const API_KEY1 = process.env.API_KEY1; // Get the other API key from env file
  const options = {
    method: 'POST',
    url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': API_KEY1,
      'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: text
        }
      ],
      system_prompt: '', temperature: 0.9, top_k: 5, top_p: 0.9, max_tokens: 256, web_access: false
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
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});