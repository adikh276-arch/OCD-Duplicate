import React from 'react';
import ScreenLayout from './ScreenLayout';
import { Button } from '@/components/ui/button';

interface Screen10Props {
  onViewProgress: () => void;
  onComplete: () => void;
}

const Screen10Closing: React.FC<Screen10Props> = ({ onViewProgress, onComplete }) => {
  return (
    <ScreenLayout
      currentStep={10}
      totalSteps={11}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 px-2">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
          💙
        </div>
        <h1 className="screen-title text-2xl">
          You showed up for yourself today 💙
        </h1>
        <p className="screen-text leading-relaxed">
          Whatever the urge felt like today, you chose not to feed it. That is not a small thing — that is everything.
        </p>
        <p className="screen-text leading-relaxed">
          Each time you practice this, the urge gets a little quieter. Your brain is learning something new — that it can survive uncertainty without checking. That is real, lasting change.
        </p>
      </div>

      <div className="mt-auto pt-6 space-y-3">
        <button
          onClick={onViewProgress}
          className="w-full rounded-full py-4 text-sm font-semibold border border-border bg-card text-foreground hover:bg-accent transition-colors"
        >
          View My Progress
        </button>
        <Button
          onClick={onComplete}
          className="bottom-button bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Complete ✓
        </Button>
      </div>
    </ScreenLayout>
  );
};

export default Screen10Closing;
