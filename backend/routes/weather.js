// weather.js
const express = require('express');

const router = express.Router();

const OPENWEATHER_API_KEY = '60cd9b531907df255eb7d9c301e56806';
const CITY = 'San Francisco'; // You can make this configurable
let cachedWeather = null;
let lastFetched = 0;

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
