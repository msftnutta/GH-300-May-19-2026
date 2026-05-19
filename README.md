# GH-300 — GitHub Copilot for Developers (May 19, 2026)

Course workspace for **GH-300: GitHub Copilot for Developers**. This repository contains a sample Node.js application (`hello-app/`) used throughout the labs to practice using GitHub Copilot for real development tasks: writing code, generating tests, refactoring, debugging, and documenting.

---

## 📦 What's in this repo

```
GH-300-May-19-2026/
├── README.md              # This file
├── LICENSE
└── hello-app/             # Sample app used in the labs
    ├── src/               # Express server + routes
    ├── tests/             # Jest unit tests
    ├── package.json
    └── README.md          # App-specific docs (features, API, setup)
```

See [hello-app/README.md](hello-app/README.md) for the full feature list, API reference, and architectural details of the sample application.

---

## 🚀 The sample application — `hello-app`

`hello-app` is an **interactive World Map** built with Node.js (ESM) and Express. It demonstrates a realistic, multi-file project layout suitable for practicing Copilot-assisted development.

Highlights:

- 🌍 SVG world map with 15 major-city markers
- 📍 IP-based user geolocation (via `ip-api.com`)
- 🌤️ Real-time weather via the free **Open-Meteo API** (optional Azure Maps support)
- 🧪 Jest tests, ESLint, Prettier configured
- 🧩 Modular routing under `src/routes/` for easy extension

### Requirements

| Tool                     | Version              |
| ------------------------ | -------------------- |
| Node.js                  | 18 LTS or newer      |
| npm                      | 9+ (ships with Node) |
| Git                      | Any recent version   |
| VS Code                  | Latest               |
| GitHub Copilot extension | Latest (signed in)   |

### Quick start

```pwsh
git clone <this-repo-url>
cd GH-300-May-19-2026/hello-app
npm install
Copy-Item .env.example .env
npm start
```

Then open <http://localhost:3000>.

| Command          | Purpose                            |
| ---------------- | ---------------------------------- |
| `npm start`      | Run the server on port 3000        |
| `npm run dev`    | Run with `--watch` for auto-reload |
| `npm test`       | Run the Jest test suite            |
| `npm run lint`   | Lint with ESLint                   |
| `npm run format` | Format with Prettier               |

---

## 🤖 Using GitHub Copilot for dev work

GitHub Copilot is an AI pair-programmer that lives inside VS Code. In this course you'll use these main surfaces:

| Surface              | What it does                                                    | How to invoke                       |
| -------------------- | --------------------------------------------------------------- | ----------------------------------- |
| **Code completions** | Inline "ghost text" suggestions as you type                     | Just type — accept with `Tab`       |
| **Copilot Chat**     | Ask questions, generate code, explain, refactor in a side panel | `Ctrl+Alt+I` / Chat icon in sidebar |
| **Inline Chat**      | Edit the current selection or insert code at the cursor         | `Ctrl+I` in the editor              |
| **Agent mode**       | Multi-step tasks that read/edit files and run terminal commands | Mode picker in Chat → **Agent**     |

### Setup checklist

1. Install the **GitHub Copilot** and **GitHub Copilot Chat** extensions in VS Code.
2. Sign in with the GitHub account that has a Copilot license.
3. Verify the Copilot status icon in the bottom-right of VS Code is active (no warning badge).
4. Open this workspace folder so Copilot can index `hello-app/`.

### Common Copilot workflows used in this course

#### 1. Writing new code

- Add a comment describing intent, then let Copilot complete it:
  ```js
  // GET /api/cities/:code — return a single city by country code
  ```
- Or open Chat and ask: *"Add a new Express route in `src/routes/worldmap.js` that returns a single city by country code, and mount it in `src/app.js`."*

#### 2. Generating tests

- Open a file (e.g. `src/routes/worldmap.js`), then in Chat:
  *"Generate Jest + supertest tests for this router and save them to `tests/worldmap.test.js`."*
- Run `npm test` to verify.

#### 3. Explaining unfamiliar code

