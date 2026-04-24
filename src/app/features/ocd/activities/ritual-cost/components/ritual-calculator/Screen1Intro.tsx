interface Screen1Props {
  onNext: () => void;
  onBack: () => void;
}

const features = [
  { emoji: '⏱️', title: 'Track your rituals', subtitle: 'Add how many times & how long' },
  { emoji: '📊', title: 'See the real numbers', subtitle: 'Daily, weekly, and yearly cost' },
  { emoji: '🌱', title: 'See what you could reclaim', subtitle: 'Time back in your life' },
];

const Screen1Intro = ({ onNext, onBack }: Screen1Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-background px-5 py-6">
      <button
        onClick={onBack}
        className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-primary font-body text-sm mb-6 self-start"
      >
        ‹
      </button>

      <div className="flex flex-col items-center text-center mt-2">
        <span className="text-[42px] mb-4">💸</span>
        <h1 className="font-heading text-[20px] font-semibold text-foreground mb-2">
          What is OCD really costing you?
        </h1>
        <p className="font-body text-[12px] text-muted-foreground leading-[1.7] max-w-[280px] mb-8">
          Behind every ritual, there's a real price — in time, energy, and life. Let's calculate it.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-card rounded-xl border border-border p-3 flex items-start gap-3"
          >
            <span className="text-base mt-0.5">{f.emoji}</span>
            <div>
              <p className="font-body text-[12px] font-medium text-foreground">{f.title}</p>
              <p className="font-body text-[11px] text-muted-foreground">{f.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <button
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground font-body text-[14px] font-medium py-3 rounded-xl"
        >
          Calculate my cost
        </button>
      </div>
    </div>
  );
};

export default Screen1Intro;
