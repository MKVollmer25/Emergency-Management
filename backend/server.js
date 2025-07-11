const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Mount Authentication Routes
app.use('/api', authRoutes);

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
