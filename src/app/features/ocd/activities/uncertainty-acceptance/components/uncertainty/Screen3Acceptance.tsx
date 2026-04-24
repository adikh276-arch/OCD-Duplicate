import React from "react";

interface Screen3Props {
  userDoubt: string;
  onComplete: () => void;
}

const statements = [
  "Right now, I have the thought that I need certainty about this.",
  "I don't know for sure. And I am choosing not to check.",
  "This doubt can be here. I don't have to resolve it.",
  "Not knowing is uncomfortable — but I am safe.",
];

const Screen3Acceptance: React.FC<Screen3Props> = ({ userDoubt, onComplete }) => {
  return (
    <div className="min-h-screen bg-brown-dark-bg px-5 py-6 pb-10">
      <p className="screen-label text-brown-dark-accent fade-up stagger-1">Screen 3</p>

      <h1 className="font-heading text-[18px] font-medium text-brown-dark-text leading-[1.4] mt-4 fade-up stagger-2">
        Read this. Slowly. 🌿
      </h1>
      <p className="font-body text-[11px] text-brown-dark-muted mt-2 fade-up stagger-2">
        Allow the doubt to exist without resolving it.
      </p>

      {/* Doubt card */}
      <div className="mt-5 rounded-r-[12px] bg-brown-dark-card border-l-[3px] border-l-brown-dark-accent p-4 fade-up stagger-3">
        <p className="text-[10px] uppercase tracking-[1px] text-brown-dark-muted font-body">YOUR DOUBT</p>
        <p className="font-heading italic text-[12px] text-brown-dark-text leading-[1.7] mt-2">{userDoubt}</p>
      </div>

      {/* Acceptance statements */}
      <div className="mt-4 rounded-[12px] bg-brown-dark-card border border-brown-dark-border p-4 space-y-2">
        {statements.map((s, i) => (
          <p
            key={i}
            className="font-heading italic text-[12px] text-brown-dark-text leading-[1.9] statement-line"
            style={{ animationDelay: `${0.8 + i * 0.3}s` }}
          >
            {s}
          </p>
        ))}
      </div>

      {/* Breathing animation */}
      <div className="mt-5 rounded-[12px] bg-brown-dark-card border border-brown-dark-border p-6 flex flex-col items-center fade-up stagger-5">
        <p className="text-[10px] text-brown-dark-muted tracking-[1px] font-body uppercase mb-4">🫁 one slow breath</p>
        <div className="relative flex items-center justify-center w-[80px] h-[80px] breathing-outer rounded-full border-[1.5px] border-brown-dark-accent">
          <div className="w-[52px] h-[52px] breathing-inner rounded-full bg-golden-light border border-brown-dark-accent flex items-center justify-center">
            <span className="text-[20px]">🌸</span>
          </div>
        </div>
        <p className="font-heading italic text-[10px] text-brown-dark-muted mt-4">breathe with the circle</p>
      </div>

      {/* CTA */}
      <button
        onClick={onComplete}
        className="w-full mt-6 py-3.5 rounded-[12px] bg-cta-light-bg text-cta-light-text font-body text-[14px] font-medium fade-up stagger-6"
      >
        I sat with it
      </button>
    </div>
  );
};

export default Screen3Acceptance;
