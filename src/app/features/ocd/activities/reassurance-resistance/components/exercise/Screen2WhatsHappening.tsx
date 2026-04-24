import React, { useState } from 'react';
import ScreenLayout from './ScreenLayout';
import PillCard from './PillCard';

interface Screen2Props {
  onNext: (worryText: string, urgeType: string) => void;
}

const urgeOptions = [
  { emoji: '📱', label: 'Google my symptoms' },
  { emoji: '👨‍⚕️', label: 'Call or visit a doctor' },
  { emoji: '🗣️', label: 'Ask someone close to me' },
  { emoji: '🔄', label: 'Check something I already checked before' },
];

const Screen2WhatsHappening: React.FC<Screen2Props> = ({ onNext }) => {
  const [worryText, setWorryText] = useState('');
  const [selectedUrge, setSelectedUrge] = useState<string | null>(null);

  return (
    <ScreenLayout
      buttonText="That's What's Happening →"
      onNext={() => onNext(worryText, selectedUrge || '')}
      buttonDisabled={!worryText.trim() || !selectedUrge}
      currentStep={1}
      totalSteps={11}
    >
      <div className="space-y-5">
        <h1 className="screen-title">First, Tell Us What's Going On</h1>
        <p className="screen-text">What worry is your mind stuck on right now?</p>

        <textarea
          value={worryText}
          onChange={(e) => setWorryText(e.target.value)}
          placeholder="Type it here — getting it out of your head is the first step"
          className="w-full rounded-2xl bg-card border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[80px]"
        />

        <p className="screen-text">What are you feeling the urge to do?</p>

        <div className="space-y-3">
          {urgeOptions.map((option) => (
            <PillCard
              key={option.label}
              selected={selectedUrge === option.label}
              onClick={() => setSelectedUrge(option.label)}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{option.emoji}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </span>
            </PillCard>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground/60">
          Your responses are saved privately to track your progress over time 🔒
        </p>
      </div>
    </ScreenLayout>
  );
};

export default Screen2WhatsHappening;
