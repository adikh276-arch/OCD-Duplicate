import { useState } from 'react';
import { CalculatedCosts, formatMins } from './types';

interface Screen3Props {
  costs: CalculatedCosts;
  onNext: () => void;
}

const Screen3CostReveal = ({ costs, onNext }: Screen3Props) => {
  const [reclaimText, setReclaimText] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-background px-5 py-6">
      <p className="screen-label mb-2">COST REVEAL</p>
      <h1 className="font-heading text-[17px] font-semibold text-foreground mb-1">
        Here's what OCD is stealing
      </h1>
      <p className="font-body text-[11px] text-muted-foreground mb-5">
        Based on your rituals today.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <p className="screen-label mb-1">PER DAY</p>
          <p className="font-heading text-[17px] font-semibold text-foreground">
            {formatMins(costs.dailyMins)}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <p className="screen-label mb-1">PER WEEK</p>
          <p className="font-heading text-[17px] font-semibold text-foreground">
            {formatMins(costs.weeklyMins)}
          </p>
        </div>
      </div>

      <div className="bg-foreground rounded-[14px] p-5 text-center mb-4">
        <p className="text-[10px] tracking-[2px] uppercase text-warm-gold mb-1">PER YEAR</p>
        <p className="font-heading text-[40px] font-semibold text-primary-foreground leading-tight">
          {costs.yearlyDays}
        </p>
        <p className="font-body text-[12px] text-warm-gold">full days</p>
      </div>

      <div className="bg-card border-l-[3px] border-l-chip-selected-border rounded-r-xl p-4 mb-4">
        <p className="font-body text-[12px] italic text-accent-foreground leading-[1.7]">
          "You are giving OCD <span className="font-medium">{costs.yearlyDays} days</span> of your year.
          What would you do with that time back?"
        </p>
      </div>

      <p className="font-body text-[11px] text-warm-gold mb-2">
        I would use that time to…
      </p>
      <input
        value={reclaimText}
        onChange={e => setReclaimText(e.target.value)}
        placeholder="Travel, learn, rest…"
        className="bg-card border border-border rounded-xl px-3 py-2.5 font-body text-[12px] italic text-foreground placeholder:text-muted-foreground outline-none mb-6"
      />

      <div className="mt-auto">
        <button
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground font-body text-[14px] font-medium py-3 rounded-xl"
        >
          Save this →
        </button>
      </div>
    </div>
  );
};

export default Screen3CostReveal;
