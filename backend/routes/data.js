const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all rows
router.get('/get_data', (req, res) => {
  db.all("SELECT * FROM reports", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/get_flood_data', (req, res) => {
  db.all("SELECT * FROM reports WHERE category = 'Flood'", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/get_fire_data', (req, res) => {
  db.all("SELECT * FROM reports WHERE category = 'Fire'", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/get_water_data', (req, res) => {
  db.all("SELECT * FROM reports WHERE category = 'Water'", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/get_sewer_data', (req, res) => {
  db.all("SELECT * FROM reports WHERE category = 'Sewer'", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/get_electrical_data', (req, res) => {
  db.all("SELECT * FROM reports WHERE category = 'Electrical'", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/get_misc_data', (req, res) => {
  db.all("SELECT * FROM reports WHERE category = 'Miscellaneous'", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/category_data/:category_name', (req, res) => {
  const { category_name } = req.params
  console.log(category_name)
  db.all("SELECT * FROM reports WHERE category = ?", [category_name], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/get_report/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  db.all("SELECT * FROM reports WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST new row
router.post('/post_data', (req, res) => {
  const { name, phone, category, severity, location, date, description, status } = req.body;
  console.log("Name: " + name)
  console.log("Phone: " + phone)
  console.log("Category: " + category)
  console.log("Severity: " + severity)
  console.log("Location: " + location)
  console.log("Date: " + date)
  console.log("Description: " + description)
  console.log("Status: " + status)
  db.run(
    `INSERT INTO reports (
      name,
      phone,
      category,
      severity,
      location,
      date,
      description,
      status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, phone, category, severity, location, date, description, status],
    function (err) {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
});

module.exports = router;
