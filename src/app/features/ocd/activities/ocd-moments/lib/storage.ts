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

const API_BASE = '/api/persistence';

export const saveEntry = async (entry: Omit<LogEntry, 'id' | 'timestamp'>): Promise<void> => {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            userId: sessionStorage.getItem('user_id'),
            activity: 'ocd-moments',
            action: 'save_entry',
            payload: entry
        }),
    });
    if (!res.ok) throw new Error('Failed to save entry');
};

export const getEntriesGroupedByDay = async (): Promise<Record<string, LogEntry[]>> => {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            userId: sessionStorage.getItem('user_id'),
            activity: 'ocd-moments',
            action: 'get_grouped_entries',
            payload: {}
        }),
    });
    if (!res.ok) throw new Error('Failed to fetch entries');
    const result = await res.json();
    return result.data;
};

export const getRecentEntriesByLocation = async (location: string, limit = 4): Promise<LogEntry[]> => {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            userId: sessionStorage.getItem('user_id'),
            activity: 'ocd-moments',
            action: 'get_recent',
            payload: { location, limit }
        }),
    });
    if (!res.ok) throw new Error('Failed to fetch recent entries');
    const result = await res.json();
    return result.data;
};

export const getWeekEntries = async (weeksAgo = 0): Promise<LogEntry[]> => {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            userId: sessionStorage.getItem('user_id'),
            activity: 'ocd-moments',
            action: 'get_week_entries',
            payload: { weeksAgo }
        }),
    });
    if (!res.ok) throw new Error('Failed to fetch week entries');
    const result = await res.json();
    return result.data;
};
