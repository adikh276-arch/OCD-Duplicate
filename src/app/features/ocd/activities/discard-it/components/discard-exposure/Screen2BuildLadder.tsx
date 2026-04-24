import { useState } from "react";
import { ALL_ITEMS, type LadderItem } from "./types";

interface Props {
  onNext: (items: LadderItem[]) => void;
}

const Screen2BuildLadder = ({ onNext }: Props) => {
  const [selected, setSelected] = useState<LadderItem[]>([]);

  const toggle = (item: LadderItem) => {
    setSelected((prev) => {
      const exists = prev.find((i) => i.label === item.label);
      if (exists) return prev.filter((i) => i.label !== item.label);
      if (prev.length >= 5) return prev;
      return [...prev, item];
    });
  };

  return (
    <div className="min-h-screen bg-surface-light flex flex-col items-center px-6 pt-8 pb-8" style={{ animation: "screenFade 600ms ease-in-out" }}>
      <div className="w-full max-w-[375px] flex flex-col flex-1">
        <div className="text-center mb-6">
          <p className="section-label text-accent-coral mb-2">STEP 01</p>
          <h1 className="text-2xl font-bold text-text-light-primary">Build your ladder 🪜</h1>
          <p className="text-text-light-secondary text-sm mt-2">Pick 5 items. We'll sort them by difficulty.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 flex-1 overflow-y-auto">
          {ALL_ITEMS.map((item) => {
            const isSelected = selected.some((s) => s.label === item.label);
            return (
              <button
                key={item.label}
                onClick={() => toggle(item)}
                className={`rounded-xl px-3 py-3 text-sm font-medium text-left transition-colors border active:scale-[0.97] transition-transform ${
                  isSelected
                    ? "bg-surface-blue text-text-blue-primary border-transparent"
                    : "bg-card-light text-text-light-primary border-[#C8DDE8]"
                }`}
              >
                {item.emoji} {item.label}
              </button>
            );
          })}
        </div>

        <p className="text-center text-accent-coral font-bold text-sm mb-1">
          {selected.length} of 5 selected
        </p>
        <p className="text-center text-text-light-secondary text-xs italic mb-6">
          Start from the bottom. Work up slowly. 🌱
        </p>

        <button
          onClick={() => selected.length === 5 && onNext(selected)}
          disabled={selected.length !== 5}
          className={`w-full py-4 rounded-xl font-semibold text-base active:scale-[0.97] transition-all ${
            selected.length === 5
              ? "bg-surface-blue text-text-blue-primary"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          Build My Ladder →
        </button>
      </div>
    </div>
  );
};

export default Screen2BuildLadder;
