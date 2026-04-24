import React from "react";
import TagLabel from "../components/TagLabel";
import CTAButton from "../components/CTAButton";

interface Props { onNext: () => void; }

const Screen3Tool: React.FC<Props> = ({ onNext }) => (
  <div className="animate-fade-slide-up flex flex-col flex-1">
    <div className="text-center">
      <TagLabel>🛠️ Your Tool</TagLabel>
      <h1 className="font-heading text-[20px] text-foreground mb-3">One Phrase. That's All.</h1>
      <p className="text-[12px] font-body text-muted-foreground leading-relaxed mb-5">
        Whenever an intrusive thought shows up, place this in front of it:
      </p>
    </div>

    <div className="p-5 rounded-pill bg-purple-pill-bg border border-purple-pill-border text-center mb-5 animate-shimmer">
      <div className="text-[28px] mb-2">💬</div>
      <p className="font-heading italic text-[18px] text-foreground">
        "I am having the thought that…"
      </p>
    </div>

    <div className="space-y-3 mb-4">
      <div className="p-3 rounded-pill bg-pink-pill-bg border border-pink-pill-border">
        <span className="text-[12px] font-body text-pink-pill-text">❌ "I might hurt someone."</span>
      </div>
      <div className="p-3 rounded-pill bg-purple-pill-bg border border-purple-pill-border">
        <span className="text-[12px] font-body text-purple-pill-text">✅ "I am having the thought that I might hurt someone."</span>
      </div>
    </div>

    <p className="text-[11px] font-body text-muted-foreground text-center italic mb-5">
      This reminds your brain: this is a thought, not a fact.
    </p>

    <div className="mt-auto w-full">
      <CTAButton onClick={onNext}>Let Me Practice 🖊️</CTAButton>
    </div>
  </div>
);

export default Screen3Tool;
