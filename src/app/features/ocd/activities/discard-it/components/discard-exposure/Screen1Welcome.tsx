interface Props {
  onNext: () => void;
}

const Screen1Welcome = ({ onNext }: Props) => (
  <div className="min-h-screen bg-surface-blue flex flex-col items-center px-6 pt-4 pb-8" style={{ animation: "screenFade 600ms ease-in-out" }}>
    <div className="w-full max-w-[375px] flex flex-col flex-1">
      <button className="self-start text-text-blue-muted text-sm font-medium mb-8">← back</button>

      <div className="flex-1 flex flex-col items-center text-center">
        <span className="text-5xl mb-6">🌿</span>
        <p className="section-label text-accent-peach mb-3">ERP EXERCISE</p>
        <h1 className="text-3xl font-bold text-text-blue-primary mb-4">Discard Exposure</h1>
        <div className="accent-line bg-accent-peach mb-6" />
        <p className="text-text-blue-secondary text-base leading-relaxed mb-8 max-w-[300px]">
          Start small. Build courage. Each discard teaches your brain that letting go is safe.
        </p>

        <div className="bg-card-blue-deep rounded-xl p-5 border-l-[3px] border-accent-peach w-full text-left">
          <p className="text-text-blue-secondary text-sm leading-relaxed">
            💙 "You go at your own pace. Nobody rushes you here."
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-accent-coral text-accent-foreground font-semibold text-base mt-8 active:scale-[0.97] transition-transform"
      >
        I'm Ready to Begin →
      </button>
    </div>
  </div>
);

export default Screen1Welcome;
