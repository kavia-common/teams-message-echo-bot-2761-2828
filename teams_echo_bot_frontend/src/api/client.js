/**
 * PUBLIC_INTERFACE
 * echo
 * Calls the backend echo endpoint and returns the response text.
 */
export async function echo(text) {
  /** This function calls GET {baseURL}/api/echo?text=... and returns the echoed string. */
  const baseURL =
    process.env.REACT_APP_BACKEND_URL ||
    process.env.REACT_APP_API_BASE ||
    'http://localhost:3978';

  const url = `${baseURL.replace(/\/$/, '')}/api/echo?text=${encodeURIComponent(
    text ?? ''
  )}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain'
    }
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Echo request failed: ${res.status} ${res.statusText} ${errText}`);
  }

  return res.text();
}
