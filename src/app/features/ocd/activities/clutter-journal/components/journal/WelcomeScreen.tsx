import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onNext: (objectName: string) => void;
  onViewJournal: () => void;
}

const WelcomeScreen = ({ onNext, onViewJournal }: Props) => {
  const [objectName, setObjectName] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-background px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <button className="text-foreground text-2xl font-serif">&lt;</button>
        <button
          onClick={onViewJournal}
          className="text-muted-foreground text-sm"
        >
          📖 My Journal →
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center text-center">
        <span className="text-5xl mb-6">🫙</span>

        <h1 className="text-2xl font-bold text-foreground font-serif mb-3">
          Clutter & Emotion Journal
        </h1>

        <p className="text-primary italic text-sm mb-4">
          "Every object you keep is keeping something for you."
        </p>

        <p className="text-muted-foreground text-xs mb-6">
          This isn't about clearing space. It's about understanding what your
          things are holding. 🌸
        </p>

        <div className="w-full h-px bg-divider mb-6" />

        <p className="text-foreground text-sm mb-6">
          Think of one item you've been holding onto. Whatever comes to mind
          first is the right one. ✨
        </p>

        <input
          type="text"
          value={objectName}
          onChange={(e) => setObjectName(e.target.value)}
          placeholder="e.g. my mother's old scarf, a broken watch"
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring font-serif"
        />
      </div>

      <div className="pt-6">
        <Button
          variant="journal"
          disabled={!objectName.trim()}
          onClick={() => onNext(objectName.trim())}
        >
          This Is My Object →
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

