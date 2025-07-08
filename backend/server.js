const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello from Node.js Backend!');
});

// Example API Route
app.get('/api/data', (req, res) => {
  res.json({ message: 'Here is your data.', data: [1, 2, 3] });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
