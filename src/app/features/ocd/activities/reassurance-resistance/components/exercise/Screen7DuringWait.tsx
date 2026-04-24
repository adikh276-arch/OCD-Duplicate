import React, { useState } from 'react';
import ScreenLayout from './ScreenLayout';

interface Screen7Props {
  onNext: () => void;
}

const statements = [
  { emoji: '🌊', text: 'The anxiety feels like a wave — it rises and falls' },
  { emoji: '💨', text: 'My breathing is slowing down a little' },
  { emoji: '🧠', text: "The urge is still there but I haven't acted on it" },
  { emoji: '💪', text: 'I am sitting with this and I am okay' },
];

const Screen7DuringWait: React.FC<Screen7Props> = ({ onNext }) => {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <ScreenLayout
      buttonText="Timer Done →"
      onNext={onNext}
      currentStep={6}
      totalSteps={11}
    >
      <div className="space-y-5">
        <h1 className="screen-title">Stay Here With Us 💙</h1>
        <p className="screen-text">While you wait, tap each one as it feels true:</p>

        <div className="space-y-3">
          {statements.map((s, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              className={`pill-card flex items-center gap-3 ${checked.has(i) ? 'pill-card-selected' : ''}`}
            >
              <span className="text-lg">{s.emoji}</span>
              <span className="text-sm font-medium flex-1">{s.text}</span>
              {checked.has(i) && (
                <span className="text-primary text-lg">✓</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground/60">
          Tap each one when it feels true for you
        </p>
      </div>
    </ScreenLayout>
  );
};

export default Screen7DuringWait;
