# teams-message-echo-bot-2761-2828

## What this project includes
- A Node.js Bot Framework backend exposing:
  - POST http://localhost:3978/api/messages (Emulator endpoint)
  - GET  http://localhost:3978/health (health check)
  - GET  http://localhost:3978/api/echo?text=hello (demo echo for frontend)
- A lightweight React frontend that calls the backend’s /api/echo for a minimal chat experience.

## 1) Backend setup and run
- Location: backend/
- Commands:
  cd backend
  npm install
  npm start
- Default port: 3978 (configurable via backend/.env: PORT)
- Verify:
  - Health: http://localhost:3978/health should return {"status":"ok"}
  - Echo:   http://localhost:3978/api/echo?text=hello should return hello

### Backend environment variables (backend/.env)
PORT=3978
MicrosoftAppId=""
MicrosoftAppPassword=""
MicrosoftAppType=MultiTenant
# Optional: allow CRA dev origin
# FRONTEND_ORIGIN=http://localhost:3000

Notes:
- For local Bot Framework Emulator testing, leave MicrosoftAppId and MicrosoftAppPassword empty.

## 2) Frontend setup and run
- Location: teams_echo_bot_frontend/
- Commands:
  cd ../teams_echo_bot_frontend
  npm install
  npm start
- Default port: 3000
- Local env: teams_echo_bot_frontend/.env.local is preconfigured for local backend at http://localhost:3978 and includes:
  - REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL, REACT_APP_WS_URL,
    REACT_APP_NODE_ENV, REACT_APP_NEXT_TELEMETRY_DISABLED, REACT_APP_ENABLE_SOURCE_MAPS,
    REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL,
    REACT_APP_HEALTHCHECK_PATH, REACT_APP_FEATURE_FLAGS, REACT_APP_EXPERIMENTS_ENABLED

## 3) Bot Framework Emulator testing
- Open Bot Framework Emulator
- Open Bot and set:
  - Endpoint URL: http://localhost:3978/api/messages
  - Microsoft App ID: leave empty
  - Microsoft App password: leave empty
- Send "hello" and expect bot reply: "You said: hello"

## Troubleshooting
- CORS: If the frontend gets CORS errors, ensure backend is running and FRONTEND_ORIGIN in backend/.env matches frontend URL (http://localhost:3000). Restart backend after changes.
- Port conflicts:
  - If 3978 is in use, set PORT in backend/.env to an open port (e.g., 4999) and restart.
  - Update Emulator endpoint and frontend REACT_APP_BACKEND_URL/REACT_APP_API_BASE accordingly.
- Verifying logs:
  - Backend logs appear in the terminal running npm start (morgan + startup URLs).
  - Check http://localhost:3978/health returns ok before Emulator tests.

## Reference
- Backend README with details: backend/README.md