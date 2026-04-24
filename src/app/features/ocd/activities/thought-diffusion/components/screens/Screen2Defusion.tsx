import React from "react";
import TagLabel from "../../components/TagLabel";
import CTAButton from "../../components/CTAButton";

interface Props { onNext: () => void; }

const Screen2Defusion: React.FC<Props> = ({ onNext }) => (
  <div className="animate-fade-slide-up flex flex-col flex-1">
    <div className="text-center">
      <TagLabel>💡 Understanding</TagLabel>
      <h1 className="font-heading text-[20px] text-foreground mb-3">Fused vs. Defused</h1>
      <p className="text-[12px] font-body text-muted-foreground leading-relaxed mb-5">
        When your mind fuses with a thought, it feels real and urgent. Defusion creates distance — without pushing the thought away.
      </p>
    </div>

    <div className="space-y-3 mb-4">
      <div className="p-3.5 rounded-pill bg-pink-pill-bg border border-pink-pill-border">
        <span className="text-[12px] font-body text-pink-pill-text">
          🔴 <strong>Fused:</strong> "I am a terrible person."
        </span>
      </div>
      <div className="p-3.5 rounded-pill bg-purple-pill-bg border border-purple-pill-border">
        <span className="text-[12px] font-body text-purple-pill-text">
          🟣 <strong>Defused:</strong> "I am having the thought that I am a terrible person."
        </span>
      </div>
    </div>

    <p className="text-[12px] font-body text-muted-foreground text-center mb-6">
      That one small shift changes everything.
    </p>

    <div className="mt-auto w-full">
      <CTAButton onClick={onNext}>Show Me How 👉</CTAButton>
    </div>
  </div>
);

export default Screen2Defusion;
