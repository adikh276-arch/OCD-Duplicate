// Cookie-based auth utilities for MantraCare OCD Self-Care module

const COOKIE_USER_ID = 'mc_ocd_user_id';
const COOKIE_SESSION_ID = 'mc_ocd_session_id';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds

function buildCookieString(name: string, value: string, maxAge: number): string {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  const sameSite = secure ? '; SameSite=None' : '; SameSite=Lax';
  return `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/ ${sameSite}${secure}`;
}

export function setCookieAuth(userId: string, sessionId: string): void {
  document.cookie = buildCookieString(COOKIE_USER_ID, userId, COOKIE_MAX_AGE);
  document.cookie = buildCookieString(COOKIE_SESSION_ID, sessionId, COOKIE_MAX_AGE);
}

export function getCookieValue(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

export function getStoredUserId(): string | null {
  return getCookieValue(COOKIE_USER_ID) ?? sessionStorage.getItem('user_id');
}

export function getStoredSessionId(): string | null {
  return getCookieValue(COOKIE_SESSION_ID) ?? sessionStorage.getItem('session_id');
}

export function clearCookieAuth(): void {
  document.cookie = buildCookieString(COOKIE_USER_ID, '', -1);
  document.cookie = buildCookieString(COOKIE_SESSION_ID, '', -1);
  sessionStorage.removeItem('user_id');
  sessionStorage.removeItem('session_id');
}

export function isAuthenticated(): boolean {
  return !!getStoredUserId();
}
