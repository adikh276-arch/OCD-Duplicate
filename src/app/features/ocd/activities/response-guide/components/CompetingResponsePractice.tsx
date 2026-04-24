import { useState, useEffect, useCallback } from "react";
import { illustrations, ClenchFists } from "./MoveIllustrations";

const MOVES = [
  "Clench both fists",
  "Press palms flat on thighs",
  "Tuck fingers under arms",
  "Hold a stress ball",
  "Press fingertips together",
  "Hold a pen or object",
] as const;

type Move = (typeof MOVES)[number];

const INSTRUCTIONS: Record<Move, string> = {
  "Clench both fists": "Curl your fingers in slowly, one by one. Feel the pressure building in your palms. Hold it firm — not painful, just present.",
  "Press palms flat on thighs": "Place both palms flat on your thighs. Press down gently. Feel the weight of your hands. Stay here.",
  "Tuck fingers under arms": "Cross your arms and tuck your fingers snugly under each arm. Feel your hands held and still.",
  "Hold a stress ball": "Wrap your fingers around the ball. Squeeze gently. Feel the resistance in your palm. Hold it steady.",
  "Press fingertips together": "Bring your fingertips together one by one — thumb to thumb, index to index. Feel each point of contact.",
  "Hold a pen or object": "Wrap your fingers loosely around the object. Feel its weight and texture. Let your hands focus here.",
};

const CUES: Record<Move, string> = {
  "Clench both fists": "Clench both fists. Feel your palms. Stay here.",
  "Press palms flat on thighs": "Press your palms down. Feel the weight. Stay here.",
  "Tuck fingers under arms": "Arms crossed, fingers tucked. Feel your hands still.",
  "Hold a stress ball": "Squeeze gently. Feel the resistance. Stay here.",
  "Press fingertips together": "Fingertips touching. Feel each point. Stay here.",
  "Hold a pen or object": "Hold it steady. Feel the weight. Stay here.",
};

// Blob component
const Blob = ({ position }: { position: "bottom-left" | "top-right" }) => (
  <div
    className={`absolute w-64 h-64 rounded-full bg-secondary opacity-60 ${
      position === "bottom-left" ? "-bottom-20 -left-20" : "-top-20 -right-20"
    }`}
  />
);

const StepIndicator = ({ step }: { step: number }) => (
  <p className="text-[11px] tracking-[0.06em] text-hint text-center mb-6">{step} OF 4</p>
);

