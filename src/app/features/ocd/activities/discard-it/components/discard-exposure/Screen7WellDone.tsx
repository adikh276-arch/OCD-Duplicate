interface Props {
  beforeAnxiety: number;
  afterAnxiety: number;
  onKeepGoing: () => void;
  onDone: () => void;
}

const Screen7WellDone = ({ beforeAnxiety, afterAnxiety, onKeepGoing, onDone }: Props) => (
  <div className="min-h-screen bg-surface-blue flex flex-col items-center px-6 pt-8 pb-8" style={{ animation: "screenFade 600ms ease-in-out" }}>
    <div className="w-full max-w-[375px] flex flex-col flex-1">
      <div className="text-center mb-6">
        <p className="section-label text-accent-peach mb-2">WELL DONE 🎉</p>
        <h1 className="text-2xl font-bold text-text-blue-primary mb-3">One step climbed. 🌿</h1>
        <div className="accent-line bg-accent-peach mb-6" />
      </div>

      <div className="bg-card-blue-deep rounded-2xl p-6 flex items-center justify-center gap-4 mb-8">
        <div className="text-center">
          <span className="text-2xl">😟</span>
          <p className="text-3xl font-bold text-text-blue-muted mt-1">{beforeAnxiety}</p>
          <p className="text-xs text-text-blue-muted">before</p>
        </div>
        <span className="text-2xl text-accent-peach">→</span>
        <div className="text-center">
          <span className="text-2xl">😌</span>
          <p className="text-3xl font-bold text-accent-peach mt-1">{afterAnxiety}</p>
          <p className="text-xs text-accent-peach">after</p>
        </div>
      </div>

      <div className="flex-1 text-center">
        <p className="text-text-blue-secondary text-sm italic mb-6">
          "Your anxiety came down. That's your brain learning it's safe to let go."
        </p>
        <p className="text-text-blue-secondary text-base leading-relaxed">
          Every time you do this, it gets easier. Not because the items matter less — but because you matter more.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onKeepGoing}
          className="flex-1 py-4 rounded-xl border border-[#5A8FAA] text-text-blue-secondary font-semibold text-sm active:scale-[0.97] transition-transform"
        >
          🔄 Keep Going
        </button>
        <button
          onClick={onDone}
          className="flex-1 py-4 rounded-xl bg-accent-coral text-accent-foreground font-semibold text-sm active:scale-[0.97] transition-transform"
        >
          ✅ Done Today
        </button>
      </div>
    </div>
  </div>
);

export default Screen7WellDone;
