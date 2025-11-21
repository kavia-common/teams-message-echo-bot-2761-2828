/**
 * MessageInput provides a text box and a button to send messages.
 * PUBLIC_INTERFACE
 */
import React, { useState } from 'react';

export default function MessageInput({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    onSend?.(text);
    setValue('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type a message..."
        aria-label="Type a message"
        rows={2}
        disabled={disabled}
      />
      <button
        type="button"
        className="send-btn"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        title="Send"
      >
        Send
      </button>
    </div>
  );
}
