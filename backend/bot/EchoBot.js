'use strict';
const { ActivityHandler, MessageFactory } = require('botbuilder');

/**
 * PUBLIC_INTERFACE
 * EchoBot
 * A simple Bot Framework bot that echoes the incoming text.
 */
class EchoBot extends ActivityHandler {
  constructor() {
    super();

    // On message: echo back the received text
    this.onMessage(async (context, next) => {
      const text = (context.activity && context.activity.text) ? context.activity.text : '';
      const replyText = text ? `You said: ${text}` : 'You said:';
      await context.sendActivity(MessageFactory.text(replyText, replyText));
      await next();
    });

    // On members added: send a welcome message
    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded || [];
      for (let member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          const welcomeText = 'Hello and welcome! Send me a message and I will echo it back.';
          await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
        }
      }
      await next();
    });
  }
}

module.exports.EchoBot = EchoBot;
