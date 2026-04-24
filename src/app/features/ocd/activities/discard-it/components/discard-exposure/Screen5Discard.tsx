import { useState } from "react";

interface Props {
  onNext: (action: string) => void;
}

const ACTIONS = [
  { emoji: "🗑️", label: "Binned it" },
  { emoji: "🤝", label: "Donated it" },
  { emoji: "📦", label: "Placed it outside" },
];

const Screen5Discard = ({ onNext }: Props) => {
  const [selected, setSelected] = useState("Binned it");

  return (
    <div className="min-h-screen bg-surface-blue flex flex-col items-center px-6 pt-8 pb-8" style={{ animation: "screenFade 600ms ease-in-out" }}>
      <div className="w-full max-w-[375px] flex flex-col flex-1">
        <div className="text-center mb-8">
          <p className="section-label text-accent-peach mb-2">LET IT GO 🕊️</p>
          <h1 className="text-2xl font-bold text-text-blue-primary">Take a breath. And release.</h1>
        </div>

        <div className="flex flex-col gap-3 mb-8 flex-1">
          {ACTIONS.map((action) => {
            const isSelected = selected === action.label;
            return (
              <button
                key={action.label}
                onClick={() => setSelected(action.label)}
                className={`rounded-xl px-5 py-4 text-left font-medium text-base transition-colors active:scale-[0.97] transition-transform border ${
                  isSelected
                    ? "bg-accent-coral text-text-blue-primary border-transparent"
                    : "bg-card-blue-deep text-text-blue-secondary border-[#5A8FAA]"
                }`}
              >
                {action.emoji} {action.label}
              </button>
            );
          })}
        </div>

        <p className="text-center text-text-blue-muted text-sm italic mb-8">
          "Whatever you feel — it will pass." 🌤️
        </p>

        <button
          onClick={() => onNext(selected)}
          className="w-full py-4 rounded-xl bg-text-blue-primary text-surface-blue font-semibold text-base active:scale-[0.97] transition-transform"
        >
          I Did It ✅
        </button>
      </div>
    </div>
  );
};

export default Screen5Discard;
