import React, { useState, useEffect, useRef } from 'react';
import ScreenLayout from './ScreenLayout';
import PillCard from './PillCard';

interface Screen6Props {
  onNext: (duration: number) => void;
}

const timerOptions = [
  { label: '2 minutes', value: 2 },
  { label: '5 minutes', value: 5 },
  { label: '7 minutes', value: 7 },
];

const Screen6TheWait: React.FC<Screen6Props> = ({ onNext }) => {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerDone, setTimerDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (!selectedDuration) return;
    setSecondsLeft(selectedDuration * 60);
    setTimerStarted(true);
  };

  useEffect(() => {
    if (!timerStarted || timerDone) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setTimerDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerStarted, timerDone]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = (selectedDuration || 1) * 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;
  const circumference = 2 * Math.PI * 70;
  const dashOffset = circumference - (progress / 100) * circumference;

  if (timerStarted) {
    return (
      <ScreenLayout
        buttonText={timerDone ? "Timer Done →" : undefined}
        onNext={() => onNext(selectedDuration!)}
        currentStep={5}
        totalSteps={11}
      >
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <h1 className="screen-title">Stay With It</h1>

          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
              <circle
                cx="80" cy="80" r="70"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="timer-circle w-32 h-32 animate-timer-pulse">
              <span className="text-3xl font-bold text-foreground">{formatTime(secondsLeft)}</span>
            </div>
          </div>

          <p className="screen-text">
            {timerDone ? "You did it! 🎉" : "You are doing great. Just stay here."}
          </p>
        </div>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout
      buttonText={selectedDuration ? "Start Timer →" : undefined}
      onNext={startTimer}
      currentStep={5}
      totalSteps={11}
    >
      <div className="space-y-5">
        <h1 className="screen-title">Now — Don't Check. Just Wait.</h1>
        <p className="screen-text">
          Commit to sitting with this feeling without seeking reassurance. Pick your time:
        </p>

        <div className="space-y-3">
          {timerOptions.map((opt) => (
            <PillCard
              key={opt.value}
              selected={selectedDuration === opt.value}
              onClick={() => setSelectedDuration(opt.value)}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">⏱️</span>
                <span className="text-sm font-medium">{opt.label}</span>
              </span>
            </PillCard>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground/60">
          Pick what feels challenging but doable today
        </p>
      </div>
    </ScreenLayout>
  );
};

export default Screen6TheWait;
