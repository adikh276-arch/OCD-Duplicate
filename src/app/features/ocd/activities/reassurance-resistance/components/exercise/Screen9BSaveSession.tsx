import React from 'react';
import ScreenLayout from './ScreenLayout';
import { format } from 'date-fns';

interface SessionData {
  worryText: string;
  urgeType: string;
  timerDuration: number;
  moodEmoji: string;
  nextGoal: string;
}

interface Screen9BProps {
  sessionData: SessionData;
  onSave: () => void;
  onSkip: () => void;
}

const Screen9BSaveSession: React.FC<Screen9BProps> = ({ sessionData, onSave, onSkip }) => {
  return (
    <ScreenLayout
      buttonText="Save & View My Progress →"
      onNext={onSave}
      secondaryButton={{ text: 'Skip for now →', onClick: onSkip }}
      currentStep={9}
      totalSteps={11}
    >
      <div className="space-y-5">
        <h1 className="screen-title">Your Session is Saved 💾</h1>
        <p className="screen-text">Here's a summary of what you did today:</p>

        <div className="space-y-3">
          <div className="summary-card flex items-center gap-3">
            <span>📅</span>
            <div>
              <span className="text-xs text-muted-foreground">Date & Time</span>
              <p className="text-sm font-medium">{format(new Date(), 'MMM d, yyyy h:mm a')}</p>
            </div>
          </div>

          <div className="summary-card flex items-center gap-3">
            <span>💭</span>
            <div>
              <span className="text-xs text-muted-foreground">Your worry</span>
              <p className="text-sm font-medium">{sessionData.worryText || '—'}</p>
            </div>
          </div>

          <div className="summary-card flex items-center gap-3">
            <span>📱</span>
            <div>
              <span className="text-xs text-muted-foreground">Urge type</span>
              <p className="text-sm font-medium">{sessionData.urgeType || '—'}</p>
            </div>
          </div>

          <div className="summary-card flex items-center gap-3">
            <span>⏱️</span>
            <div>
              <span className="text-xs text-muted-foreground">Time resisted</span>
              <p className="text-sm font-medium">{sessionData.timerDuration} minutes</p>
            </div>
          </div>

          <div className="summary-card flex items-center gap-3">
            <span>😌</span>
            <div>
              <span className="text-xs text-muted-foreground">How you felt after</span>
              <p className="text-sm font-medium">{sessionData.moodEmoji || '—'}</p>
            </div>
          </div>

          <div className="summary-card flex items-center gap-3">
            <span>🎯</span>
            <div>
              <span className="text-xs text-muted-foreground">Your next goal</span>
              <p className="text-sm font-medium">{sessionData.nextGoal || '—'}</p>
            </div>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default Screen9BSaveSession;