- Select code → Inline Chat (`Ctrl+I`) → **/explain**.
- Or in Chat: *"Explain how `src/config.js` loads environment variables."*

#### 4. Refactoring

- Select the block → `Ctrl+I` → *"Extract this into a helper function in a new file `src/lib/weather.js`."*

#### 5. Debugging & fixing errors

- Use the Chat slash command **/fix** on a failing test or red squiggle.
- Paste a stack trace and ask: *"What's causing this and how do I fix it?"*

#### 6. Writing documentation

- Select a function → **/doc** to generate a JSDoc block.
- This README itself was drafted with Copilot.

### Useful chat commands & context

| Syntax           | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `/explain`       | Explain selected code                    |
| `/fix`           | Propose a fix for the selection or error |
| `/tests`         | Generate unit tests                      |
| `/doc`           | Generate documentation comments          |
| `#file:hello.js` | Attach a specific file as context        |
| `#selection`     | Attach the current editor selection      |
| `#codebase`      | Let Copilot search the whole workspace   |
| `@workspace`     | Workspace-aware participant              |
| `@terminal`      | Ask about / generate terminal commands   |

### Tips for getting better suggestions

- **Be specific.** *"Add input validation for `lat` and `lon` query params, returning HTTP 400 on invalid numbers"* beats *"make it better"*.
- **Provide context.** Reference files with `#file:` so Copilot uses your real code rather than generic patterns.
- **Iterate.** If the first suggestion is off, refine the prompt or cycle inline suggestions with `Alt+]` / `Alt+[`.
- **Review every line.** Treat Copilot output like a pull request from a junior developer — read it, test it, and adjust.
- **Keep tests close.** Generated code is much safer when you also generate tests and run them.

---

## 🚢 Deploying `hello-app`

The app is a standard Express server, so any Node-capable host works. Two common paths used in the labs:

### Option A — Run locally / on a VM

```pwsh
cd hello-app
npm install --omit=dev
$env:PORT = "3000"
npm start
```

Put it behind a reverse proxy (nginx, IIS, Caddy) for HTTPS in production.

### Option B — Deploy to Azure App Service (recommended for the lab)

Prerequisites: an Azure subscription and the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) signed in (`az login`).

```pwsh
# 1. Variables
$rg       = "rg-gh300-demo"
$location = "eastus"
$plan     = "asp-gh300"
$app      = "gh300-helloapp-$((Get-Random -Maximum 9999))"

# 2. Create resource group + Linux plan
az group create -n $rg -l $location
az appservice plan create -g $rg -n $plan --sku B1 --is-linux

# 3. Create the Web App with a Node runtime
az webapp create -g $rg -p $plan -n $app --runtime "NODE:20-lts"

# 4. Configure startup + any env vars
az webapp config set -g $rg -n $app --startup-file "npm start"
# az webapp config appsettings set -g $rg -n $app --settings AZURE_MAPS_KEY=<key>

# 5. Deploy the hello-app folder
cd hello-app
az webapp up -g $rg -n $app --runtime "NODE:20-lts"
```

The app will be available at `https://<app>.azurewebsites.net`.

### Option C — Docker

Create a `Dockerfile` in `hello-app/` (Copilot can scaffold this for you — try: *"Generate a production Dockerfile for this Node 20 ESM Express app"*), then:

```pwsh
docker build -t hello-app ./hello-app
docker run -p 3000:3000 hello-app
```

### Environment variables

| Name             | Required | Default | Purpose                                      |
| ---------------- | -------- | ------- | -------------------------------------------- |
| `PORT`           | No       | `3000`  | HTTP listen port                             |
| `AZURE_MAPS_KEY` | No       | —       | Use Azure Maps Weather instead of Open-Meteo |

### Recommended pre-deploy checklist

- [ ] `npm test` passes
- [ ] `npm run lint` is clean
- [ ] `.env` is **not** committed (only `.env.example`)
- [ ] App starts cleanly with `npm start` locally
- [ ] Production env vars configured on the host

---

## 🎓 Training recap — GH-300 (May 19, 2026)

A quick reference of what we covered during the session.

### Day overview

