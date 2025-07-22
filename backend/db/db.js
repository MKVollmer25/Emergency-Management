const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    db.all('PRAGMA table_info(users);', [], (err, rows) => {
      if (err) {
        console.error('❌ Failed to get table info:', err.message);
      } else {
        console.log('📋 Users table columns:');
        rows.forEach((col) => {
          console.log(`- ${col.name} (${col.type})${col.pk ? ' [PK]' : ''}`);
        });
      }
    });
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('❌ Failed to create table:', err.message);
    } else {
      console.log('✅ Users table ready.');
    }
  });
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone VARCHAR(15) NOT NULL,
      category TEXT NOT NULL,
      severity INT NOT NULL,
      location TEXT NOT NULL,
      date DATETIME NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('❌ Failed to create table:', err.message);
    } else {
      console.log('✅ Reports table ready.');
    }
  });
});

module.exports = db;
