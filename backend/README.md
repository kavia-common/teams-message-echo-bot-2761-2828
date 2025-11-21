# Backend: Node.js Bot Framework Echo Service

## Overview
This backend is a Node.js Express server that hosts:
- A Microsoft Bot Framework endpoint for the echo bot at POST /api/messages
- A simple health check at GET /health
- A demo echo endpoint at GET /api/echo?text=hello for the frontend and quick manual testing

It is configured for local development with empty Microsoft App ID and password, which works with the Bot Framework Emulator on your machine.

## Prerequisites
- Node.js 18+ and npm
- Bot Framework Emulator (for local bot testing)
- Optional: A web browser for testing the demo echo endpoint

## Quick Start
1) Install dependencies
   cd backend
   npm install

2) Start the server (default port 3978)
   npm start
   # Alternatively for live reload (if nodemon is installed): npm run dev

3) Verify the server is running
   - Health check: http://localhost:3978/health
     Expected: {"status":"ok"}
   - Demo echo: http://localhost:3978/api/echo?text=hello
     Expected: hello

## Bot Framework Emulator Testing
1) Open Bot Framework Emulator
2) File -> Open Bot
3) Enter:
   - Bot URL: http://localhost:3978/api/messages
   - Microsoft App ID: leave empty
   - Microsoft App password: leave empty
4) Connect, then send "hello"
   You should receive: "You said: hello"

## Environment Variables
Define environment variables in backend/.env. Defaults are provided for local development.

Example backend/.env:
PORT=3978
MicrosoftAppId=""
MicrosoftAppPassword=""
MicrosoftAppType=MultiTenant
# Optionally allow CRA dev origin (default http://localhost:3000)
# FRONTEND_ORIGIN=http://localhost:3000

Notes:
- For local emulator testing, MicrosoftAppId and MicrosoftAppPassword can remain empty.
- When deploying to Azure or another environment, configure valid credentials.

## Endpoints
- GET /health
  - Returns 200 with {"status":"ok"} for health checks.

- GET /api/echo?text=hello
  - Returns the value of the text query string as plain text.
  - Returns 400 if text is missing.

- POST /api/messages
  - Bot Framework endpoint that routes activities to the echo bot.

## Logs and Verification
- The server logs to stdout using morgan in dev mode.
- On startup, you will see URLs for health, echo, and bot endpoints.
- For request logs and errors, check the terminal running npm start.

## Troubleshooting
- Port conflicts (EADDRINUSE):
  - If port 3978 is in use, change PORT in backend/.env to an open port and restart.
  - Update Bot Framework Emulator URL accordingly (e.g., http://localhost:4999/api/messages).
  - Update frontend base URL if you changed the port (REACT_APP_BACKEND_URL).

- CORS errors from the frontend:
  - Ensure the backend is running and FRONTEND_ORIGIN (in backend/.env) matches the frontend URL (default http://localhost:3000).
  - Restart the backend after changing env values.

- Emulator cannot connect:
  - Verify health endpoint at http://localhost:3978/health returns ok.
  - Ensure MicrosoftAppId and MicrosoftAppPassword are empty for local testing.
  - Confirm the URL is exactly http://localhost:3978/api/messages and that the server is running.

- No echo reply in Emulator:
  - Check backend logs for errors.
  - Try sending a plain text message like "hello".
  - If you changed the port, update the Emulator endpoint accordingly.

## Project Structure (backend)
backend/
  index.js              # Express server and Bot Framework adapter setup
  package.json          # Scripts and dependencies
  .env                  # Local environment variables (ignored from VCS)
  bot/
    EchoBot.js          # Simple echo bot implementation

## Scripts
- npm start — start the server on PORT (default 3978)
- npm run dev — start with nodemon for automatic reloads

## Related Frontend
The React frontend in ../teams_echo_bot_frontend relies on:
- REACT_APP_BACKEND_URL or REACT_APP_API_BASE pointing to this backend (default http://localhost:3978)
- For local dev, .env.local is already configured for the default ports.

