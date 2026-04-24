export interface Ritual {
  id: string;
  emoji: string;
  name: string;
  timesPerDay: number;
  minsEach: number;
}

export interface CalculatedCosts {
  dailyMins: number;
  weeklyMins: number;
  yearlyDays: number;
}

export const DEFAULT_RITUALS: Omit<Ritual, 'timesPerDay' | 'minsEach'>[] = [
  { id: 'hand-washing', emoji: '🧼', name: 'Hand washing' },
  { id: 'long-showers', emoji: '🚿', name: 'Long showers' },
  { id: 'cleaning-surfaces', emoji: '🧹', name: 'Cleaning surfaces' },
  { id: 'changing-clothes', emoji: '👕', name: 'Changing clothes' },
  { id: 'sanitiser-use', emoji: '🧴', name: 'Sanitiser use' },
  { id: 'checking-clean', emoji: '🔁', name: 'Checking if clean' },
  { id: 'throwing-away', emoji: '🗑️', name: 'Throwing things away' },
];

export function calculateCosts(rituals: Ritual[]): CalculatedCosts {
  const dailyMins = rituals.reduce((sum, r) => sum + r.timesPerDay * r.minsEach, 0);
  return {
    dailyMins,
    weeklyMins: dailyMins * 7,
    yearlyDays: Math.round((dailyMins * 365) / 1440),
  };
}

export function formatMins(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}
