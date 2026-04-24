import { useState, useEffect } from "react";

const BreathingHeart = () => {
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p === "inhale" ? "exhale" : "inhale"));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="animate-heartbeat">
        <svg width="80" height="72" viewBox="0 0 80 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="heartGrad" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#D4F5E4" />
              <stop offset="40%" stopColor="#A8DFBF" />
              <stop offset="100%" stopColor="#6DBF94" />
            </radialGradient>
            <radialGradient id="heartHighlight" cx="30%" cy="25%" r="30%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <path
            d="M40 66C40 66 6 46 6 24C6 12 16 4 26 4C32 4 37 7 40 12C43 7 48 4 54 4C64 4 74 12 74 24C74 46 40 66 40 66Z"
            fill="url(#heartGrad)"
          />
          <path
            d="M40 66C40 66 6 46 6 24C6 12 16 4 26 4C32 4 37 7 40 12C43 7 48 4 54 4C64 4 74 12 74 24C74 46 40 66 40 66Z"
            fill="url(#heartHighlight)"
          />
          <path
            d="M26 8C18 8 10 14 10 24C10 28 12 33 16 38"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      <p
        className="text-[10px] text-primary italic text-center transition-opacity duration-500"
        style={{ opacity: 1 }}
      >
        {phase === "inhale" ? "inhale…" : "exhale…"}
      </p>
    </div>
  );
};

interface ScreenProps {
  children: React.ReactNode;
}

const Screen = ({ children }: ScreenProps) => (
  <div className="screen-transition-enter flex flex-col min-h-screen">
    {children}
  </div>
);

const StepPill = ({ step, label }: { step: number; label: string }) => (
  <div className="flex justify-center mb-6">
    <span className="inline-block bg-secondary text-success rounded-[20px] px-3 py-1 text-[9px] font-medium">
      {step} of 3 — {label}
    </span>
  </div>
);

const PrimaryButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full bg-primary text-primary-foreground rounded-[14px] h-[50px] text-sm font-medium transition-colors hover:opacity-90"
  >
    {children}
  </button>
);

