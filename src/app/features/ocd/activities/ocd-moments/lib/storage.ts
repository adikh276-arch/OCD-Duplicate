// @ts-nocheck
export interface LogEntry {
    id: string;
    timestamp: string;
    location: string;
    customLocation?: string;
    urge: string;
    response: string;
}

const getHeaders = (): Record<string, string> => {
    const userId = sessionStorage.getItem('user_id') || 'anonymous';
    return {
        'Content-Type': 'application/json',
        'x-user-id': userId,
    };
};

const API_BASE = '/api';

export const saveEntry = async (entry: Omit<LogEntry, 'id' | 'timestamp'>): Promise<void> => {
    const res = await fetch(`${API_BASE}/entries`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            location: entry.location,
            customLocation: entry.customLocation,
            urge: entry.urge,
            response: entry.response,
        }),
    });
    if (!res.ok) throw new Error('Failed to save entry');
};

export const getEntriesGroupedByDay = async (): Promise<Record<string, LogEntry[]>> => {
    const res = await fetch(`${API_BASE}/entries/grouped`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch entries');
    return res.json();
};

export const getRecentEntriesByLocation = async (location: string, limit = 4): Promise<LogEntry[]> => {
    const res = await fetch(`${API_BASE}/entries/recent?location=${encodeURIComponent(location)}&limit=${limit}`, {
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch recent entries');
    return res.json();
};

export const getWeekEntries = async (weeksAgo = 0): Promise<LogEntry[]> => {
    const res = await fetch(`${API_BASE}/entries/week?weeksAgo=${weeksAgo}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch week entries');
    return res.json();
};
