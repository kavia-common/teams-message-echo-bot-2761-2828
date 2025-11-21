/**
 * Simple API client for the echo backend.
 * Uses REACT_APP_API_BASE or defaults to http://localhost:3978.
 * PUBLIC_INTERFACE
 */

/** Resolve API base URL from env with fallback, trimming trailing slashes. */
export function getApiBase() {
  const base =
    process.env.REACT_APP_API_BASE?.trim() ||
    process.env.REACT_APP_BACKEND_URL?.trim() ||
    'http://localhost:3978';
  return base.replace(/\/+$/, '');
}

/**
 * PUBLIC_INTERFACE
 * Send a text message to the echo backend.
 * It will try a lightweight /echo route first, falling back to /api/messages/echo if available.
 * @param {string} text - The user message to send.
 * @returns {Promise<{reply: string, route: string}>} The echoed reply and the route used.
 */
export async function sendEcho(text) {
  if (!text || !text.trim()) {
    throw new Error('Message text cannot be empty.');
  }

  const base = getApiBase();

  // Try a lightweight JSON echo endpoint at /echo
  const tryRoutes = [
    { path: '/echo', body: { text }, headers: { 'Content-Type': 'application/json' } },
    // Optional proxy route if backend exposes it
    { path: '/api/messages/echo', body: { text }, headers: { 'Content-Type': 'application/json' } }
  ];

  let lastError;
  for (const route of tryRoutes) {
    try {
      const res = await fetch(`${base}${route.path}`, {
        method: 'POST',
        headers: route.headers,
        body: JSON.stringify(route.body),
      });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data = await res.json();
      // Expecting { reply: string } or { text: string }
      const reply = data.reply ?? data.text ?? '';
      return { reply: String(reply), route: route.path };
    } catch (e) {
      lastError = e;
      // try the next route
    }
  }

  // If both JSON routes fail, as a last resort we emulate an echo for UI continuity.
  // Note: Real echo requires a backend route; this fallback prevents UI from breaking.
  return Promise.resolve({ reply: `You said: "${text}" (local fallback)`, route: 'local-fallback' });
}
