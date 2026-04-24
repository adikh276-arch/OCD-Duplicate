// @ts-nocheck
import { useEffect, useState } from 'react';

// Mantracare authentication endpoint
const MANTRACARE_AUTH_URL = 'https://api.mantracare.com/user/user-info';

async function fetchUserFromToken(token: string): Promise<string | null> {
    try {
        const res = await fetch(MANTRACARE_AUTH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });
        if (!res.ok) return null;
        const data = await res.json();
        // Handle common user ID field names
        return data.user_id || data.userId || data.id || data.data?.id || null;
    } catch {
        return null;
    }
}

async function initializeUser(userId: string): Promise<void> {
    try {
        await fetch('/api/users/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': userId,
            },
        });
    } catch (err) {
        console.error('User initialization error:', err);
    }
}

type AuthState = 'loading' | 'authenticated';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>('loading');

    useEffect(() => {
        async function authenticate() {
            // Development bypass for localhost
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                sessionStorage.setItem('user_id', 'mock-user-localhost');
                setAuthState('authenticated');
                return;
            }

            // Already authenticated in this session
            if (sessionStorage.getItem('user_id')) {
                setAuthState('authenticated');
                return;
            }

            // Extract token from URL
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            if (!token) {
                // No token — hard redirect
                window.location.href = '/token';
                return;
            }

            const userId = await fetchUserFromToken(token);

            if (!userId) {
                // Token invalid or API error — hard redirect
                window.location.href = '/token';
                return;
            }

            // Valid user — store and clean URL
            sessionStorage.setItem('user_id', userId);
            await initializeUser(userId);

            const url = new URL(window.location.href);
            url.searchParams.delete('token');
            window.history.replaceState({}, '', url.toString());

            setAuthState('authenticated');
        }

        authenticate();
    }, []);

    if (authState === 'loading') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFF] gap-4">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
                <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">
                    Preparing your space…
                </p>
            </div>
        );
    }

    return <>{children}</>;
}