| # | Module                                          | Key takeaways                                                                 |
| - | ----------------------------------------------- | ----------------------------------------------------------------------------- |
| 1 | **Introduction to GitHub Copilot**              | What Copilot is, how LLMs power suggestions, plans (Individual / Business / Enterprise), data handling |
| 2 | **Setup & first suggestions**                   | Installing the extensions in VS Code, signing in, accepting/cycling ghost-text suggestions |
| 3 | **Prompt engineering for Copilot**              | Comment-driven prompts, the "context window", why specificity matters         |
| 4 | **Copilot Chat surfaces**                       | Side-panel Chat, Inline Chat (`Ctrl+I`), Quick Chat, Agent mode               |
| 5 | **Slash commands & context variables**          | `/explain`, `/fix`, `/tests`, `/doc`, `#file:`, `#selection`, `#codebase`, `@workspace`, `@terminal` |
| 6 | **Generating and running tests**                | Producing Jest + supertest tests for `hello-app`, running `npm test`          |
| 7 | **Refactoring & debugging with Copilot**        | Extracting helpers, fixing failing tests, interpreting stack traces           |
| 8 | **Documentation & code understanding**          | `/explain` walkthroughs, JSDoc generation, drafting READMEs                   |
| 9 | **Agent mode & multi-file edits**               | Letting Copilot read, edit, and run terminal commands across the workspace    |
| 10 | **CI/CD with GitHub Actions**                  | Authoring the `ci.yml` workflow, build → lint → compile → test stages         |
| 11 | **Deployment to Azure App Service**            | `az webapp up`, publish profiles, wiring deploy into the workflow             |
| 12 | **Responsible use & best practices**           | Reviewing suggestions, license/IP awareness, security considerations, when *not* to trust Copilot |

### Hands-on labs we completed

1. **Lab 1 — Scaffolded `hello-app`** with Copilot-generated routes and verified with `npm start`.
2. **Lab 2 — Added a new API endpoint** (`/api/cities/:code`) using comment-driven prompting and Inline Chat.
3. **Lab 3 — Generated Jest tests** for `src/routes/worldmap.js` and brought the suite to green.
4. **Lab 4 — Refactored** the weather lookup into a reusable helper module.
5. **Lab 5 — Authored this `README.md`** end-to-end with Copilot Chat.
6. **Lab 6 — Created the GitHub Actions workflow** at [.github/workflows/ci.yml](.github/workflows/ci.yml).
7. **Lab 7 — Prepared the Azure deployment** path (kept commented in the workflow for later activation).

### Top lessons learned

- **Treat Copilot as a pair, not an oracle.** Always read, run, and test the code it produces.
- **Context is everything.** Open the right files and use `#file:` / `#codebase` to ground suggestions.
- **Small, specific prompts beat big vague ones.** Iterate in short cycles.
- **Tests are your safety net.** Pair every Copilot-generated change with a Copilot-generated test, then run it.
- **Use the right surface for the job:** completions for flow, Inline Chat for local edits, Chat for design questions, Agent mode for multi-file work.
- **Don't commit secrets.** Use `.env.example` + GitHub Action secrets for keys like `AZURE_MAPS_KEY` or publish profiles.

### Suggested next steps for practice

- Enable the commented-out `deploy` job in [.github/workflows/ci.yml](.github/workflows/ci.yml) and ship `hello-app` to Azure.
- Add a new route (e.g. `/api/timezone`) using only Copilot — comments first, then `/tests`.
- Convert the project to TypeScript with Agent mode and let Copilot fix the resulting type errors.
- Write a `Dockerfile` for `hello-app` using `@workspace` so Copilot tailors it to the real layout.

---

## 📚 Further reading

- [GitHub Copilot docs](https://docs.github.com/en/copilot)
- [Copilot Chat cookbook](https://docs.github.com/copilot/copilot-chat-cookbook)
- [Express documentation](https://expressjs.com/)
- [Azure App Service for Node](https://learn.microsoft.com/azure/app-service/quickstart-nodejs)

---

## 📄 License

See [LICENSE](LICENSE).
