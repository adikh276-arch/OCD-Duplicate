import { useState, useEffect, useRef } from "react";

interface TimerScreenProps {
  onNext: (anxiety: number, duration: number) => void;
}

const durations = [
  { emoji: "⚡", mins: 2, label: "Quick" },
  { emoji: "🔥", mins: 5, label: "Standard" },
  { emoji: "💪", mins: 7, label: "Challenge" },
];

const TimerScreen = ({ onNext }: TimerScreenProps) => {
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [anxiety, setAnxiety] = useState(4);
  const [secondsLeft, setSecondsLeft] = useState(durations[1].mins * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = durations[selectedDuration].mins * 60;

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setDone(true);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const handleSelectDuration = (i: number) => {
    if (running || done) return;
    setSelectedDuration(i);
    setSecondsLeft(durations[i].mins * 60);
  };

  const startTimer = () => {
    if (!running && !done) {
      setRunning(true);
    }
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progress = 1 - secondsLeft / totalSeconds;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col h-full px-5 py-6">
      <h1 className="text-bark text-xl font-medium mb-1">Choose your duration</h1>
      <p className="text-muted-foreground text-sm mb-4">Pick how long you'll hold on.</p>

      <div className="flex gap-2 mb-5">
        {durations.map((d, i) => (
          <button
            key={i}
            onClick={() => handleSelectDuration(i)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-[13px] border text-xs font-medium transition-colors ${
              selectedDuration === i
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-sandy-light text-bark border-border"
            }`}
          >
            <span>{d.emoji}</span>
            <span>{d.mins} min</span>
            <span className="text-[10px] opacity-70">{d.label}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-4" onClick={startTimer}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="hsl(35, 25%, 82%)" strokeWidth="8" />
          <circle
            cx="70" cy="70" r={radius} fill="none"
            stroke="hsl(24, 41%, 39%)" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 70 70)"
            className="transition-all duration-1000"
          />
          <text x="70" y="66" textAnchor="middle" className="fill-bark text-2xl font-medium" fontSize="24">
            {mins}:{secs.toString().padStart(2, "0")}
          </text>
          {!running && !done && (
            <text x="70" y="84" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
              tap to start
            </text>
          )}
        </svg>
      </div>

      <div className="bg-sandy-light rounded-[13px] border-l-[3px] border-primary px-4 py-3 mb-4">
        <p className="text-muted-foreground text-xs italic leading-relaxed">
          Discomfort is not danger. The urge will peak — then pass.
        </p>
      </div>

      <p className="text-bark text-xs font-medium mb-2">How's your anxiety right now?</p>
      <div className="flex gap-1.5 mb-1">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <button
            key={n}
            onClick={() => setAnxiety(n)}
            className={`flex-1 aspect-square flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
              anxiety === n
                ? "bg-primary text-primary-foreground"
                : "bg-sandy text-bark border border-border"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground mb-auto">
        <span>calm</span>
        <span>intense</span>
      </div>

      <button
        onClick={() => done && onNext(anxiety, durations[selectedDuration].mins)}
        className={`w-full text-sm font-medium py-3.5 rounded-[14px] mt-5 transition-opacity ${
          done
            ? "bg-primary text-primary-foreground"
            : "bg-primary/40 text-primary-foreground/60 cursor-not-allowed"
        }`}
        disabled={!done}
      >
        I Did It ✅
      </button>
      {!done && (
        <p className="text-center text-[10px] text-muted-foreground mt-1">
          Unlocks when timer ends
        </p>
      )}
    </div>
  );
};

export default TimerScreen;
