import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useActivityDB } from '@/app/features/ocd/hooks/useActivityDB';

interface Session {
  id: string;
  created_at: string;
  worry_text: string | null;
  reassurance_urge_type: string | null;
  timer_duration: number | null;
  mood_emoji: string | null;
  reflection_note: string | null;
  next_time_goal: string | null;
}

interface ProgressDashboardProps {
  onBack: () => void;
}

const emojiOrder = ['😰', '😟', '😐', '🙂', '😌'];

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ onBack }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const { executeQuery } = useActivityDB("reassurance-resistance");

  useEffect(() => {
    const fetchSessions = async () => {
      const data = await executeQuery("get_sessions", {});
      setSessions(data || []);
      setLoading(false);
    };
    fetchSessions();
  }, [executeQuery]);

  if (loading) {
    return (
      <div className="screen-container items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate stats
  const totalSessions = sessions.length;
  const maxDuration = Math.max(...sessions.map(s => s.timer_duration || 0), 7);

  // Urge frequency
  const urgeMap: Record<string, number> = {};
  sessions.forEach(s => {
    if (s.reassurance_urge_type) {
      urgeMap[s.reassurance_urge_type] = (urgeMap[s.reassurance_urge_type] || 0) + 1;
    }
  });

  const urgeIcons: Record<string, string> = {
    'Google my symptoms': '📱',
    'Call or visit a doctor': '👨‍⚕️',
    'Ask someone close to me': '🗣️',
    'Check something I already checked before': '🔄',
  };

  return (
    <div className="screen-container">
      <h1 className="screen-title text-xl mb-6">My Reassurance Resistance Journey</h1>

      {totalSessions === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <p className="text-4xl">🌱</p>
          <p className="screen-text">No completed sessions yet. Complete your first exercise to see progress!</p>
        </div>
      ) : (
        <div className="space-y-8 flex-1 overflow-y-auto pb-4">
          {/* Streak */}
          <section className="text-center space-y-2">
            <p className="screen-text">You have completed this exercise:</p>
            <p className="text-5xl font-bold text-primary">{totalSessions}</p>
            <p className="text-sm text-muted-foreground">
              {totalSessions === 1 ? 'time' : 'times'} — Keep going! 🔥
            </p>
          </section>

          {/* Resistance Time Growth */}
          <section className="space-y-3">
            <p className="screen-text font-semibold text-foreground">How long you resisted over time:</p>
            <div className="flex items-end justify-center gap-2 h-32">
              {sessions.slice(-10).map((s, i) => {
                const height = ((s.timer_duration || 0) / maxDuration) * 100;
                return (
                  <div key={s.id} className="flex flex-col items-center gap-1" style={{ flex: 1, maxWidth: 32 }}>
                    <span className="text-[10px] text-muted-foreground">{s.timer_duration}m</span>
                    <div
                      className="w-full rounded-t-lg bg-primary/60 transition-all"
                      style={{ height: `${Math.max(height, 10)}%` }}
                    />
                    <span className="text-[9px] text-muted-foreground/60">
                      {format(new Date(s.created_at), 'M/d')}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Mood Trend */}
          <section className="space-y-3">
            <p className="screen-text font-semibold text-foreground">How you felt after each session:</p>
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              {sessions.slice(-10).map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-1 min-w-[36px]">
                  <span className="text-xl">{s.mood_emoji || '😐'}</span>
                  <span className="text-[9px] text-muted-foreground/60">
                    {format(new Date(s.created_at), 'M/d')}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Most Common Urge */}
          <section className="space-y-3">
            <p className="screen-text font-semibold text-foreground">What you most often felt like doing:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(urgeMap).map(([urge, count]) => (
                <div key={urge} className="rounded-full bg-card border border-border px-3 py-1.5 text-xs font-medium flex items-center gap-1.5">
                  <span>{urgeIcons[urge] || '📱'}</span>
                  <span>{urge}</span>
                  <span className="text-primary font-bold">— {count}×</span>
                </div>
              ))}
            </div>
          </section>

          {/* Past Session Notes */}
          <section className="space-y-3">
            <p className="screen-text font-semibold text-foreground">Your reflections over time:</p>
            <div className="space-y-2">
              {sessions.slice().reverse().slice(0, 10).map((s) => (
                <div key={s.id} className="summary-card space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>📅</span>
                    <span>{format(new Date(s.created_at), 'MMM d, yyyy')}</span>
                    <span className="ml-auto">{s.mood_emoji}</span>
                  </div>
                  {s.worry_text && (
                    <p className="text-xs"><span className="text-muted-foreground">💭</span> {s.worry_text}</p>
                  )}
                  {s.reflection_note && (
                    <p className="text-xs"><span className="text-muted-foreground">📝</span> {s.reflection_note}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      <div className="mt-auto pt-4">
        <Button onClick={onBack} className="bottom-button bg-primary text-primary-foreground hover:bg-primary/90">
          Back to Activity →
        </Button>
      </div>
    </div>
  );
};

export default ProgressDashboard;
