import type { LadderItem } from "./types";

interface Props {
  item: LadderItem;
  stepNumber: number;
  onNext: () => void;
}

const Screen3TodaysItem = ({ item, stepNumber, onNext }: Props) => (
  <div className="min-h-screen bg-surface-light flex flex-col items-center px-6 pt-8 pb-8" style={{ animation: "screenFade 600ms ease-in-out" }}>
    <div className="w-full max-w-[375px] flex flex-col flex-1">
      <div className="text-center mb-8">
        <p className="section-label text-accent-coral mb-2">TODAY ✨</p>
        <p className="text-text-light-secondary text-sm">Step {stepNumber} of 5</p>
      </div>

      <div className="bg-surface-blue rounded-2xl p-8 flex flex-col items-center text-center mb-8">
        <span className="text-5xl mb-4">{item.emoji}</span>
        <h2 className="text-2xl font-bold text-text-blue-primary">{item.label}</h2>
      </div>

      <div className="accent-line bg-accent-coral mb-6" />

      <div className="text-center flex-1">
        <p className="text-[#4A6A80] text-base leading-relaxed mb-3">
          Find one. Pick it up. Hold it in your hands.
        </p>
        <p className="text-text-light-secondary text-sm italic">
          Notice what comes up. You don't have to make it go away.
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-surface-blue text-text-blue-primary font-semibold text-base active:scale-[0.97] transition-transform"
      >
        I'm Holding It →
      </button>
    </div>
  </div>
);

export default Screen3TodaysItem;
