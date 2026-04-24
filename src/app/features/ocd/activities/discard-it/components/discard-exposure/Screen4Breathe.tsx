import { useState, useEffect, useCallback } from "react";

interface Props {
  onNext: () => void;
}

type Phase = "inhale" | "hold" | "exhale";

const PHASES: { phase: Phase; duration: number; label: string }[] = [
  { phase: "inhale", duration: 4000, label: "Breathe in… 4s" },
  { phase: "hold", duration: 2000, label: "Hold… 2s" },
  { phase: "exhale", duration: 6000, label: "Breathe out… 6s" },
];

const Screen4Breathe = ({ onNext }: Props) => {
  const [cycleCount, setCycleCount] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [ready, setReady] = useState(false);

  const currentPhase = PHASES[phaseIndex];

  const nextPhase = useCallback(() => {
    setPhaseIndex((prev) => {
      const next = prev + 1;
      if (next >= PHASES.length) {
        setCycleCount((c) => {
          const newCount = c + 1;
          if (newCount >= 3) setReady(true);
          return newCount;
        });
        return 0;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (ready) return;
    const timer = setTimeout(nextPhase, currentPhase.duration);
    return () => clearTimeout(timer);
  }, [phaseIndex, cycleCount, ready, currentPhase.duration, nextPhase]);

  const scale = currentPhase.phase === "inhale" ? "scale-100" : currentPhase.phase === "exhale" ? "scale-[0.6]" : "scale-100";

  return (
    <div className="min-h-screen bg-surface-light flex flex-col items-center px-6 pt-8 pb-8" style={{ animation: "screenFade 600ms ease-in-out" }}>
      <div className="w-full max-w-[375px] flex flex-col flex-1">
        <div className="text-center mb-8">
          <p className="section-label text-accent-coral mb-2">BREATHE FIRST 🌬️</p>
          <h1 className="text-2xl font-bold text-text-light-primary mb-2">Before you let it go, take a breath.</h1>
          <p className="text-text-light-secondary text-sm">Anxiety is high — and that's okay.</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 flex items-center justify-center mb-8">
            <div className={`absolute inset-0 rounded-full bg-[#C8DDE8] transition-transform ${scale}`} style={{ transitionDuration: `${currentPhase.duration}ms`, transitionTimingFunction: "ease-in-out" }} />
            <div className={`absolute inset-4 rounded-full bg-[#A0C4D8] transition-transform ${scale}`} style={{ transitionDuration: `${currentPhase.duration}ms`, transitionTimingFunction: "ease-in-out" }} />
            <div className={`absolute inset-8 rounded-full bg-surface-blue transition-transform ${scale}`} style={{ transitionDuration: `${currentPhase.duration}ms`, transitionTimingFunction: "ease-in-out" }} />
          </div>

          <p className="text-text-light-primary font-semibold text-lg mb-2">
            {ready ? "You're ready. 🌿" : currentPhase.label}
          </p>
          {!ready && (
            <p className="text-text-light-secondary text-sm">
              Cycle {Math.min(cycleCount + 1, 3)} of 3
            </p>
          )}
        </div>

        {ready && (
          <button
            onClick={onNext}
            className="w-full py-4 rounded-xl bg-accent-coral text-accent-foreground font-semibold text-base active:scale-[0.97] transition-transform"
            style={{ animation: "screenFade 600ms ease-in-out" }}
          >
            I'm Ready to Let It Go →
          </button>
        )}
      </div>
    </div>
  );
};

export default Screen4Breathe;
