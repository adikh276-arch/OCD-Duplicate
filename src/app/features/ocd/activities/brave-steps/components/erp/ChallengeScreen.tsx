import { useState } from "react";

interface ChallengeScreenProps {
  onNext: (challenge: string) => void;
}

const challenges = [
  { emoji: "🟢", label: "Touch a doorknob", difficulty: "Easy", color: "bg-green-100 text-green-700" },
  { emoji: "🟡", label: "Touch a shoe sole", difficulty: "Medium", color: "bg-amber-100 text-amber-700" },
  { emoji: "🟠", label: "Touch a dustbin lid", difficulty: "Hard", color: "bg-orange-100 text-orange-700" },
  { emoji: "🔴", label: "Touch a toilet handle", difficulty: "Very Hard", color: "bg-red-100 text-red-700" },
];

const ChallengeScreen = ({ onNext }: ChallengeScreenProps) => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="flex flex-col h-full px-5 py-6">
      <h1 className="text-bark text-xl font-medium mb-1">Choose your challenge</h1>
      <p className="text-muted-foreground text-sm mb-5">
        Pick something that feels like a stretch — not impossible.
      </p>

      <div className="flex flex-col gap-3 mb-auto">
        {challenges.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`flex items-center gap-3 p-3.5 rounded-[13px] border text-left transition-colors ${
              selected === i
                ? "border-primary bg-sandy"
                : "border-border bg-sandy-light"
            }`}
          >
            <span className="text-lg">{c.emoji}</span>
            <span className="text-bark text-sm font-medium flex-1">{c.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.color}`}>
              {c.difficulty}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => onNext(challenges[selected].label)}
        className="w-full bg-primary text-primary-foreground text-sm font-medium py-3.5 rounded-[14px] mt-5"
      >
        Start Exposure
      </button>
    </div>
  );
};

export default ChallengeScreen;
