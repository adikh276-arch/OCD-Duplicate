import type { LadderData } from "./types";

interface Props {
  ladder: LadderData;
  onContinue: () => void;
}

const Screen8Ladder = ({ ladder, onContinue }: Props) => {
  const { items, currentStep, sessions } = ladder;
  const totalDays = new Set(sessions.map((s) => s.date)).size || 0;
  const stepsDone = Math.max(currentStep - 1, 0);
  const avgDrop =
    sessions.length > 0
      ? (sessions.reduce((sum, s) => sum + (s.beforeAnxiety - s.afterAnxiety), 0) / sessions.length).toFixed(1)
      : "0";

  return (
    <div className="min-h-screen bg-surface-light flex flex-col items-center px-6 pt-8 pb-8" style={{ animation: "screenFade 600ms ease-in-out" }}>
      <div className="w-full max-w-[375px] flex flex-col flex-1">
        <div className="text-center mb-8">
          <p className="section-label text-accent-coral mb-2">PROGRESS 📈</p>
          <h1 className="text-2xl font-bold text-text-light-primary">Your ladder 🪜</h1>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          {[...items].reverse().map((item, revIdx) => {
            const stepNum = items.length - revIdx;
            const isDone = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            const isLocked = stepNum > currentStep;

            return (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-opacity ${
                  isLocked ? "opacity-35" : ""
                }`}
              >
                <span className={`text-sm font-bold min-w-[20px] ${isDone ? "text-accent-coral" : isCurrent ? "text-text-light-primary" : "text-text-light-secondary"}`}>
                  {stepNum}
                </span>
                <div className={`h-0.5 w-6 ${isDone ? "bg-accent-coral" : isCurrent ? "bg-surface-blue" : "bg-border"}`} style={{ height: isDone || isCurrent ? 2 : 1 }} />
                <span className={`text-sm font-medium flex-1 ${isDone ? "text-accent-coral" : isCurrent ? "text-text-light-primary font-bold" : "text-text-light-secondary"}`}>
                  {isDone ? "✅" : isCurrent ? "👉" : "🔒"} {item.emoji} {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-surface-blue rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-text-blue-primary">{totalDays}</p>
            <p className="text-xs text-text-blue-secondary">🗓️ days</p>
          </div>
          <div className="bg-surface-blue rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-text-blue-primary">{stepsDone}/5</p>
            <p className="text-xs text-text-blue-secondary">🪜 steps</p>
          </div>
          <div className="bg-accent-coral rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-text-blue-primary">{avgDrop}</p>
            <p className="text-xs text-text-blue-primary">📉 drop</p>
          </div>
        </div>

        <p className="text-center text-text-light-secondary text-sm italic mb-8">
          "Every rung you climb is proof you are stronger than your fear."
        </p>

        <button
          onClick={onContinue}
          className="w-full py-4 rounded-xl bg-surface-blue text-text-blue-primary font-semibold text-base active:scale-[0.97] transition-transform"
        >
          Continue My Ladder →
        </button>
      </div>
    </div>
  );
};

export default Screen8Ladder;
