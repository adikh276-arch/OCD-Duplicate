import React from "react";
import TagLabel from "../components/TagLabel";
import CTAButton from "../components/CTAButton";
import { cn } from "../lib/utils";

const feelings = [
  { value: "much_less_powerful", emoji: "💜", label: "Much less powerful" },
  { value: "little_less_powerful", emoji: "🙂", label: "A little less powerful" },
  { value: "about_same", emoji: "😐", label: "About the same" },
  { value: "harder_at_first", emoji: "😔", label: "Harder at first (that's normal too)" },
] as const;

interface Props {
  feeling: string;
  onFeelingChange: (v: string) => void;
  onPracticeAgain: () => void;
  onReturnHome: () => void;
}

const Screen5Reflection: React.FC<Props> = ({ feeling, onFeelingChange, onPracticeAgain, onReturnHome }) => (
  <div className="animate-fade-slide-up flex flex-col flex-1">
    <div className="text-center">
      <TagLabel>🌸 Reflection</TagLabel>
      <div className="text-[48px] animate-float my-3">🎉</div>
      <h1 className="font-heading text-[20px] text-foreground mb-3">You Did Something Hard Today</h1>
      <p className="text-[12px] font-body text-muted-foreground leading-relaxed mb-4">
        Looking at intrusive thoughts — even from a small distance — takes real courage.
      </p>
    </div>

    <div className="p-4 rounded-lg bg-reflection-bg border-l-2 border-l-reflection-border mb-5">
      <p className="font-heading italic text-[14px] text-foreground">
        "You are not your thoughts. You are the one noticing them." 🌿
      </p>
    </div>

    <p className="text-[11px] font-body font-semibold text-muted-foreground mb-3">
      After using the defusion phrase, the thought felt…
    </p>

    <div className="space-y-2 mb-5">
      {feelings.map((f) => (
        <button
          key={f.value}
          onClick={() => onFeelingChange(f.value)}
          className={cn(
            "w-full flex items-center gap-3 p-3 rounded-[10px] border transition-all duration-200 text-left",
            feeling === f.value
              ? "bg-accent border-reflection-border"
              : "bg-muted border-border"
          )}
        >
          <div className={cn(
            "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
            feeling === f.value ? "border-progress-done" : "border-border"
          )}>
            {feeling === f.value && <div className="w-2 h-2 rounded-full bg-progress-done" />}
          </div>
          <span className="text-[12px] font-body text-foreground">{f.emoji} {f.label}</span>
        </button>
      ))}
    </div>

    <div className="mt-auto w-full space-y-2">
      <CTAButton onClick={onPracticeAgain}>Practice Again 🔁</CTAButton>
      <CTAButton variant="outline" onClick={onReturnHome}>Return to Home 🏠</CTAButton>
    </div>
  </div>
);

export default Screen5Reflection;
