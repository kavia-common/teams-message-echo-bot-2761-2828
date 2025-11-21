# Bot Framework Echo Bot (Local)

A minimal Node.js server hosting a Bot Framework-compatible echo bot. It exposes `POST /api/messages` on port `3978` and is designed to work with the Bot Framework Emulator locally with no authentication.

## Features

- Express server listening on port 3978 (configurable via env)
- `POST /api/messages` endpoint for Bot Framework Emulator
- No authentication required for local development
- Simple echo behavior: replies with the same text you send

## Prerequisites

- Node.js 18+ installed locally
- [Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator/releases) installed locally

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Start the bot in development mode (auto-restarts on file change):

   ```
   npm run dev
   ```

   Or start normally:

   ```
   npm start
   ```

3. You should see output similar to:

   ```
   Bot Server listening on http://localhost:3978
   POST endpoint available at /api/messages
   Use Bot Framework Emulator with Endpoint URL: http://localhost:3978/api/messages (no auth)
   ```

## Connect with Bot Framework Emulator

1. Open the Bot Framework Emulator.
2. Click "Open Bot".
3. In "Bot URL", enter:

   ```
   http://localhost:3978/api/messages
   ```

4. Leave Microsoft App ID and Password blank (no auth).
5. Click "Connect".

Now, send a message to your bot; it will reply with:

```
You said: "your message here"
```

## Configuration

Provide an `.env` file in this folder to override defaults. The server reads:

- `BOT_PORT` (default: `3978`)
- `MicrosoftAppId` (leave empty for local emulator)
- `MicrosoftAppPassword` (leave empty for local emulator)

Example `.env`:

```
BOT_PORT=3978
MicrosoftAppId=
MicrosoftAppPassword=
```

Note: Do not commit real secrets. For local emulator testing, leave these values empty.

## Project Structure

```
bot_server/
  ├── package.json
  ├── README.md
  └── src/
      └── index.js
```

## Notes

- This backend is self-contained and does not depend on external services or the React frontend.
- For production or channel connections (e.g., Teams), you must configure authentication and channel registration. This sample is intentionally focused on local emulator testing only.
