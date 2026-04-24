import React from "react";
import TagLabel from "../components/TagLabel";
import CTAButton from "../components/CTAButton";

interface Screen1Props {
  onNext: () => void;
  onBack: () => void;
  onHistory: () => void;
}

const Screen1Welcome: React.FC<Screen1Props> = ({ onNext, onBack, onHistory }) => (
  <div className="animate-fade-slide-up flex flex-col items-center text-center flex-1">
    <div className="flex justify-between items-center w-full mb-2">
      <button onClick={onBack} className="text-[12px] font-body text-muted-foreground hover:text-foreground transition-colors">
        ← Back
      </button>
      <button onClick={onHistory} className="text-[12px] font-body text-primary hover:text-foreground transition-colors">
        📖 Past Sessions
      </button>
    </div>
    <TagLabel>🌿 Defusion Exercise</TagLabel>
    <div className="text-[56px] animate-float my-4">🧠</div>
    <h1 className="font-heading text-[20px] text-foreground mb-3">Unhook From Your Thoughts</h1>
    <p className="text-[12px] font-body text-muted-foreground leading-relaxed mb-6 px-2">
      Your mind is very good at making thoughts feel like facts. But a thought is just a thought — not a command, not a truth, not a reflection of who you are. In this exercise, you'll practice Defusion — stepping back from intrusive thoughts instead of fighting them.
    </p>
    <div className="mt-auto w-full">
      <CTAButton onClick={onNext}>Let's Begin ✨</CTAButton>
    </div>
  </div>
);

export default Screen1Welcome;
