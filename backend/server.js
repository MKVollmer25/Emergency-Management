const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Mount Authentication Routes
app.use('/api', authRoutes);

const db = require('./db/db')

const username = 'root';
const password = '$2b$10$DIUtPYDhJwDtMI0jSEFPJOijFsDudcXB8QrL9jRg11mEhqqyTfYF2';

db.run(
  `INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`,
  [username, password],
  function (err) {
    if (err) {
      console.error('Error adding root user:', err.message);
    } else {
      console.log('✅ Root user added successfully.');
    }
  }
);

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
