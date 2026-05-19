# hello-app

Interactive World Map application with IP geolocation, real-time weather, and time display. Built with Node.js (ESM) and Express, structured for easy feature additions.

## ✨ Features

### 🌍 Interactive World Map
- **SVG-based world map** with simplified continent shapes
- **User location detection** via IP address with animated marker
- **15 major cities** across the globe with interactive markers
- **Hover-based callouts** showing location details

### 🌤️ Weather Integration
- Real-time weather forecasts using **Open-Meteo API** (no API key required)
- Optional **Azure Maps Weather API** support
- Weather emoji indicators (☀️ ⛅ 🌧️ 🌨️ ⛈️ 🌫️)
- Temperature display in Celsius

### 🗺️ Location Features
- **National flag emojis** for each country
- City names and country information
- Real-time date and time updates
- Timezone-aware information

### 🎨 Modern UI
- Responsive design with Bootstrap 5
- Gradient backgrounds
- Smooth animations and transitions
- Pulsing user location marker
- Hover effects on city markers

## Layout

```
hello-app/
├── src/
│   ├── app.js          # Express app (no listen — testable)
│   ├── server.js       # Entry point: loads env, starts server
│   ├── config.js       # Env-driven configuration
│   └── routes/
│       ├── hello.js    # GET / - World Map UI
│       └── worldmap.js # API endpoints for location/weather
├── tests/
│   ├── hello.test.js
│   └── config.test.js
├── eslint.config.js
├── jest.config.js
├── package.json
└── .env.example
```

## Setup

```pwsh
cd hello-app
npm install
Copy-Item .env.example .env
```

### Optional: Azure Maps Configuration
To use Azure Maps Weather API instead of Open-Meteo, add your API key to `.env`:
```
AZURE_MAPS_KEY=your_azure_maps_subscription_key
```

## Commands

| Command         | Purpose                                  |
| --------------- | ---------------------------------------- |
| `npm start`     | Run the server (http://localhost:3000)   |
| `npm run dev`   | Run with `--watch` for auto-reload       |
| `npm test`      | Run Jest unit tests                      |
| `npm run lint`  | Lint with ESLint                         |
| `npm run format`| Format with Prettier                     |

## API Endpoints

### `GET /`
Returns the interactive world map HTML interface.

### `GET /api`
Returns a simple JSON response:
```json
{ "message": "Hello, World!" }
```

### `GET /api/location`
Detects user's location from IP address.
```json
{
  "city": "New York",
  "country": "United States",
  "countryCode": "US",
  "lat": 40.7128,
  "lon": -74.006,
  "timezone": "America/New_York"
}
```

### `GET /api/weather?lat={latitude}&lon={longitude}`
Fetches current weather for specified coordinates.
```json
{
  "temperature": 22,
  "weatherCode": 0,
  "weatherEmoji": "☀️",
  "description": "Clear sky"
}
```

### `GET /api/cities`
Returns list of major cities with coordinates.
```json
[
  {
    "name": "New York",
    "country": "United States",
    "countryCode": "US",
    "lat": 40.7128,
    "lon": -74.006,
    "emoji": "🗽"
  },
  ...
]
```

## Major Cities Included

- 🗽 New York, United States
- 🏰 London, United Kingdom
- 🗼 Paris, France
- 🗾 Tokyo, Japan
- 🦘 Sydney, Australia
- 🏜️ Dubai, UAE
- 🦁 Singapore
- ⚽ São Paulo, Brazil
- 🏛️ Moscow, Russia
- 🕌 Mumbai, India
- 🐪 Cairo, Egypt
- 🌮 Mexico City, Mexico
- 🍁 Toronto, Canada
- 🍺 Berlin, Germany
- 🏯 Seoul, South Korea

## Adding features

- **New route:** create `src/routes/<name>.js` exporting an Express `Router`, then mount it in `src/app.js`.
- **External API:** add base URL / key to `.env` and `src/config.js`; use `axios` for HTTP requests.
- **Tests:** add `tests/*.test.js`; import `app` from `src/app.js` and use `supertest`.

## Technologies Used

- **Node.js** (ESM modules)
- **Express** - Web framework
- **Axios** - HTTP client
- **Bootstrap 5** - UI framework
- **Open-Meteo API** - Weather data (free, no key required)
- **ip-api.com** - IP geolocation (free)
- **SVG** - Interactive world map
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
