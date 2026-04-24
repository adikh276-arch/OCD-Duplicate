import React, { useState } from "react";

interface Screen4Props {
  userDoubt: string;
  onSitAgain: () => void;
  onDone: () => void;
  onSaveReflection: (reflection: string) => void;
}

const Screen4Completion: React.FC<Screen4Props> = ({ userDoubt, onSitAgain, onDone, onSaveReflection }) => {
  const [reflection, setReflection] = useState("");

  const handleSitAgain = () => {
    onSaveReflection(reflection);
    onSitAgain();
  };

  const handleDone = () => {
    onSaveReflection(reflection);
    onDone();
  };

  return (
    <div className="min-h-screen bg-warm-offwhite px-5 py-6 pb-10">
      <p className="screen-label text-golden-muted fade-up stagger-1">Screen 4</p>

      <div className="text-[52px] text-center mt-6 fade-up stagger-1">🌤️</div>

      <h1 className="font-heading text-[20px] font-medium text-foreground text-center mt-3 fade-up stagger-2">
        That was enough.
      </h1>
      <p className="font-body text-[12px] text-golden-muted text-center mt-2 fade-up stagger-2">
        You chose discomfort over false certainty.
      </p>

      {/* Saved statement */}
      <div className="mt-6 rounded-[12px] bg-text-input-bg border border-card-warm-border p-4 fade-up stagger-3">
        <p className="text-[10px] uppercase tracking-[1px] text-golden-muted font-body">📌 YOUR SAVED STATEMENT</p>
        <p className="font-heading italic text-[12px] text-foreground leading-[1.8] mt-2">
          I don't know for certain that {userDoubt} — and that's okay for now.
        </p>
      </div>

      {/* Reflection */}
      <p className="font-body text-[11px] text-golden-muted mt-5 fade-up stagger-4">💬 How did it feel? (optional)</p>
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Write anything…"
        className="w-full mt-2 min-h-[52px] rounded-[12px] bg-text-input-bg border border-card-warm-border p-3 font-heading italic text-[13px] text-foreground placeholder:text-golden-muted/60 resize-none focus:outline-none focus:ring-1 focus:ring-golden fade-up stagger-4"
      />

      {/* Badge */}
      <div className="mt-4 rounded-[12px] bg-text-input-bg border border-card-warm-border p-4 flex items-center gap-3 fade-up stagger-5">
        <span className="text-[24px]">🏅</span>
        <div className="flex-1">
          <p className="font-body text-[12px] font-medium text-foreground">Uncertainty Holder</p>
          <p className="font-body text-[10px] text-golden-muted">Badge unlocked</p>
        </div>
        <span className="rounded-full bg-golden-light px-2 py-0.5 font-body text-[10px] text-primary font-medium">NEW</span>
      </div>

      {/* CTAs */}
      <button
        onClick={handleSitAgain}
        className="w-full mt-6 py-3.5 rounded-[12px] bg-primary text-primary-foreground font-body text-[14px] font-medium fade-up stagger-6"
      >
        Sit with it again
      </button>
      <button
        onClick={handleDone}
        className="w-full mt-3 py-3.5 rounded-[12px] bg-warm-offwhite text-primary border border-text-input-border font-body text-[14px] font-medium fade-up stagger-7"
      >
        Done for today
      </button>
    </div>
  );
};

export default Screen4Completion;
