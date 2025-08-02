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

router.get('/get_alerts', (req, res) => {
  db.all("SELECT * FROM alerts", [], (err, rows) => {
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

router.get('/get_user_reports/:phone', (req, res) => {
  const { phone } = req.params
  console.log(phone)
  db.all("SELECT * FROM reports WHERE phone = ?", [phone], (err, rows) => {
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

router.post('/update_data', (req, res) => {
  const { newStatus, id } = req.body;
  console.log("ID: " + id)
  console.log("Status: " + newStatus)
  db.run(
    `UPDATE reports
    SET status = ?
    WHERE id = ?`,
    [newStatus, id],
    function (err) {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
});

router.post('/delete_data', (req, res) => {
  const { id } = req.body;
  console.log("ID: " + id)
  db.run(
    `DELETE FROM reports
    WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
});

router.post('/delete_alert', (req, res) => {
  const { id } = req.body;
  console.log("ID: " + id)
  db.run(
    `DELETE FROM alerts
    WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
});

// POST new row
router.post('/post_data', (req, res) => {
  const { name, phone, category, severity, location, zipcode, latitude, longitude, date, description, status } = req.body;
  console.log("Name: " + name)
  console.log("Phone: " + phone)
  console.log("Category: " + category)
  console.log("Severity: " + severity)
  console.log("Location: " + location)
  console.log("Zipcode: " + zipcode)
  console.log("Latitude: " + latitude)
  console.log("Longitude: " + longitude)
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
      zipcode,
      latitude,
      longitude,
      date,
      description,
      status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, phone, category, severity, location, zipcode, latitude, longitude, date, description, status],
    function (err) {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
});

router.post('/new_alert', (req, res) => {
  const { severity, headline, description } = req.body;
  console.log("Severity: " + severity)
  console.log("Headline: " + headline)
  console.log("Description: " + description)
  db.run(
    `INSERT INTO alerts (
      severity,
      headline,
      description)
    VALUES (?, ?, ?)`,
    [severity, headline, description],
    function (err) {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
});

module.exports = router;
