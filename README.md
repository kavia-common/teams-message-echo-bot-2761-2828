# teams-message-echo-bot-2761-2828

## Backend (Node.js Bot Framework)
- Location: `backend/`
- Start: `npm install && npm run dev` (requires Node.js). The server listens on port 3978 by default.
- Endpoints:
  - Health: GET http://localhost:3978/health
  - Echo: GET http://localhost:3978/api/echo?text=hello
  - Bot Framework: POST http://localhost:3978/api/messages

Environment (backend/.env):
```
PORT=3978
MicrosoftAppId=""
MicrosoftAppPassword=""
MicrosoftAppType=MultiTenant
```

Bot Framework Emulator:
- Open Bot Framework Emulator
- New Bot Configuration:
  - Endpoint URL: http://localhost:3978/api/messages
  - Microsoft App ID: leave blank (for local)
  - Microsoft App password: leave blank (for local)
- Send "hello" -> bot replies "You said: hello"

## Frontend (React)
- Location: `teams_echo_bot_frontend/`
- Local env: `.env.local` preconfigured for local backend at http://localhost:3978
- Start: `npm install && npm start`
- The page provides a minimal chat UI calling `/api/echo` and shows responses.