import React, { useState, useEffect, useCallback } from 'react';
import ScreenLayout from './ScreenLayout';

interface Screen3Props {
  onNext: () => void;
}

type BreathPhase = 'in' | 'hold' | 'out';

const Screen3Breathing: React.FC<Screen3Props> = ({ onNext }) => {
  const [breathCount, setBreathCount] = useState(1);
  const [phase, setPhase] = useState<BreathPhase>('in');
  const [completed, setCompleted] = useState(false);
  const [scale, setScale] = useState(0.6);

  const runBreathCycle = useCallback(() => {
    let currentBreath = 1;

    const cycle = (breath: number) => {
      if (breath > 3) {
        setCompleted(true);
        return;
      }
      setBreathCount(breath);

      // Breathe In - 4s
      setPhase('in');
      setScale(0.6);
      requestAnimationFrame(() => setScale(1));

      setTimeout(() => {
        // Hold - 2s
        setPhase('hold');

        setTimeout(() => {
          // Breathe Out - 4s
          setPhase('out');
          setScale(1);
          requestAnimationFrame(() => setScale(0.6));

          setTimeout(() => {
            cycle(breath + 1);
          }, 4000);
        }, 2000);
      }, 4000);
    };

    cycle(1);
  }, []);

  useEffect(() => {
    runBreathCycle();
  }, [runBreathCycle]);

  const phaseText = phase === 'in' ? 'Breathe In' : phase === 'hold' ? 'Hold' : 'Breathe Out';

  return (
    <ScreenLayout
      buttonText={completed ? "I've Breathed →" : undefined}
      onNext={onNext}
      currentStep={2}
      totalSteps={11}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <h1 className="screen-title">Before Anything Else — Just Breathe</h1>
        <p className="screen-text">Follow the animation and take 3 slow breaths with us</p>

        <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
          <div
            className="breath-circle animate-pulse-soft"
            style={{
              width: 160,
              height: 160,
              transform: `scale(${scale})`,
              transition: phase === 'hold' ? 'none' : `transform ${phase === 'in' ? 4 : 4}s ease-in-out`,
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold text-foreground">{phaseText}</span>
          </div>
        </div>

        <p className="text-sm font-medium text-muted-foreground">
          Breath {Math.min(breathCount, 3)} of 3
        </p>

        <p className="text-xs text-muted-foreground/70">
          Let your body settle before we move forward
        </p>
      </div>
    </ScreenLayout>
  );
};

export default Screen3Breathing;
