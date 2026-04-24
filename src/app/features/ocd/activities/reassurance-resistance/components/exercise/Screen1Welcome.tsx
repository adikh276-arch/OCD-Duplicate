import React from 'react';
import ScreenLayout from './ScreenLayout';

interface Screen1WelcomeProps {
  onNext: () => void;
  onBack: () => void;
}

const Screen1Welcome: React.FC<Screen1WelcomeProps> = ({ onNext, onBack }) => {
  return (
    <ScreenLayout
      buttonText="Let's Begin →"
      onNext={onNext}
      showBackButton
      onBack={onBack}
      currentStep={0}
      totalSteps={11}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
          💙
        </div>
        <h1 className="screen-title text-2xl">
          Reassurance Resistance Exercise
        </h1>
        <p className="text-muted-foreground italic leading-relaxed px-2">
          "That urge to check just one more time feels so real — but you don't have to give in to it today."
        </p>
        <p className="text-xs text-muted-foreground/70">
          This will take about 5 minutes
        </p>
      </div>
    </ScreenLayout>
  );
};

export default Screen1Welcome;