export default function SelfCompassionBreak() {
  const [screen, setScreen] = useState(1);
  const [selectedPhrase, setSelectedPhrase] = useState<number | null>(null);
  const [personName, setPersonName] = useState("");
  const [transitioning, setTransitioning] = useState(false);

  const goTo = (s: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(s);
      setTransitioning(false);
    }, 100);
  };

  const phrases = [
    "💪 I'm trying my best",
    "🦋 This doesn't define me",
    "🤝 I'm not alone in this",
    "🌅 Tomorrow is a fresh start",
  ];

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[390px] px-6 relative" style={{ opacity: transitioning ? 0 : 1, transition: "opacity 200ms" }}>
        {screen === 1 && (
          <Screen>
            {/* Back button */}
            <div className="pt-6">
              <button className="text-[13px] text-hint">&lt;</button>
            </div>

            {/* Centered content */}
            <div className="flex-1 flex flex-col justify-center relative">
              {/* Blob */}
              <div
                className="absolute -bottom-10 -right-6 w-48 h-48 rounded-full bg-secondary opacity-60"
                style={{ filter: "blur(40px)" }}
              />

              <p className="text-[10px] text-muted-foreground tracking-[0.07em] uppercase mb-3">
                🧘 SELF COMPASSION BREAK
              </p>
              <h1 className="text-[19px] font-medium text-foreground leading-[1.3] mb-4">
                A moment of kindness for yourself 💛
              </h1>
              <p className="text-[11px] text-muted-foreground leading-[1.7] mb-6">
                Something just happened. Before you move on — take 2 minutes. Not to fix it. Just to be gentle with yourself about it.
              </p>
              <div className="bg-secondary rounded-[14px] px-3.5 py-3">
                <p className="text-[10px] text-success">
                  ✨ 3 small steps. Each one takes less than a minute.
                </p>
              </div>
            </div>

            {/* Bottom button */}
            <div className="pb-8 pt-6">
              <PrimaryButton onClick={() => goTo(2)}>I'm Ready 🌿</PrimaryButton>
            </div>
          </Screen>
        )}

        {screen === 2 && (
          <Screen>
            <div className="pt-6">
              <StepPill step={1} label="Acknowledge" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-[17px] font-medium text-foreground text-center mb-2">
                Place your hand on your chest 🤲
              </h2>
              <p className="text-[11px] text-muted-foreground text-center mb-8">
                Breathe with the heart. In — and out.
              </p>

              <BreathingHeart />

              <div className="mt-8 w-full bg-secondary rounded-[14px] px-4 py-3">
                <p className="text-[12px] text-foreground italic text-center">
                  🫂 "I'm having a hard moment."
                </p>
              </div>
            </div>

            <div className="pb-8 pt-6">
              <PrimaryButton onClick={() => goTo(3)}>I Said It 🗣️</PrimaryButton>
            </div>
          </Screen>
        )}

        {screen === 3 && (
          <Screen>
            <div className="pt-6">
              <StepPill step={2} label="Normalise" />
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-[17px] font-medium text-foreground mb-2">
                Think of someone who gets it 💭
              </h2>
              <p className="text-[11px] text-muted-foreground leading-[1.7] mb-5">
                Name one person who would be gentle with you right now. Someone who wouldn't judge you.
              </p>

              <label className="text-[10px] text-muted-foreground mb-2 block">
                Someone who would understand me…
              </label>
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="Type a name…"
                className="w-full bg-card border border-border rounded-[12px] px-3 py-2.5 text-[12px] text-foreground placeholder:text-hint min-h-[44px] outline-none focus:ring-1 focus:ring-primary mb-4"
              />

              <div className="bg-secondary rounded-[12px] px-3 py-2.5">
                <p className="text-[11px] text-foreground leading-[1.65]">
                  Now imagine what they'd say to you. They wouldn't be harsh. They'd be kind. Try to hear that. 🤍
                </p>
              </div>
            </div>

            <div className="pb-8 pt-6">
              <PrimaryButton onClick={() => goTo(4)}>I Can Hear Them 👂</PrimaryButton>
            </div>
          </Screen>
        )}

        {screen === 4 && (
          <Screen>
            <div className="pt-6">
              <StepPill step={3} label="Kind words" />
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-[17px] font-medium text-foreground mb-2">
                Pick what feels true right now 🌱
              </h2>
              <p className="text-[11px] text-muted-foreground mb-5">
                Tap the one that lands.
              </p>

              <div className="flex flex-col gap-2.5">
                {phrases.map((phrase, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhrase(i)}
                    className={`w-full text-left rounded-[14px] px-3 py-[11px] text-[11px] transition-all duration-300 ${
                      selectedPhrase === i
                        ? "bg-secondary border border-primary text-foreground"
                        : "bg-card border border-border text-foreground"
                    }`}
                  >
                    {phrase}
                  </button>
                ))}
              </div>

              {selectedPhrase !== null && (
                <div
                  className="mt-5 bg-secondary rounded-[14px] px-3.5 py-3"
                  style={{ animation: "screenFadeIn 400ms ease forwards" }}
                >
                  <p className="text-[13px] font-medium text-foreground italic text-center">
                    {phrases[selectedPhrase]}
                  </p>
                </div>
              )}
            </div>

            <div className="pb-8 pt-6">
              <PrimaryButton onClick={() => goTo(5)}>I Receive That 🙏</PrimaryButton>
            </div>
          </Screen>
        )}

        {screen === 5 && (
          <Screen>
            <div className="flex-1 flex flex-col justify-center items-center">
              <p className="text-[10px] text-muted-foreground tracking-[0.07em] uppercase mb-3">
                🎉 ALL DONE
              </p>
              <h2 className="text-[18px] font-medium text-foreground text-center mb-3">
                That was self compassion 💚
              </h2>
              <p className="text-[11px] text-muted-foreground leading-[1.7] text-center mb-8">
                Three small moments. A breath, a name, a kind word. That's enough to interrupt the shame cycle.
              </p>

              <div className="w-full bg-card border border-border rounded-[20px] p-6 flex flex-col items-center">
                {/* Heart icon circle */}
                <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
                    <path
                      d="M11 18C11 18 1.5 12.5 1.5 6.5C1.5 3 4 1 6.5 1C8.2 1 9.8 2 11 3.5C12.2 2 13.8 1 15.5 1C18 1 20.5 3 20.5 6.5C20.5 12.5 11 18 11 18Z"
                      fill="hsl(var(--primary))"
                    />
                  </svg>
                </div>
                <p className="text-[14px] font-medium text-foreground text-center mb-1">
                  The pull happened. 🍃
                </p>
                <p className="text-[12px] text-muted-foreground text-center leading-[1.6]">
                  And you chose kindness anyway. That's the practice.
                </p>
              </div>
            </div>

            <div className="pb-8 pt-6">
              <button
                onClick={() => {
                  setSelectedPhrase(null);
                  setPersonName("");
                  goTo(1);
                }}
                className="w-full bg-primary text-primary-foreground rounded-[12px] h-12 text-sm font-medium"
              >
                🔄 Do It Again
              </button>
            </div>
          </Screen>
        )}
      </div>
    </div>
  );
}
