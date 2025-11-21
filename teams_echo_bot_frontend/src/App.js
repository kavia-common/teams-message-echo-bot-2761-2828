import React, { useState, useEffect } from 'react';
import './App.css';
import { echo as echoApi } from './api/client';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Simple chat state
  const [messages, setMessages] = useState([]); // { role: 'user' | 'bot', text: string }[]
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const sendMessage = async (e) => {
    e?.preventDefault();
    setError('');
    const text = input.trim();
    if (!text) return;

    // Append user message
    setMessages(prev => [...prev, { role: 'user', text }]);
    setSending(true);
    setInput('');

    try {
      const response = await echoApi(text);
      // Append bot response
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (err) {
      setError(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header" style={{ padding: '24px', boxSizing: 'border-box' }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <h1 style={{ marginBottom: 8 }}>Teams Echo Bot Emulator</h1>
        <p style={{ marginTop: 0, color: 'var(--text-secondary)' }}>
          Type a message below. The backend will echo it back via /api/echo.
        </p>

        <div
          style={{
            width: 'min(800px, 90vw)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            padding: 16,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            minHeight: 300,
            maxHeight: '60vh',
          }}
          aria-live="polite"
        >
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              textAlign: 'left',
              padding: '8px',
              background: 'var(--bg-primary)',
              borderRadius: 8,
              border: '1px solid var(--border-color)'
            }}
          >
            {messages.length === 0 && (
              <div style={{ color: 'var(--text-secondary)' }}>
                No messages yet. Say hello!
              </div>
            )}
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 8
                }}
              >
                <div
                  style={{
                    maxWidth: '75%',
                    padding: '8px 12px',
                    borderRadius: 12,
                    background: m.role === 'user' ? 'var(--button-bg)' : 'var(--bg-secondary)',
                    color: m.role === 'user' ? 'var(--button-text)' : 'var(--text-primary)',
                    border: m.role === 'user' ? 'none' : '1px solid var(--border-color)'
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
            <input
              aria-label="Type your message"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="theme-toggle"
              style={{ position: 'static' }}
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </form>

          {error && (
            <div role="alert" style={{ color: '#EF4444', textAlign: 'left' }}>
              {error}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
