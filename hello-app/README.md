# hello-app

Minimal Node.js (ESM) Hello World HTTP server using Express. Structured so additional routes, external API integrations, and unit tests can be added without restructuring.

## Layout

```
hello-app/
├── src/
│   ├── app.js          # Express app (no listen — testable)
│   ├── server.js       # Entry point: loads env, starts server
│   ├── config.js       # Env-driven configuration
│   └── routes/
│       └── hello.js    # GET /
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

## Commands

| Command         | Purpose                                  |
| --------------- | ---------------------------------------- |
| `npm start`     | Run the server (http://localhost:3000)   |
| `npm run dev`   | Run with `--watch` for auto-reload       |
| `npm test`      | Run Jest unit tests                      |
| `npm run lint`  | Lint with ESLint                         |
| `npm run format`| Format with Prettier                     |

## Adding features

- **New route:** create `src/routes/<name>.js` exporting an Express `Router`, then mount it in `src/app.js`.
- **External API:** add base URL / key to `.env` and `src/config.js`; use the built-in `fetch` (Node 18+).
- **Tests:** add `tests/*.test.js`; import `app` from `src/app.js` and use `supertest`.
