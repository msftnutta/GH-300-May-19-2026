import { Router } from 'express';
import axios from 'axios';
import { config } from '../config.js';

const router = Router();

// Top well-known cities with their coordinates
const MAJOR_CITIES = [
  { name: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lon: -74.006, emoji: '🗽' },
  { name: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lon: -0.1278, emoji: '🏰' },
  { name: 'Paris', country: 'France', countryCode: 'FR', lat: 48.8566, lon: 2.3522, emoji: '🗼' },
  { name: 'Tokyo', country: 'Japan', countryCode: 'JP', lat: 35.6762, lon: 139.6503, emoji: '🗾' },
  { name: 'Sydney', country: 'Australia', countryCode: 'AU', lat: -33.8688, lon: 151.2093, emoji: '🦘' },
  { name: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', lat: 25.2048, lon: 55.2708, emoji: '🏜️' },
  { name: 'Singapore', country: 'Singapore', countryCode: 'SG', lat: 1.3521, lon: 103.8198, emoji: '🦁' },
  { name: 'São Paulo', country: 'Brazil', countryCode: 'BR', lat: -23.5505, lon: -46.6333, emoji: '⚽' },
  { name: 'Moscow', country: 'Russia', countryCode: 'RU', lat: 55.7558, lon: 37.6173, emoji: '🏛️' },
  { name: 'Mumbai', country: 'India', countryCode: 'IN', lat: 19.076, lon: 72.8777, emoji: '🕌' },
  { name: 'Cairo', country: 'Egypt', countryCode: 'EG', lat: 30.0444, lon: 31.2357, emoji: '🐪' },
  { name: 'Mexico City', country: 'Mexico', countryCode: 'MX', lat: 19.4326, lon: -99.1332, emoji: '🌮' },
  { name: 'Toronto', country: 'Canada', countryCode: 'CA', lat: 43.6532, lon: -79.3832, emoji: '🍁' },
  { name: 'Berlin', country: 'Germany', countryCode: 'DE', lat: 52.52, lon: 13.405, emoji: '🍺' },
  { name: 'Seoul', country: 'South Korea', countryCode: 'KR', lat: 37.5665, lon: 126.978, emoji: '🏯' },
];

// Get user's location from IP
router.get('/api/location', async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || 
                     req.socket.remoteAddress || 
                     '8.8.8.8'; // fallback for local testing
    
    // Use ipapi for IP geolocation (free service)
    const response = await axios.get(`http://ip-api.com/json/${clientIp}`);
    
    if (response.data.status === 'success') {
      res.json({
        city: response.data.city,
        country: response.data.country,
        countryCode: response.data.countryCode,
        lat: response.data.lat,
        lon: response.data.lon,
        timezone: response.data.timezone,
      });
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (error) {
    console.error('Error fetching location:', error.message);
    res.status(500).json({ error: 'Failed to fetch location' });
  }
});

// Get weather for a location
router.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;
  
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude required' });
  }

  try {
    if (!config.azureMapsKey) {
      // Fallback to Open-Meteo (free, no API key required)
      const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
        params: {
          latitude: lat,
          longitude: lon,
          current: 'temperature_2m,weather_code',
          timezone: 'auto',
        },
      });

      const weatherCode = response.data.current.weather_code;
      const weatherEmoji = getWeatherEmoji(weatherCode);
      
      res.json({
        temperature: Math.round(response.data.current.temperature_2m),
        weatherCode,
        weatherEmoji,
        description: getWeatherDescription(weatherCode),
      });
    } else {
      // Use Azure Maps Weather API
      const response = await axios.get(
        `https://atlas.microsoft.com/weather/currentConditions/json`,
        {
          params: {
            'api-version': '1.0',
            'subscription-key': config.azureMapsKey,
            query: `${lat},${lon}`,
          },
        }
      );

      const current = response.data.results[0];
      res.json({
        temperature: Math.round(current.temperature.value),
        description: current.phrase,
        weatherEmoji: getWeatherEmojiFromPhrase(current.phrase),
      });
    }
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

// Get major cities
router.get('/api/cities', (_req, res) => {
  res.json(MAJOR_CITIES);
});

function getWeatherEmoji(code) {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 49) return '🌫️';
  if (code <= 69) return '🌧️';
  if (code <= 79) return '🌨️';
  if (code <= 82) return '🌧️';
  if (code <= 86) return '🌨️';
  if (code <= 99) return '⛈️';
  return '🌤️';
}

function getWeatherDescription(code) {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 49) return 'Foggy';
  if (code <= 69) return 'Rainy';
  if (code <= 79) return 'Snowy';
  if (code <= 82) return 'Rain showers';
  if (code <= 86) return 'Snow showers';
  if (code <= 99) return 'Thunderstorm';
  return 'Unknown';
}

function getWeatherEmojiFromPhrase(phrase) {
  const lower = phrase.toLowerCase();
  if (lower.includes('sun') || lower.includes('clear')) return '☀️';
  if (lower.includes('cloud')) return '⛅';
  if (lower.includes('rain')) return '🌧️';
  if (lower.includes('snow')) return '🌨️';
  if (lower.includes('thunder') || lower.includes('storm')) return '⛈️';
  if (lower.includes('fog') || lower.includes('mist')) return '🌫️';
  return '🌤️';
}

export default router;
