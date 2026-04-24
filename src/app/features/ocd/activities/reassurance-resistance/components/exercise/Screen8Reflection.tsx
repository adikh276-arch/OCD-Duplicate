import React, { useState } from 'react';
import ScreenLayout from './ScreenLayout';

interface Screen8Props {
  onNext: (emoji: string, note: string) => void;
}

const emojis = ['😰', '😟', '😐', '🙂', '😌'];

const Screen8Reflection: React.FC<Screen8Props> = ({ onNext }) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [note, setNote] = useState('');

  return (
    <ScreenLayout
      buttonText="Almost Done →"
      onNext={() => onNext(selectedEmoji || '', note)}
      buttonDisabled={!selectedEmoji}
      currentStep={7}
      totalSteps={11}
    >
      <div className="space-y-6">
        <h1 className="screen-title">How Are You Feeling Now?</h1>
        <p className="screen-text">Compare how you feel now vs when you started</p>

        <div className="flex items-center justify-center gap-4">
          {emojis.map((e) => (
            <button
              key={e}
              onClick={() => setSelectedEmoji(e)}
              className={`emoji-option ${selectedEmoji === e ? 'emoji-option-selected' : ''}`}
            >
              {e}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground text-center block">
            Anything you want to note about this experience?
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write here (optional)"
            className="w-full rounded-2xl bg-card border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[80px]"
          />
        </div>
      </div>
    </ScreenLayout>
  );
};

export default Screen8Reflection;
