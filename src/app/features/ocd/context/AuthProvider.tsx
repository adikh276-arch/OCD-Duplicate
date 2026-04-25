import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCookieAuth, getStoredUserId, getStoredSessionId, isAuthenticated } from '../utils/cookieAuth';

interface AuthState {
  userId: string | null;
  sessionId: string | null;
  isReady: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthState>({
  userId: null,
  sessionId: null,
  isReady: false,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

const HANDSHAKE_TIMEOUT_MS = 8000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    // Synchronously check cookies/sessionStorage on first render
    const userId = getStoredUserId();
    const sessionId = getStoredSessionId();
    if (userId) {
      return { userId, sessionId, isReady: true, error: null };
    }
    return { userId: null, sessionId: null, isReady: false, error: null };
  });

  useEffect(() => {
    // Already authenticated from cookies/sessionStorage — nothing to do
    if (state.isReady) return;

    // Not in an iframe (direct URL / dev access) — set a standalone session immediately
    const isInIframe = window.self !== window.top;
    if (!isInIframe) {
      const standaloneId = 'standalone-' + Date.now();
      setCookieAuth(standaloneId, standaloneId);
      sessionStorage.setItem('user_id', standaloneId);
      sessionStorage.setItem('session_id', standaloneId);
      setState({ userId: standaloneId, sessionId: standaloneId, isReady: true, error: null });
      return;
    }

    // In iframe — do the MantraCare postMessage handshake once
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes('mantracare.com')) return;

      if (event.data?.type === 'TOKEN_RESPONSE' && event.data?.user_id) {
        const userId = String(event.data.user_id);
        const sessionId = String(event.data.session_id ?? event.data.user_id);

        // Write to cookies AND sessionStorage for dual-access
        setCookieAuth(userId, sessionId);
        sessionStorage.setItem('user_id', userId);
        sessionStorage.setItem('session_id', sessionId);

        setState({ userId, sessionId, isReady: true, error: null });
      }
    };

    window.addEventListener('message', handleMessage);

    // Request auth token from the parent MantraCare platform
    try {
      window.parent.postMessage({ type: 'TOKEN_REQUEST' }, '*');
    } catch {
      // Safe to ignore — cross-origin restriction in some browsers
    }

    const timeout = setTimeout(() => {
      setState((prev) => {
        if (!prev.isReady) {
          return { ...prev, error: 'Authentication timeout. Please reopen this module from the MantraCare app.' };
        }
        return prev;
      });
    }, HANDSHAKE_TIMEOUT_MS);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    };
  }, []);

  // Loading screen while waiting for handshake
  if (!state.isReady && !state.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#043570] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium text-sm">Connecting to MantraCare…</p>
        </div>
      </div>
    );
  }

  // Error screen on timeout
  if (state.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-600 mb-6 text-sm">{state.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-[#043570] text-white rounded-xl font-semibold hover:bg-[#032a5a] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};
