import { useState, useCallback } from 'react';

export interface SessionData {
  id: string;
  date: string;
  uncertaintyText: string;
  discomfortBefore: number | null;
  discomfortAfter: number | null;
  timerDuration: number | null;
  statementsChecked: string[];
  reflectionNote: string;
}

const STORAGE_KEY = 'uncertainty-exercise-sessions';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function getSavedSessions(): SessionData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: SessionData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function useActivitySession() {
  const [session, setSession] = useState<SessionData>({
    id: generateId(),
    date: new Date().toISOString(),
    uncertaintyText: '',
    discomfortBefore: null,
    discomfortAfter: null,
    timerDuration: null,
    statementsChecked: [],
    reflectionNote: '',
  });

  const update = useCallback((partial: Partial<SessionData>) => {
    setSession(prev => ({ ...prev, ...partial }));
  }, []);

  const complete = useCallback(() => {
    const finalSession = { ...session, date: new Date().toISOString() };
    const all = getSavedSessions();
    all.push(finalSession);
    saveSessions(all);
    return finalSession;
  }, [session]);

  return { session, update, complete };
}
