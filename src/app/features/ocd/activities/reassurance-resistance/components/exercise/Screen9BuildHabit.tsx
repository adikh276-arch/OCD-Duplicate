import React, { useState } from 'react';
import ScreenLayout from './ScreenLayout';
import PillCard from './PillCard';

interface Screen9Props {
  onNext: (goal: string) => void;
}

const goals = [
  { emoji: '⏱️', label: "I'll try 2 minutes next time" },
  { emoji: '⏱️', label: "I'll try 5 minutes next time" },
  { emoji: '⏱️', label: "I'll try 7 minutes next time" },
];

const Screen9BuildHabit: React.FC<Screen9Props> = ({ onNext }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScreenLayout
      buttonText="Almost There →"
      onNext={() => onNext(selected || '')}
      buttonDisabled={!selected}
      currentStep={8}
      totalSteps={11}
    >
      <div className="space-y-5">
        <h1 className="screen-title">Every Time Gets a Little Easier</h1>
        <p className="screen-text">
          Each time you practice this, the urge gets a little quieter. Set your goal for next time:
        </p>

        <div className="space-y-3">
          {goals.map((g) => (
            <PillCard
              key={g.label}
              selected={selected === g.label}
              onClick={() => setSelected(g.label)}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{g.emoji}</span>
                <span className="text-sm font-medium">{g.label}</span>
              </span>
            </PillCard>
          ))}
        </div>

        <p className="screen-text text-xs">
          Over time your brain learns that uncertainty is survivable — and the urge to check begins to lose its grip.
        </p>
      </div>
    </ScreenLayout>
  );
};

export default Screen9BuildHabit;
