import { useState } from "react";

interface Props {
  onNext: (anxiety: number) => void;
}

function getEmoji(val: number) {
  if (val <= 3) return "😌";
  if (val <= 6) return "😐";
  return "😰";
}

function getLabel(val: number) {
  if (val <= 3) return "Calm";
  if (val <= 6) return "A little anxious";
  return "Still anxious — and that's okay";
}

const Screen6CheckIn = ({ onNext }: Props) => {
  const [anxiety, setAnxiety] = useState(5);

  return (
    <div className="min-h-screen bg-surface-light flex flex-col items-center px-6 pt-8 pb-8" style={{ animation: "screenFade 600ms ease-in-out" }}>
      <div className="w-full max-w-[375px] flex flex-col flex-1">
        <div className="text-center mb-8">
          <p className="section-label text-accent-coral mb-2">CHECK IN 🌡️</p>
          <h1 className="text-2xl font-bold text-text-light-primary">How do you feel now?</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="text-6xl mb-3 transition-all duration-300">{getEmoji(anxiety)}</span>
          <p className="text-text-light-primary font-semibold text-lg mb-8 transition-all duration-300">
            {getLabel(anxiety)}
          </p>

          <div className="w-full mb-2">
            <input
              type="range"
              min={0}
              max={10}
              value={anxiety}
              onChange={(e) => setAnxiety(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(var(--surface-blue)) ${anxiety * 10}%, hsl(var(--border)) ${anxiety * 10}%)`,
              }}
            />
            <div className="flex justify-between text-xs text-text-light-secondary mt-1">
              <span>0 calm</span>
              <span>10 anxious</span>
            </div>
          </div>
        </div>

        <p className="text-center text-text-light-secondary text-sm italic mb-8">
          "Whatever you feel — you did it. That's what matters."
        </p>

        <button
          onClick={() => onNext(anxiety)}
          className="w-full py-4 rounded-xl bg-surface-blue text-text-blue-primary font-semibold text-base active:scale-[0.97] transition-transform"
        >
          See How I Did →
        </button>
      </div>
    </div>
  );
};

export default Screen6CheckIn;
