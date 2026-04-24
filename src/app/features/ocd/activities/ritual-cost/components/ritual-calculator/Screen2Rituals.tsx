import { useState } from 'react';
import { Ritual, DEFAULT_RITUALS, formatMins } from './types';

interface Screen2Props {
  rituals: Ritual[];
  setRituals: (r: Ritual[]) => void;
  onNext: () => void;
}

const Screen2Rituals = ({ rituals, setRituals, onNext }: Screen2Props) => {
  const [stateB, setStateB] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(rituals.map(r => r.id)));
  const [customRituals, setCustomRituals] = useState<{ id: string; emoji: string; name: string }[]>([]);
  const [customInput, setCustomInput] = useState('');

  const allRitualDefs = [...DEFAULT_RITUALS, ...customRituals];

  const toggleRitual = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const addCustom = () => {
    if (!customInput.trim()) return;
    const id = `custom-${Date.now()}`;
    const newR = { id, emoji: '⚙️', name: customInput.trim() };
    setCustomRituals(prev => [...prev, newR]);
    setSelectedIds(prev => new Set(prev).add(id));
    setCustomInput('');
  };

  const goToStateB = () => {
    const selected = allRitualDefs
      .filter(r => selectedIds.has(r.id))
      .map(r => {
        const existing = rituals.find(ex => ex.id === r.id);
        return existing || { ...r, timesPerDay: 1, minsEach: 5 };
      });
    setRituals(selected);
    setStateB(true);
  };

  const updateRitual = (id: string, field: 'timesPerDay' | 'minsEach', delta: number) => {
    setRituals(
      rituals.map(r =>
        r.id === id ? { ...r, [field]: Math.max(field === 'timesPerDay' ? 1 : 1, r[field] + delta) } : r
      )
    );
  };

  const totalDailyMins = rituals.reduce((s, r) => s + r.timesPerDay * r.minsEach, 0);

  if (!stateB) {
    return (
      <div className="flex flex-col min-h-screen bg-background px-5 py-6">
        <p className="screen-label mb-2">SELECT RITUALS</p>
        <h1 className="font-heading text-[17px] font-semibold text-foreground mb-1">
          Which rituals do you do?
        </h1>
        <p className="font-body text-[11px] text-muted-foreground mb-5">
          Tap all that apply. Be honest — no one is watching.
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {allRitualDefs.map(r => {
            const sel = selectedIds.has(r.id);
            return (
              <button
                key={r.id}
                onClick={() => toggleRitual(r.id)}
                className={`font-body text-[11px] py-[7px] px-[11px] rounded-lg border transition-colors ${
                  sel
                    ? 'bg-chip-selected-bg border-chip-selected-border text-accent-foreground font-medium'
                    : 'bg-background border-chip-border text-medium-brown'
                }`}
              >
                {r.emoji} {r.name}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 mb-3">
          <input
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustom()}
            placeholder="➕ Add your own ritual…"
            className="flex-1 bg-background border border-dashed border-chip-selected-border rounded-[10px] px-3 py-2 font-body text-[11px] text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        <p className="font-body text-[11px] text-warm-gold mb-6">
          {selectedIds.size} selected
        </p>

        <div className="mt-auto">
          <button
            onClick={goToStateB}
            disabled={selectedIds.size === 0}
            className="w-full bg-primary text-primary-foreground font-body text-[14px] font-medium py-3 rounded-xl disabled:opacity-40"
          >
            Set times →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background px-5 py-6">
      <p className="screen-label mb-2">SET TIME</p>
      <h1 className="font-heading text-[17px] font-semibold text-foreground mb-1">
        How long do you spend?
      </h1>
      <p className="font-body text-[11px] text-muted-foreground mb-5">
        Adjust for each selected ritual.
      </p>

      <div className="flex flex-col gap-3 mb-4 flex-1 overflow-y-auto">
        {rituals.map(r => {
          const minsDay = r.timesPerDay * r.minsEach;
          return (
            <div key={r.id} className="bg-card border border-border rounded-xl p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-[12px] font-medium text-foreground">
                  {r.emoji} {r.name}
                </span>
                <span className="bg-chip-selected-bg text-primary font-body text-[10px] px-2 py-0.5 rounded-full">
                  {minsDay} min/day
                </span>
              </div>
              <div className="flex gap-4">
                <Stepper label="Times/day" value={r.timesPerDay} onChange={d => updateRitual(r.id, 'timesPerDay', d)} />
                <Stepper label="Mins each" value={r.minsEach} onChange={d => updateRitual(r.id, 'minsEach', d)} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-foreground rounded-xl p-3 flex items-center justify-between mb-4">
        <span className="font-body text-[11px] text-warm-gold">Total today</span>
        <span className="font-body text-[16px] font-medium text-primary-foreground">
          {formatMins(totalDailyMins)}
        </span>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-primary text-primary-foreground font-body text-[14px] font-medium py-3 rounded-xl"
      >
        Show my cost →
      </button>
    </div>
  );
};

function Stepper({ label, value, onChange }: { label: string; value: number; onChange: (d: number) => void }) {
  return (
    <div className="flex-1">
      <p className="font-body text-[10px] text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(-1)}
          className="w-7 h-7 rounded-md bg-background border border-chip-border text-primary font-body text-sm flex items-center justify-center"
        >
          −
        </button>
        <span className="font-body text-[13px] font-medium text-foreground min-w-[20px] text-center">
          {value}
        </span>
        <button
          onClick={() => onChange(1)}
          className="w-7 h-7 rounded-md bg-background border border-chip-border text-primary font-body text-sm flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Screen2Rituals;
