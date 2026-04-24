import React from "react";

interface Screen1Props {
  onBegin: () => void;
  onViewHistory: () => void;
}

const Screen1Intro: React.FC<Screen1Props> = ({ onBegin, onViewHistory }) => {
  return (
    <div className="min-h-screen bg-warm-offwhite px-5 py-6 pb-10">
      {/* Back button */}
      <button className="text-primary text-lg font-heading fade-up stagger-1">&lt;</button>

      {/* Screen label */}
      <p className="screen-label text-golden-muted mt-4 fade-up stagger-1">Pure O Practice</p>

      {/* Hero banner */}
      <div className="mt-4 rounded-[16px] bg-banner-bg px-6 py-8 text-center fade-up stagger-2">
        <div className="text-[48px] leading-none">🌫️</div>
        <h1 className="font-heading text-[18px] font-medium text-banner-text leading-[1.4] mt-3">
          You don't have to know for sure.
        </h1>
        <p className="font-heading italic text-[11px] text-banner-subtitle mt-1">
          uncertainty is not the same as danger
        </p>
      </div>

      {/* Body text */}
      <p className="font-body text-[11px] text-golden-muted leading-[1.6] mt-5 px-1 fade-up stagger-3">
        A quiet practice of sitting with a doubt — and choosing not to resolve it. Just for now.
      </p>

      {/* Feature cards */}
      <div className="mt-5 space-y-3">
        <div className="rounded-[12px] bg-card-warm border border-card-warm-border p-4 fade-up stagger-4">
          <p className="font-body text-[12px] font-medium text-foreground">🕊️ Not about convincing</p>
          <p className="font-body text-[11px] text-golden-muted mt-1 leading-[1.5]">
            You're not trying to prove the thought wrong. Just letting it exist.
          </p>
        </div>
        <div className="rounded-[12px] bg-card-warm border border-card-warm-border p-4 fade-up stagger-5">
          <p className="font-body text-[12px] font-medium text-foreground">🌊 Sit with the wave</p>
          <p className="font-body text-[11px] text-golden-muted mt-1 leading-[1.5]">
            Discomfort rises, then falls. You don't have to act on it.
          </p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onBegin}
        className="w-full mt-6 py-3.5 rounded-[12px] bg-primary text-primary-foreground font-body text-[14px] font-medium fade-up stagger-6"
      >
        Begin
      </button>

      {/* History link */}
      <button
        onClick={onViewHistory}
        className="w-full mt-3 text-center font-body text-[11px] text-golden-muted underline fade-up stagger-7"
      >
        🕐 View my history
      </button>
    </div>
  );
};

export default Screen1Intro;
