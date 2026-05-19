import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>World Map - Hello App</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        crossorigin="anonymous" />
  <style>
    body {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      min-height: 100vh;
      padding: 20px;
      color: white;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .map-container {
      background: white;
      border-radius: 15px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      position: relative;
    }
    #worldMap {
      width: 100%;
      height: auto;
      max-height: 600px;
    }
    .map-wrapper {
      position: relative;
      display: inline-block;
      width: 100%;
    }
    .city-marker {
      position: absolute;
      width: 12px;
      height: 12px;
      background: #e74c3c;
      border: 2px solid white;
      border-radius: 50%;
      cursor: pointer;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
      z-index: 10;
    }
    .city-marker:hover {
      width: 18px;
      height: 18px;
      background: #c0392b;
      box-shadow: 0 0 15px rgba(231, 76, 60, 0.8);
    }
    .user-marker {
      position: absolute;
      width: 20px;
      height: 20px;
      background: #2ecc71;
      border: 3px solid white;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: pulse 2s infinite;
      z-index: 20;
      box-shadow: 0 0 20px rgba(46, 204, 113, 0.8);
    }
    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.2); }
    }
    .callout {
      position: absolute;
      background: rgba(44, 62, 80, 0.95);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.3);
      min-width: 250px;
      z-index: 1000;
      pointer-events: none;
      font-size: 14px;
    }
    .callout::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid rgba(44, 62, 80, 0.95);
    }
    .callout-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 16px;
    }
    .flag {
      font-size: 24px;
    }
    .weather-info {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 8px;
      font-size: 18px;
    }
    .loading {
      text-align: center;
      padding: 20px;
      color: #7f8c8d;
    }
    svg path {
      fill: #3498db;
      stroke: #2c3e50;
      stroke-width: 0.5;
      transition: fill 0.3s ease;
    }
    svg path:hover {
      fill: #5dade2;
    }
  </style>
