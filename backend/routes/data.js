const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all rows
router.get('/get_data', (req, res) => {
  db.all('SELECT * FROM my_table', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST new row
router.post('/post_data', (req, res) => {
  const { name, age } = req.body;
  db.run('INSERT INTO my_table (name, age) VALUES (?, ?)', [name, age], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

module.exports = router;
