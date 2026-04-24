// @ts-nocheck
import { useEffect, useState } from 'react';
import sql from '../lib/db';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isPreparing, setIsPreparing] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      const storedUserId = sessionStorage.getItem('user_id');

      if (storedUserId) {
        setIsPreparing(false);
        return;
      }

      if (!token) {
        const pathSegments = window.location.pathname.split('/').filter(p => p && p !== 'token');
        const basePath = pathSegments.length > 0 ? '/' + pathSegments[0] : '/one_thing_out';
        window.location.href = `${basePath}/token`;
        return;
      }

      try {
        const response = await fetch('https://api.mantracare.com/user/user-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error('Handshake failed');
        }

        const data = await response.json();
        const userId = data.user_id;

        if (!userId) {
          throw new Error('No user_id returned');
        }

        // Store user_id in sessionStorage
        sessionStorage.setItem('user_id', userId);

        // Upsert user into users table
        await sql`
          INSERT INTO users (id)
          VALUES (${userId})
          ON CONFLICT (id) DO NOTHING
        `;

        // Clean URL
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, '', newUrl);

        setIsPreparing(false);
      } catch (error) {
        console.error('Auth error:', error);
        const pathSegments = window.location.pathname.split('/').filter(p => p && p !== 'token');
        const basePath = pathSegments.length > 0 ? '/' + pathSegments[0] : '/one_thing_out';
        window.location.href = `${basePath}/token`;
      }
    };

    handleAuth();
  }, []);

  if (isPreparing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="font-serif text-xl text-foreground/80 animate-pulse">Preparing...</p>
      </div>
    );
  }

  return <>{children}</>;
}
