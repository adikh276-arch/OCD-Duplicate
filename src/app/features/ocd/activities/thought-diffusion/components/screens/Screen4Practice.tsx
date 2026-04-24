import React from "react";
import TagLabel from "../components/TagLabel";
import CTAButton from "../components/CTAButton";

interface Props {
  guidedRewrite: string;
  ownThought: string;
  ownRewrite: string;
  onGuidedChange: (v: string) => void;
  onOwnThoughtChange: (v: string) => void;
  onOwnRewriteChange: (v: string) => void;
  onNext: () => void;
}

const inputClass = "w-full p-3 rounded-lg bg-muted border border-input text-[11px] font-body text-foreground placeholder:text-[#C0A8D8] focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors";

const Screen4Practice: React.FC<Props> = ({
  guidedRewrite, ownThought, ownRewrite,
  onGuidedChange, onOwnThoughtChange, onOwnRewriteChange, onNext
}) => (
  <div className="animate-fade-slide-up flex flex-col flex-1">
    <div className="text-center">
      <TagLabel>✍️ Practice</TagLabel>
      <h1 className="font-heading text-[20px] text-foreground mb-4">Try It Now</h1>
    </div>

    {/* Part A */}
    <div className="mb-4">
      <p className="text-[11px] font-body font-semibold text-muted-foreground mb-2">🧩 GUIDED</p>
      <div className="p-3 rounded-lg bg-muted border-l-[3px] border-l-progress-active mb-3">
        <p className="text-[12px] font-body italic text-foreground">
          "I am a bad person for having these thoughts."
        </p>
      </div>
      <p className="text-[10px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground mb-2">
        Rewrite using the defusion phrase
      </p>
      <input
        className={inputClass}
        placeholder="I am having the thought that…"
        value={guidedRewrite}
        onChange={(e) => onGuidedChange(e.target.value)}
      />
    </div>

    <div className="h-px bg-border my-3" />

    {/* Part B */}
    <div className="mb-4">
      <p className="text-[11px] font-body font-semibold text-muted-foreground mb-2">💭 YOUR OWN</p>
      <p className="text-[10px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground mb-2">
        Your intrusive thought (optional)
      </p>
      <input
        className={inputClass + " mb-3"}
        placeholder="Type your thought here…"
        value={ownThought}
        onChange={(e) => onOwnThoughtChange(e.target.value)}
      />
      <p className="text-[10px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground mb-2">
        Now rewrite it
      </p>
      <input
        className={inputClass}
        placeholder="I am having the thought that…"
        value={ownRewrite}
        onChange={(e) => onOwnRewriteChange(e.target.value)}
      />
    </div>

    <p className="text-[10px] font-body italic text-muted-foreground text-center mb-4">
      🕊️ You're not agreeing with the thought — just observing it.
    </p>

    <div className="mt-auto w-full">
      <CTAButton onClick={onNext}>Done ✓</CTAButton>
    </div>
  </div>
);

export default Screen4Practice;
