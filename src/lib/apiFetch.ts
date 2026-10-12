import { ofetch } from 'ofetch';

// Set NEXT_PUBLIC_API_URL in .env.local (e.g. http://localhost:5000).
// Cookies (accessToken / refreshToken) are sent with every request.
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const apiFetch = ofetch.create({
  baseURL: API_URL,
  credentials: 'include',
});

export default apiFetch;
