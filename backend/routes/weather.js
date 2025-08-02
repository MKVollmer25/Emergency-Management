// weather.js
const express = require('express');

require('dotenv').config();

const router = express.Router();

const OPENWEATHER_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const CITY = 'San Francisco'; // You can make this configurable
let cachedWeather = null;
let lastFetched = 0;

console.log(OPENWEATHER_API_KEY)

async function fetchWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`OpenWeatherMap error: ${response.statusText}`);

    const data = await response.json();
    cachedWeather = data;
    lastFetched = Date.now();
    console.log(`Weather updated at ${new Date(lastFetched).toLocaleTimeString()}`);
  } catch (error) {
    console.error('Weather fetch failed:', error.message);
  }
}

// Initial fetch
fetchWeather();
// Refresh every 2 minutes
setInterval(fetchWeather, 2 * 60 * 1000);

// Define the /api/weather route
router.get('/weather', (req, res) => {
  if (cachedWeather) {
    res.json({ lastFetched, data: cachedWeather });
  } else {
    res.status(503).json({ error: 'Weather data not yet available' });
  }
});

module.exports = router;
