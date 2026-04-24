import { CalculatedCosts, formatMins } from './types';

interface Screen4Props {
  costs: CalculatedCosts;
  onStartExposure: () => void;
  onDone: () => void;
}

const Screen4Completion = ({ costs, onStartExposure, onDone }: Screen4Props) => {
  const halfDays = costs.yearlyDays / 2;
  const books = Math.floor(halfDays * 1.5);
  const hours = Math.round((halfDays * 24) / 2);

  return (
    <div className="flex flex-col min-h-screen bg-background px-5 py-6">
      <div className="flex flex-col items-center text-center mt-4">
        <span className="text-[42px] mb-4">💪</span>
        <h1 className="font-heading text-[19px] font-semibold text-foreground mb-2">
          Now you know the cost.
        </h1>
        <p className="font-body text-[12px] text-muted-foreground leading-[1.6] max-w-[280px] mb-6">
          Every ritual you resist gives you back a piece of your life.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <p className="screen-label mb-1">DAILY COST</p>
          <p className="font-heading text-[15px] font-semibold text-foreground">
            {formatMins(costs.dailyMins)}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <p className="screen-label mb-1">YEARLY COST</p>
          <p className="font-heading text-[15px] font-semibold text-primary">
            {costs.yearlyDays} days
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 mb-4">
        <p className="font-body text-[11px] font-medium text-primary mb-1">
          🌱 If you reduce rituals by just 50%…
        </p>
        <p className="font-heading text-[13px] font-semibold text-foreground mb-3">
          You get back {Math.round(halfDays)} days a year
        </p>
        <div className="flex flex-col gap-1.5">
          <p className="font-body text-[11px] text-accent-foreground">✈️ Take a week's holiday</p>
          <p className="font-body text-[11px] text-accent-foreground">📚 Read {books} books</p>
          <p className="font-body text-[11px] text-accent-foreground">💛 {hours} more hours with people you love</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3 mb-6">
        <span className="text-[24px]">🏅</span>
        <div className="flex-1">
          <p className="font-body text-[12px] font-medium text-foreground">True Cost Spotter</p>
          <p className="font-body text-[10px] text-warm-gold">Badge unlocked</p>
        </div>
        <span className="bg-chip-selected-bg text-primary font-body text-[10px] px-2 py-0.5 rounded-full">
          NEW
        </span>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={onDone}
          className="w-full bg-primary text-primary-foreground font-body text-[14px] font-medium py-3 rounded-xl"
        >
          Done for today
        </button>
      </div>
    </div>
  );
};

export default Screen4Completion;
