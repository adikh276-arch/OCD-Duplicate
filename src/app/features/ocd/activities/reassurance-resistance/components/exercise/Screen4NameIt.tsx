import React, { useState } from 'react';
import ScreenLayout from './ScreenLayout';
import PillCard from './PillCard';

interface Screen4Props {
  onNext: (response: string) => void;
}

const responses = [
  { emoji: '😌', label: 'Yes, that felt grounding' },
  { emoji: '😐', label: "Kind of, I'm still anxious" },
  { emoji: '😟', label: 'Not really, the urge is very strong' },
];

const Screen4NameIt: React.FC<Screen4Props> = ({ onNext }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScreenLayout
      buttonText="Next →"
      onNext={() => onNext(selected || '')}
      buttonDisabled={!selected}
      currentStep={3}
      totalSteps={11}
    >
      <div className="space-y-5">
        <h1 className="screen-title">Call It What It Is</h1>
        <p className="screen-text">Read this slowly — out loud if you can:</p>

        <div className="rounded-2xl bg-card border border-border p-6 text-center">
          <p className="text-base font-semibold text-foreground leading-relaxed italic">
            "This is my OCD asking for reassurance. This is not a real emergency. I do not need to check."
          </p>
        </div>

        <p className="screen-text">Did that feel true, even a little?</p>

        <div className="space-y-3">
          {responses.map((r) => (
            <PillCard
              key={r.label}
              selected={selected === r.label}
              onClick={() => setSelected(r.label)}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{r.emoji}</span>
                <span className="text-sm font-medium">{r.label}</span>
              </span>
            </PillCard>
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default Screen4NameIt;
