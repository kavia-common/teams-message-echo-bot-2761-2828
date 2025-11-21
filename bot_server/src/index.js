'use strict';

/*
  PUBLIC_INTERFACE
  Entry point for the minimal Bot Framework Echo Bot server.

  This server:
  - Listens on port 3978 (or BOT_PORT env var)
  - Exposes POST /api/messages for the Bot Framework Emulator
  - Uses no authentication for local development
  - Echoes back any text message it receives
*/

const path = require('path');
const express = require('express');
const { BotFrameworkAdapter, ActivityHandler } = require('botbuilder');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Configuration: do not hardcode values; read from environment with sensible defaults
const PORT = process.env.BOT_PORT ? Number(process.env.BOT_PORT) : 3978;

// Create the Express app
const app = express();

// Basic health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', name: 'botframework-echo-bot-server' });
});

// Create adapter with no auth for local emulator.
// For production or channels, provide MicrosoftAppId / MicrosoftAppPassword and configure auth.
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId || '',
  appPassword: process.env.MicrosoftAppPassword || ''
});

// Global error handler to ensure the bot doesn't crash on unhandled errors
adapter.onTurnError = async (context, error) => {
  // eslint-disable-next-line no-console
  console.error('[onTurnError] unhandled error:', error);
  await context.sendActivity('The bot encountered an error or bug.');
  await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

// Simple echo bot implementation
class EchoBot extends ActivityHandler {
  constructor() {
    super();
    // When a message activity is received, echo the text back
    this.onMessage(async (context, next) => {
      const text = (context.activity && context.activity.text) ? context.activity.text : '';
      const from = context.activity && context.activity.from ? context.activity.from.name || context.activity.from.id : 'user';
      const reply = text ? `You said: "${text}"` : 'I did not receive any text.';
      await context.sendActivity(reply);
      // Optionally show some debug info
      // await context.sendActivity(`(from: ${from})`);
      await next();
    });

    // When the bot gets added to a conversation
    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded || [];
      for (const member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity('Hello! I am an echo bot. Send me a message and I will echo it back.');
        }
      }
      await next();
    });
  }
}

// Instantiate the bot
const bot = new EchoBot();

// Expose the /api/messages endpoint for the Bot Framework Emulator
// This must be a POST endpoint that hands off to the adapter.
app.post('/api/messages', express.json(), (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});

// Start the server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Bot Server listening on http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log('POST endpoint available at /api/messages');
  // eslint-disable-next-line no-console
  console.log('Use Bot Framework Emulator with Endpoint URL: http://localhost:3978/api/messages (no auth)');
});

module.exports = { app, adapter, EchoBot };
