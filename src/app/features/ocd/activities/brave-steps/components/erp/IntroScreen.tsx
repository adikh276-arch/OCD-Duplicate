interface IntroScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const IntroScreen = ({ onNext, onBack }: IntroScreenProps) => {
  return (
    <div className="flex flex-col h-full px-5 py-6">
      <button
        onClick={onBack}
        className="self-start text-bark text-lg font-medium mb-4"
      >
        ‹
      </button>

      <span className="self-start bg-sandy text-bark text-xs font-medium px-3 py-1 rounded-full border border-border mb-4">
        ERP Activity
      </span>

      <h1 className="text-bark text-xl font-medium leading-tight mb-2">
        Dirty Hands, Brave You 🙌
      </h1>

      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
        Touch a surface that feels uncomfortable — and resist the urge to wash.
        Your brain learns the discomfort passes on its own.
      </p>

      <div className="bg-sandy rounded-[13px] border border-border p-4 mb-auto">
        <p className="text-bark text-sm font-medium mb-1">💡 How this works</p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Touch → Hold → Anxiety peaks → Then drops. Each session trains your
          brain to feel safer.
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-primary text-primary-foreground text-sm font-medium py-3.5 rounded-[14px] mt-5"
      >
        Let's Begin
      </button>
    </div>
  );
};

export default IntroScreen;