</head>
<body>
  <div class="container-fluid">
    <div class="header">
      <h1 class="display-4">🌍 World Map</h1>
      <p class="lead">Explore weather and time around the globe</p>
    </div>
    
    <div class="map-container">
      <div class="map-wrapper" id="mapWrapper">
        <svg id="worldMap" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
          <!-- Simplified world map SVG -->
          <rect width="1000" height="500" fill="#e8f4f8"/>
          
          <!-- Continents (simplified shapes) -->
          <!-- North America -->
          <path d="M 150 100 L 180 80 L 220 85 L 250 75 L 280 90 L 290 110 L 300 140 L 280 180 L 260 200 L 240 220 L 220 240 L 200 250 L 180 240 L 160 220 L 140 200 L 130 170 L 135 140 Z"/>
          
          <!-- South America -->
          <path d="M 240 260 L 260 265 L 275 280 L 280 310 L 275 350 L 265 380 L 250 400 L 235 410 L 220 400 L 215 380 L 220 350 L 225 320 L 230 290 Z"/>
          
          <!-- Europe -->
          <path d="M 480 100 L 510 95 L 540 100 L 555 110 L 560 130 L 550 145 L 530 150 L 510 145 L 490 135 L 475 120 Z"/>
          
          <!-- Africa -->
          <path d="M 490 160 L 520 165 L 545 175 L 560 200 L 565 240 L 560 280 L 545 320 L 525 345 L 505 355 L 485 350 L 470 330 L 465 300 L 470 260 L 480 220 L 485 185 Z"/>
          
          <!-- Asia -->
          <path d="M 570 90 L 620 85 L 680 95 L 730 105 L 770 120 L 800 140 L 815 165 L 820 190 L 810 210 L 790 220 L 760 225 L 730 220 L 700 210 L 670 195 L 640 180 L 610 165 L 585 145 L 570 120 Z"/>
          
          <!-- Australia -->
          <path d="M 780 320 L 820 325 L 850 335 L 865 355 L 860 375 L 840 385 L 810 385 L 785 375 L 770 355 L 775 335 Z"/>
          
          <!-- Antarctica -->
          <path d="M 100 470 L 900 470 L 880 450 L 800 445 L 700 448 L 600 450 L 500 448 L 400 450 L 300 448 L 200 450 L 120 450 Z"/>
        </svg>
        <div id="markers"></div>
      </div>
      <div class="loading" id="loading">Loading your location and weather data...</div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          crossorigin="anonymous"></script>
  <script>
    let userLocation = null;
    let cities = [];
    let activeCallout = null;

    // Country code to flag emoji conversion
    function getFlagEmoji(countryCode) {
      if (!countryCode) return '🏳️';
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
    }

    // Convert lat/lon to SVG coordinates
    function latLonToSVG(lat, lon) {
      const x = ((lon + 180) / 360) * 1000;
      const y = ((90 - lat) / 180) * 500;
      return { x, y };
    }

    // Format date and time
    function formatDateTime() {
      const now = new Date();
      return {
        date: now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
    }

    // Create callout
    function showCallout(x, y, data) {
      hideCallout();
      const dt = formatDateTime();
      
      const callout = document.createElement('div');
      callout.className = 'callout';
      callout.innerHTML = \`
        <div class="callout-header">
          <span class="flag">\${getFlagEmoji(data.countryCode)}</span>
          <div>
            <div>\${data.city}</div>
            <div style="font-size: 12px; font-weight: normal; opacity: 0.8;">\${data.country}</div>
          </div>
        </div>
        <div style="margin-top: 8px;">
          <div>📅 \${dt.date}</div>
          <div>🕐 \${dt.time}</div>
        </div>
        <div class="weather-info" id="weather-\${data.city.replace(/\\s/g, '')}">
          <span>⏳ Loading weather...</span>
        </div>
      \`;
      
      const mapWrapper = document.getElementById('mapWrapper');
      const rect = mapWrapper.getBoundingClientRect();
      callout.style.left = x + 'px';
      callout.style.top = (y - 120) + 'px';
      callout.style.position = 'absolute';
      
      mapWrapper.appendChild(callout);
      activeCallout = callout;

      // Fetch weather
      fetch(\`/api/weather?lat=\${data.lat}&lon=\${data.lon}\`)
        .then(res => res.json())
        .then(weather => {
          const weatherEl = document.getElementById(\`weather-\${data.city.replace(/\\s/g, '')}\`);
          if (weatherEl) {
            weatherEl.innerHTML = \`
              <span>\${weather.weatherEmoji}</span>
              <span>\${weather.temperature}°C</span>
              <span style="font-size: 12px; opacity: 0.8;">\${weather.description}</span>
            \`;
          }
        })
        .catch(err => console.error('Weather fetch error:', err));
    }

    function hideCallout() {
      if (activeCallout) {
        activeCallout.remove();
        activeCallout = null;
      }
    }

    // Create marker
    function createMarker(data, isUser = false) {
      const pos = latLonToSVG(data.lat, data.lon);
      const marker = document.createElement('div');
      marker.className = isUser ? 'user-marker' : 'city-marker';
      marker.style.left = pos.x + 'px';
      marker.style.top = pos.y + 'px';
      
      if (!isUser) {
        marker.addEventListener('mouseenter', () => {
          showCallout(pos.x, pos.y, data);
        });
        marker.addEventListener('mouseleave', () => {
          setTimeout(hideCallout, 300);
        });
      } else {
        marker.title = 'Your Location';
        marker.addEventListener('click', () => {
          showCallout(pos.x, pos.y, data);
        });
      }
      
      document.getElementById('markers').appendChild(marker);
    }

    // Load user location
    async function loadUserLocation() {
      try {
        const response = await fetch('/api/location');
        const data = await response.json();
        userLocation = data;
        createMarker(data, true);
        
        // Show user's location callout initially
        const pos = latLonToSVG(data.lat, data.lon);
        showCallout(pos.x, pos.y, data);
      } catch (error) {
        console.error('Error loading user location:', error);
      }
    }

    // Load cities
    async function loadCities() {
      try {
        const response = await fetch('/api/cities');
        cities = await response.json();
        cities.forEach(city => {
          createMarker({ ...city, city: city.name }, false);
        });
      } catch (error) {
        console.error('Error loading cities:', error);
      }
    }

    // Initialize
    async function init() {
      await Promise.all([loadUserLocation(), loadCities()]);
      document.getElementById('loading').style.display = 'none';
    }

    // Update time every second
    setInterval(() => {
      if (activeCallout) {
        const dt = formatDateTime();
        const dateEl = activeCallout.querySelector('div:nth-child(2) > div:nth-child(1)');
        const timeEl = activeCallout.querySelector('div:nth-child(2) > div:nth-child(2)');
        if (dateEl) dateEl.textContent = '📅 ' + dt.date;
        if (timeEl) timeEl.textContent = '🕐 ' + dt.time;
      }
    }, 1000);

    init();
  </script>
</body>
</html>`);
});

router.get('/api', (_req, res) => {
  res.json({ message: 'Hello, World!' });
});

router.get('/api', (_req, res) => {
  res.json({ message: 'Hello, World!' });
});

export default router;
