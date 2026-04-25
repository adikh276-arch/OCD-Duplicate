import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCookieAuth, getStoredUserId, getStoredSessionId } from '../utils/cookieAuth';

interface AuthState {
  userId: string | null;
  sessionId: string | null;
  token: string | null;
  isReady: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthState>({
  userId: null,
  sessionId: null,
  token: null,
  isReady: false,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

const HANDSHAKE_TIMEOUT_MS = 10000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    const userId = getStoredUserId();
    const sessionId = getStoredSessionId();
    const token = sessionStorage.getItem('token');
    
    // Strict check: must have user_id AND token (unless standalone)
    if (userId && (token || userId.startsWith('standalone'))) {
      return { userId, sessionId, token, isReady: true, error: null };
    }
    return { userId: null, sessionId: null, token: null, isReady: false, error: null };
  });

  useEffect(() => {
    if (state.isReady) return;

    const isInIframe = window.self !== window.top;
    if (!isInIframe) {
      const standaloneId = 'standalone-' + Date.now();
      setCookieAuth(standaloneId, standaloneId);
      sessionStorage.setItem('user_id', standaloneId);
      sessionStorage.setItem('session_id', standaloneId);
      sessionStorage.setItem('token', 'standalone_token');
      setState({ userId: standaloneId, sessionId: standaloneId, token: 'standalone_token', isReady: true, error: null });
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes('mantracare.com')) return;

      // Strict handshake: Expecting user_id AND token (or session_id)
      if (event.data?.type === 'TOKEN_RESPONSE' && event.data?.user_id && event.data?.token) {
        const userId = String(event.data.user_id);
        const sessionId = String(event.data.session_id || event.data.user_id);
        const token = String(event.data.token);

        setCookieAuth(userId, sessionId);
        sessionStorage.setItem('user_id', userId);
        sessionStorage.setItem('session_id', sessionId);
        sessionStorage.setItem('token', token);

        setState({ userId, sessionId, token, isReady: true, error: null });
      }
    };

    window.addEventListener('message', handleMessage);

    try {
      window.parent.postMessage({ type: 'TOKEN_REQUEST' }, '*');
    } catch {}

    const timeout = setTimeout(() => {
      setState((prev) => {
        if (!prev.isReady) {
          return { ...prev, error: 'Authentication failed. Please ensure you are logged into MantraCare.' };
        }
        return prev;
      });
    }, HANDSHAKE_TIMEOUT_MS);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    };
  }, [state.isReady]);

  if (!state.isReady && !state.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#043570] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium text-sm">Securing Session…</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Auth Required</h2>
          <p className="text-slate-600 mb-6 text-sm">{state.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-[#043570] text-white rounded-xl font-semibold hover:bg-[#032a5a] transition-colors"
          >
            Try Again
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
