/**
 * Chat container manages messages state and calls the echo API.
 * PUBLIC_INTERFACE
 */
import React, { useCallback, useMemo, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { getApiBase, sendEcho } from '../api/client';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const apiBase = useMemo(() => getApiBase(), []);

  const handleSend = useCallback(async (text) => {
    const userMsg = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);
    try {
      const { reply, route } = await sendEcho(text);
      const botMsg = {
        role: 'bot',
        text: reply || '(no reply)',
        via: route,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const botMsg = {
        role: 'bot',
        text: `Error: ${(err && err.message) || 'Failed to send message'}`,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="title">Echo Bot</div>
        <div className="subtitle">Backend: {apiBase}</div>
      </div>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} disabled={sending} />
    </div>
  );
}
