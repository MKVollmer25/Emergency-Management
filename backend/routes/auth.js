const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

const router = express.Router();
const JWT_SECRET = 'your_secret_key_here';  // Use env variable in production

// Register User
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log("Registration post detected")
  console.log("Username: " + username)
  console.log("Password: " + password)
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function (err) {
      if (err) {
        return res.status(400).json({ error: 'User already exists or DB error' });
      }
      res.json({ message: 'User registered successfully' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login User
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("Login post detected")
  console.log("Username: " + username)
  console.log("Password: " + password)

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err || !user) {
      console.log("Username does not exist")
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    console.log(user.username)
    console.log(user.password)
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log("Invalid password")
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Example Protected Route
router.get('/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ message: 'Protected profile data', user });
  });
});

module.exports = router;
