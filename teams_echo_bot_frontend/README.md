# Teams Echo Bot Frontend (React)

A lightweight React UI to send messages to the echo backend and display responses.

## Quick Start

1. Start the echo backend (from bot_server):
   - npm install
   - npm start
   - The server listens on http://localhost:3978

2. Configure frontend (optional):
   - Create a `.env` file in this folder and set:
     ```
     REACT_APP_API_BASE=http://localhost:3978
     ```
     If not set, the app defaults to `http://localhost:3978`.

3. Start the frontend:
   - npm install
   - npm start
   - Open http://localhost:3000

## Using the App

- Type a message into the input at the bottom.
- Press Enter or click Send.
- The bot reply appears in the message list.

## Environment Variables

- `REACT_APP_API_BASE`:
  - Base URL of the echo backend.
  - Default: `http://localhost:3978`.

Other typical variables may exist in your environment, but only REACT_APP_API_BASE is used by this app for the echo call.

## Notes

- The frontend will attempt to POST to `/echo` and fallback to `/api/messages/echo` on the configured backend. If neither is available, it shows a local echo fallback in the UI so you can verify the flow.
- For Bot Framework Emulator testing of `/api/messages`, you still need to use the Emulator app; this frontend is a simplified chat UI for local experiments.
