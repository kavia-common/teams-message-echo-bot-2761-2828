#!/bin/bash
cd /home/kavia/workspace/code-generation/teams-message-echo-bot-2761-2828/teams_echo_bot_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

