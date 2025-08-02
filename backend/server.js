const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const weatherRoute = require('./routes/weather');

const app = express();

app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Mount Authentication Routes
app.use('/api', authRoutes);
app.use('/api', dataRoutes);
app.use('/api', weatherRoute);

const db = require('./db/db')

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
