import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  timerDuration: number | null;
  onUpdate: (data: { timerDuration: number }) => void;
  onNext: () => void;
}

const TIMER_OPTIONS = [
  { minutes: 2, label: '2 minutes' },
  { minutes: 5, label: '5 minutes' },
  { minutes: 7, label: '7 minutes' },
];

const CALMING_TEXTS = [
  "You don't need certainty to be okay",
  "The anxiety will peak — and then fall",
  "You are doing something brave right now",
  "Just stay here. You are safe.",
];

const SitWithItScreen = ({ timerDuration, onUpdate, onNext }: Props) => {
  const [selected, setSelected] = useState<number | null>(timerDuration);
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerDone, setTimerDone] = useState(false);
  const [calmTextIdx, setCalmTextIdx] = useState(0);

  const totalSeconds = selected ? selected * 60 : 0;

  const startTimer = useCallback(() => {
    if (!selected) return;
    onUpdate({ timerDuration: selected });
    setSecondsLeft(selected * 60);
    setTimerActive(true);
  }, [selected, onUpdate]);

  useEffect(() => {
    if (!timerActive || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          setTimerDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, secondsLeft]);

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setCalmTextIdx(prev => (prev + 1) % CALMING_TEXTS.length);
    }, 30000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = totalSeconds > 0 ? (totalSeconds - secondsLeft) / totalSeconds : 0;

  if (timerActive || timerDone) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center min-h-screen px-6 pb-8"
      >
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          <div className="relative">
            <motion.div
              animate={timerDone ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.6, repeat: timerDone ? 2 : 0 }}
              className="w-48 h-48 rounded-full flex items-center justify-center relative"
            >
              <svg className="w-48 h-48 absolute" viewBox="0 0 192 192">
                <circle
                  cx="96" cy="96" r="88"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="96" cy="96" r="88"
                  fill="none"
                  stroke="hsl(var(--sage))"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={553}
                  strokeDashoffset={553 * (1 - progress)}
                  transform="rotate(-90 96 96)"
                  className="transition-all duration-1000"
                />
              </svg>
              {!timerDone && (
                <div className="absolute inset-0 rounded-full timer-glow animate-gentle-pulse" />
              )}
              <span className="text-3xl font-bold text-foreground z-10">
                {timerDone ? '✓' : formatTime(secondsLeft)}
              </span>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={timerDone ? 'done' : calmTextIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-center text-muted-foreground italic text-base max-w-[260px]"
            >
              {timerDone ? "You did it. Well done. 🌟" : CALMING_TEXTS[calmTextIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {timerDone && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={onNext}
            className="btn-primary-activity"
          >
            I Did It →
          </motion.button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col min-h-screen px-6 pt-8 pb-8"
    >
      <div className="flex-1 space-y-6">
        <h1 className="text-xl font-bold text-foreground text-center">
          Just Be Here for a Moment
        </h1>

        <p className="text-center text-muted-foreground leading-relaxed">
          Choose how long you'll sit with this uncertainty today — no checking, no googling, just being:
        </p>

        <div className="space-y-3">
          {TIMER_OPTIONS.map(opt => (
            <button
              key={opt.minutes}
              onClick={() => setSelected(opt.minutes)}
              className={`pill-card w-full text-left text-lg font-medium ${
                selected === opt.minutes ? 'pill-card-selected' : ''
              }`}
            >
              ⏱️ {opt.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={startTimer}
            className="btn-primary-activity"
          >
            Start Timer →
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SitWithItScreen;
