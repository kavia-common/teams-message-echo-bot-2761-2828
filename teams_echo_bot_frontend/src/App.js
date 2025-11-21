import React, { useState, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header app-shell">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <div className="app-title">Teams Echo Bot Emulator</div>
        <div className="app-subtitle">Send a message and the bot will echo it back.</div>
        <div className="chat-wrapper">
          <Chat />
        </div>
      </header>
    </div>
  );
}

export default App;
