import React, { useEffect, useState } from 'react';

interface TokenGuardProps {
  children: React.ReactNode;
}

export const TokenGuard: React.FC<TokenGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      setIsAuthenticated(true);
      return;
    }

    // Handshake protocol
    const handleMessage = (event: MessageEvent) => {
      // Security check: Only trust messages from MantraCare domains
      if (!event.origin.includes('mantracare.com')) return;

      if (event.data?.type === 'TOKEN_RESPONSE' && event.data?.user_id) {
        sessionStorage.setItem('user_id', event.data.user_id.toString());
        setIsAuthenticated(true);
      }
    };

    window.addEventListener('message', handleMessage);

    // Request token from parent
    window.parent.postMessage({ type: 'TOKEN_REQUEST' }, 'https://api.mantracare.com');

    // Timeout for local development or if handshake fails
    const timeout = setTimeout(() => {
      if (!isAuthenticated && !sessionStorage.getItem('user_id')) {
        // For development, we might want to set a dummy user_id if not in iframe
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          console.log('TokenGuard: Development mode - setting dummy user_id');
          sessionStorage.setItem('user_id', '999');
          setIsAuthenticated(true);
        } else {
          setError('Authentication timeout. Please try again within the MantraCare app.');
        }
      }
    }, 3000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-600 mb-6">{error}</p>
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

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#043570] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Securing connection...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
