import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hello App</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YcnS/1WR6I3HMKzL0UCkz/BECQb+JfLGOd0"
        crossorigin="anonymous" />
  <style>
    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      border: none;
      border-radius: 1rem;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    .clock {
      font-size: 2.5rem;
      font-weight: 300;
      color: #495057;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card p-5 text-center">
          <h1 class="display-4 mb-3">👋 Hello, World!</h1>
          <p class="lead text-muted mb-4">Welcome to the Hello App</p>
          <hr />
          <div class="mt-4">
            <p class="text-muted mb-1">Current Date</p>
            <h4 id="date">${dateStr}</h4>
          </div>
          <div class="mt-3">
            <p class="text-muted mb-1">Current Time</p>
            <p class="clock" id="time">${timeStr}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossorigin="anonymous"></script>
  <script>
    function updateClock() {
      const now = new Date();
      document.getElementById('date').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      document.getElementById('time').textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    }
    setInterval(updateClock, 1000);
  </script>
</body>
</html>`);
});

router.get('/api', (_req, res) => {
  res.json({ message: 'Hello, World!' });
});

export default router;
