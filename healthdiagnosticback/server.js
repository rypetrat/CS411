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

// local route
app.get('/api/data', (req, res) => {
  res.json({ text: 'hello frontend!' });
});

// external cannlytics route
// app.get('/api/question', async (req, res) => {
//   try {
//     const response = await axios.get('put api address here', {
//       // 5 seconds should be fine right
//       timeout: 5000, 
//     });
//     res.json(response.data);
//   } catch (error) {
//     if (error.code === 'ECONNABORTED') {
//       res.status(500).json({ error: 'Request timed out' });
//     } else {
//       res.status(500).json({ error: 'Failed to fetch data' });
    
//   }}
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});