export default function CompetingResponsePractice() {
  const [screen, setScreen] = useState(1);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((s: number) => {
    setAnimKey((k) => k + 1);
    setScreen(s);
  }, []);

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen relative overflow-hidden">
        <div key={animKey} className="animate-screen-enter min-h-screen flex flex-col">
          {screen === 1 && <Screen1 onNext={() => goTo(2)} />}
          {screen === 2 && (
            <Screen2
              selected={selectedMove}
              onSelect={setSelectedMove}
              onNext={() => goTo(3)}
            />
          )}
          {screen === 3 && selectedMove && (
            <Screen3 move={selectedMove} onNext={() => goTo(4)} />
          )}
          {screen === 4 && selectedMove && (
            <Screen4 move={selectedMove} onNext={() => goTo(5)} />
          )}
          {screen === 5 && (
            <Screen5 onPracticeAgain={() => goTo(1)} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── SCREEN 1 ─── */
function Screen1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1 px-6 relative">
      <Blob position="bottom-left" />
      <button className="text-hint text-xl mt-6 self-start z-10" aria-label="Go back">‹</button>
      <div className="flex-1 flex flex-col justify-center items-center text-center z-10">
        <p className="text-[11px] tracking-[0.06em] text-label font-medium mb-3">COMPETING RESPONSE</p>
        <h1 className="text-[22px] font-medium text-foreground mb-4">Give your hands something else to do</h1>
        <p className="text-sm text-muted-foreground leading-[1.7] mb-4">
          When the urge to pull arrives, your hands want to move. This gives them a job — one that makes pulling physically impossible.
        </p>
        <p className="text-sm text-hint leading-[1.7]">
          Pick a move. Practice it. Use it every time the urge arrives.
        </p>
      </div>
      <div className="pb-8 z-10">
        <button onClick={onNext} className="w-full h-12 rounded-[14px] bg-primary text-primary-foreground font-medium text-sm">
          Let's Begin
        </button>
      </div>
    </div>
  );
}

/* ─── SCREEN 2 ─── */
function Screen2({ selected, onSelect, onNext }: { selected: Move | null; onSelect: (m: Move) => void; onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1 px-6 pt-6">
      <StepIndicator step={2} />
      <h2 className="text-[20px] font-medium text-foreground text-center mb-2">Choose your move</h2>
      <p className="text-sm text-muted-foreground text-center mb-6">Pick the one that feels most natural. You can change it anytime.</p>
      <div className="flex flex-col gap-3 flex-1">
        {MOVES.map((move) => {
          const isSelected = selected === move;
          return (
            <button
              key={move}
              onClick={() => onSelect(move)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors duration-200 ${
                isSelected
                  ? "bg-secondary border-primary text-deep-accent"
                  : "bg-muted border-border text-muted-foreground"
              }`}
            >
              <span className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                isSelected ? "border-primary bg-primary" : "border-border"
              }`} />
              <span className="text-sm">{move}</span>
            </button>
          );
        })}
      </div>
      <div className="pb-8 pt-6">
        <button
          onClick={onNext}
          disabled={!selected}
          className="w-full h-12 rounded-[14px] bg-primary text-primary-foreground font-medium text-sm disabled:opacity-40 transition-opacity"
        >
          This Is My Move
        </button>
      </div>
    </div>
  );
}

/* ─── SCREEN 3 ─── */
function Screen3({ move, onNext }: { move: Move; onNext: () => void }) {
  const Illustration = illustrations[move];
  return (
    <div className="flex flex-col flex-1 px-6 pt-6">
      <StepIndicator step={3} />
      <h2 className="text-[20px] font-medium text-foreground text-center mb-1">Here's how to do it</h2>
      <p className="text-sm font-medium text-primary text-center mb-6">{move}</p>
      <div className="flex justify-center mb-6">
        {Illustration && <Illustration />}
      </div>
      <div className="bg-muted rounded-[10px] p-3 mb-4">
        <p className="text-sm text-muted-foreground leading-[1.7] text-center">{INSTRUCTIONS[move]}</p>
      </div>
      <p className="text-[11px] text-hint italic text-center mb-auto">
        This is your anchor. Use it every time the urge arrives.
      </p>
      <div className="pb-8 pt-6">
        <button onClick={onNext} className="w-full h-12 rounded-[14px] bg-primary text-primary-foreground font-medium text-sm">
          I'm Ready to Practice
        </button>
      </div>
    </div>
  );
}

/* ─── SCREEN 4 ─── */
function Screen4({ move, onNext }: { move: Move; onNext: () => void }) {
  const [seconds, setSeconds] = useState(60);
  const done = seconds <= 0;

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [done]);

  const mins = Math.floor(Math.max(seconds, 0) / 60);
  const secs = Math.max(seconds, 0) % 60;
  const display = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col flex-1 px-6 pt-6">
      <StepIndicator step={4} />
      <h2 className="text-[20px] font-medium text-foreground text-center mb-2">Hold it with me</h2>
      <p className="text-sm text-muted-foreground italic text-center mb-8">"{CUES[move]}"</p>

      {/* Breathing rings */}
      <div className="flex justify-center items-center mb-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full bg-muted border border-border animate-breathe" />
          {/* Middle ring */}
          <div className="absolute inset-5 rounded-full bg-secondary border border-hint" />
          {/* Inner circle */}
          <div className="absolute inset-10 rounded-full bg-card border-[1.5px] border-primary flex items-center justify-center">
            <span className="text-[13px] font-medium text-deep-accent">{display}</span>
          </div>
        </div>
      </div>

      <div className="bg-secondary rounded-[10px] p-3 mb-auto">
        <p className="text-[11px] text-label text-center">Every second you hold is a second the urge is passing.</p>
      </div>

      <div className="pb-8 pt-6">
        {done && (
          <button
            onClick={onNext}
            className="w-full h-12 rounded-[14px] bg-primary text-primary-foreground font-medium text-sm animate-screen-enter"
          >
            I'm Done
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── SCREEN 5 ─── */
function Screen5({ onPracticeAgain }: { onPracticeAgain: () => void }) {
  return (
    <div className="flex flex-col flex-1 px-6 relative">
      <Blob position="top-right" />
      <div className="flex-1 flex flex-col justify-center items-center text-center z-10">
        <div className="mb-6">
          <ClenchFists />
        </div>
        <h1 className="text-[22px] font-medium text-foreground mb-4">Your hands know what to do</h1>
        <p className="text-sm text-muted-foreground leading-[1.7] mb-4">
          You just gave your hands something else to do — and held it. Next time the urge arrives, go straight to your move.
        </p>
        <p className="text-xs text-hint italic">The faster you reach for it, the easier it gets.</p>
      </div>
      <div className="flex gap-3 pb-8 z-10">
        <button
          onClick={onPracticeAgain}
          className="flex-1 h-12 rounded-xl bg-muted border border-border text-label font-medium text-sm"
        >
          Practice Again
        </button>
        <button className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-medium text-sm">
          I'm Done
        </button>
      </div>
    </div>
  );
}
