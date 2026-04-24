import { useState } from "react";
import { Button } from "../components/ui/button";

const PROMPTS = [
  "When did this object come into your life? What was happening then?",
  "What do you imagine would happen if this object was gone tomorrow?",
  "Does this object remind you of a person, a time, or a version of yourself?",
  "What does keeping this object protect you from?",
];

interface Props {
  onNext: () => void;
}

const ExplorationScreen = ({ onNext }: Props) => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(4).fill(""));

  const hasAnyAnswer = answers.some((a) => a.trim().length > 0);

  return (
    <div className="flex flex-col min-h-screen bg-background px-6 py-8">
      <div className="flex-1 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-foreground font-serif mb-2">
          Let's explore this together. 🔍
        </h1>

        <p className="text-muted-foreground text-xs italic mb-8">
          Answer whichever feels right. You can skip any.
        </p>

        <div className="w-full rounded-2xl border border-border bg-card p-5 mb-4">
          <p className="text-card-foreground text-sm font-serif mb-4 leading-relaxed">
            {PROMPTS[currentPrompt]}
          </p>

          <textarea
            value={answers[currentPrompt]}
            onChange={(e) => {
              const updated = [...answers];
              updated[currentPrompt] = e.target.value;
              setAnswers(updated);
            }}
            placeholder="Write freely — this is just for you. 💭"
            rows={5}
            className="w-full rounded-xl bg-background border-none px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none resize-none font-serif"
          />

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setCurrentPrompt((p) => Math.max(0, p - 1))}
              disabled={currentPrompt === 0}
              className="text-muted-foreground text-sm disabled:opacity-30"
            >
              ← back
            </button>
            <span className="text-primary text-xs font-medium">
              {currentPrompt + 1} of {PROMPTS.length}
            </span>
            <button
              onClick={() =>
                setCurrentPrompt((p) => Math.min(PROMPTS.length - 1, p + 1))
              }
              disabled={currentPrompt === PROMPTS.length - 1}
              className="text-muted-foreground text-sm disabled:opacity-30"
            >
              next →
            </button>
          </div>
        </div>
      </div>

      {hasAnyAnswer && (
        <div className="pt-6">
          <Button variant="journal" onClick={onNext}>
            I've Reflected Enough →
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExplorationScreen;
