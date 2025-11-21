/**
 * MessageList component renders a list of chat messages.
 * PUBLIC_INTERFACE
 */
import React from 'react';

export default function MessageList({ messages }) {
  return (
    <div
      className="chat-messages"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      {messages.length === 0 && (
        <div className="empty-state">
          Say hello to your Echo Bot. Type a message below to begin.
        </div>
      )}
      {messages.map((m, idx) => (
        <div key={idx} className={`message ${m.role}`}>
          <div className="bubble">
            {m.text}
          </div>
          <div className="meta">
            {m.role === 'user' ? 'You' : 'Bot'}
          </div>
        </div>
      ))}
    </div>
  );
}
