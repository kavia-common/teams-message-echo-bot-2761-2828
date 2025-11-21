'use strict';

/**
 * Entry point for the Bot Framework echo service and auxiliary REST APIs.
 * - Exposes:
 *    GET  /health            -> 200 OK for health checks
 *    GET  /api/echo?text=... -> echoes text; 400 if missing
 *    POST /api/messages      -> Bot Framework endpoint
 *
 * Environment variables:
 *  - PORT: server port (default: 3978)
 *  - MicrosoftAppId, MicrosoftAppPassword, MicrosoftAppType: Bot credentials (empty allowed for local)
 */

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { BotFrameworkAdapter, ActivityTypes } = require('botbuilder');
const { EchoBot } = require('./bot/EchoBot');

// Configuration
const PORT = process.env.PORT || 3978;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: allow CRA local dev
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging
app.use(morgan('dev'));

// Health endpoint
// PUBLIC_INTERFACE
app.get('/health', (req, res) => {
  /**
   * Returns 200 OK for health checks
   * Response: { status: 'ok' }
   */
  res.status(200).json({ status: 'ok' });
});

// Simple echo endpoint for frontend testing
// PUBLIC_INTERFACE
app.get('/api/echo', (req, res) => {
  /**
   * Echoes the provided query string 'text'.
   * Query params:
   *  - text: string (required)
   * Returns:
   *  - 200: text/plain with echoed text
   *  - 400: if text is missing
   */
  const { text } = req.query;
  if (typeof text === 'undefined' || text === null || text === '') {
    return res.status(400).json({ error: "Missing required query parameter 'text'." });
  }
  res.type('text/plain').send(String(text));
});

// Bot Framework Adapter with credentials (empty allowed for local)
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId || '',
  appPassword: process.env.MicrosoftAppPassword || '',
  channelService: process.env.ChannelService || undefined
});

// Global error handler for the adapter
adapter.onTurnError = async (context, error) => {
  // eslint-disable-next-line no-console
  console.error('[onTurnError] unhandled error:', error);

  // Send a message to the user
  await context.sendActivity('The bot encountered an error or bug.');
  await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

// Create the bot
const bot = new EchoBot();

// Bot Framework endpoint
// PUBLIC_INTERFACE
app.post('/api/messages', (req, res) => {
  /**
   * Bot Framework message endpoint.
   * Accepts activities and routes them to the EchoBot.
   */
  adapter.processActivity(req, res, async (context) => {
    // Only handle message and conversation events normally
    if (context.activity && context.activity.type === ActivityTypes.Message) {
      await bot.run(context);
    } else {
      await bot.run(context);
    }
  });
});

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Bot/Server listening on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Health: http://localhost:${PORT}/health`);
  // eslint-disable-next-line no-console
  console.log(`Echo:   http://localhost:${PORT}/api/echo?text=hello`);
  // eslint-disable-next-line no-console
  console.log(`Bot:    POST http://localhost:${PORT}/api/messages`);
});
