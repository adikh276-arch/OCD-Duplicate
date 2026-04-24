import { useState } from "react";
import { Button } from "../../components/ui/button";

const INSIGHTS = [
  { emoji: "😰", label: "A fear of forgetting" },
  { emoji: "😟", label: "A fear of not having enough" },
  { emoji: "🕰️", label: "A memory I'm not ready to lose" },
  { emoji: "🪞", label: "A part of my identity" },
  { emoji: "😔", label: "Guilt or responsibility" },
  { emoji: "❤️", label: "Love for someone" },
  { emoji: "🌫️", label: "Something I can't name yet" },
];

interface Props {
  onNext: (insight: string) => void;
}

const InsightScreen = ({ onNext }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background px-6 py-8">
      <div className="flex-1 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-foreground font-serif mb-3">
          What did you notice? 💡
        </h1>

        <p className="text-muted-foreground text-xs mb-6">
          Sometimes objects hold more than things. They hold feelings we haven't
          found another place for yet.
        </p>

        <p className="text-foreground text-sm font-serif mb-5">
          What is this object really holding for you?
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {INSIGHTS.map((item) => {
            const isSelected = selected === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setSelected(item.label)}
                className={`rounded-full border px-4 py-2 text-sm font-serif transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-card-foreground border-border"
                }`}
              >
                {item.emoji} {item.label}
              </button>
            );
          })}
        </div>

        <p className="text-muted-foreground text-xs italic">
          Naming it doesn't mean you have to act on it. Awareness itself is the
          work. 🌸
        </p>
      </div>

      {selected && (
        <div className="pt-6">
          <Button variant="journal" onClick={() => onNext(selected)}>
            I See It Now →
          </Button>
        </div>
      )}
    </div>
  );
};

export default InsightScreen;
