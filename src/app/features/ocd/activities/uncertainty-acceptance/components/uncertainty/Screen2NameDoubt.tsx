import React, { useState } from "react";

interface Screen2Props {
  onContinue: (doubt: string) => void;
}

const suggestions = [
  { emoji: "😔", text: "Am I a good person?" },
  { emoji: "😰", text: "Did I do something wrong?" },
  { emoji: "😟", text: "What if I hurt someone?" },
  { emoji: "🤯", text: "Can I trust my mind?" },
];

const Screen2NameDoubt: React.FC<Screen2Props> = ({ onContinue }) => {
  const [doubt, setDoubt] = useState("");

  return (
    <div className="min-h-screen bg-light-sand px-5 py-6 pb-10">
      <p className="screen-label text-golden-muted fade-up stagger-1">Screen 2</p>

      <div className="text-[38px] mt-4 fade-up stagger-1">🤍</div>

      <h1 className="font-heading text-[18px] font-medium text-foreground leading-[1.4] mt-3 fade-up stagger-2">
        What are you trying to feel certain about?
      </h1>
      <p className="font-body text-[11px] text-golden-muted mt-2 fade-up stagger-2">
        The more honest, the more useful. No one else will see this.
      </p>

      {/* Inspiration */}
      <p className="font-body text-[11px] text-golden-muted mt-5 fade-up stagger-3">
        People often sit with doubts like…
      </p>
      <div className="flex flex-wrap gap-2 mt-2 fade-up stagger-3">
        {suggestions.map((s) => (
          <button
            key={s.text}
            onClick={() => setDoubt(s.text)}
            className="rounded-[8px] bg-text-input-bg border border-text-input-border px-3 py-2 font-body text-[11px] text-primary"
          >
            {s.emoji} {s.text}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <p className="font-body text-[11px] text-golden-muted mt-6 fade-up stagger-4">
        I need to know for certain that…
      </p>
      <textarea
        value={doubt}
        onChange={(e) => setDoubt(e.target.value)}
        placeholder="Type your doubt here — be specific…"
        className="w-full mt-2 min-h-[80px] rounded-[12px] bg-text-input-bg border border-text-input-border p-3 font-heading italic text-[13px] text-foreground placeholder:text-golden-muted/60 resize-none focus:outline-none focus:ring-1 focus:ring-golden fade-up stagger-4"
      />
      <p className="font-body text-[11px] text-golden-muted mt-2 fade-up stagger-5">
        ✏️ You don't need to explain it. Just name it.
      </p>

      {/* CTA */}
      <button
        onClick={() => doubt.trim() && onContinue(doubt.trim())}
        disabled={!doubt.trim()}
        className="w-full mt-6 py-3.5 rounded-[12px] bg-primary text-primary-foreground font-body text-[14px] font-medium disabled:opacity-40 fade-up stagger-5"
      >
        Continue →
      </button>
    </div>
  );
};

export default Screen2NameDoubt;
