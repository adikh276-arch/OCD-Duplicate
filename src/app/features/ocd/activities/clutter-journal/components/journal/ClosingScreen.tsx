import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { saveEntry, getEntryCount, formatDate } from "../lib/journal-store";

interface Props {
  objectName: string;
  insight: string;
  onViewJournal: () => void;
  onClose: () => void;
}

const ClosingScreen = ({ objectName, insight, onViewJournal, onClose }: Props) => {
  const [entryCount, setEntryCount] = useState(0);

  useEffect(() => {
    saveEntry({
      objectName,
      insight,
      date: formatDate(new Date()),
    });
    setEntryCount(getEntryCount());
  }, [objectName, insight]);

  return (
    <div className="flex flex-col min-h-screen bg-background px-6 py-8">
      <div className="flex-1 flex flex-col items-center text-center">
        <span className="text-5xl mb-6">🌺</span>

        <h1 className="text-2xl font-bold text-foreground font-serif mb-3">
          You just did something brave.
        </h1>

        <p className="text-muted-foreground text-xs italic mb-8 max-w-xs">
          Most people never ask why they hold on. You did. That kind of honesty
          is where real change begins.
        </p>

        <div className="w-full rounded-2xl border border-border bg-card p-5 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-lg">📦</span>
            <div className="text-left">
              <p className="text-muted-foreground text-xs">Today's object</p>
              <p className="text-card-foreground text-sm font-serif font-medium">
                {objectName}
              </p>
            </div>
          </div>
          <div className="h-px bg-divider my-3" />
          <div className="flex items-start gap-3">
            <span className="text-lg">💭</span>
            <div className="text-left">
              <p className="text-muted-foreground text-xs">What it's holding</p>
              <p className="text-card-foreground text-sm font-serif font-medium">
                {insight}
              </p>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-xs italic mb-4">
          Come back whenever you're ready to explore another. 🌸
        </p>

        <p className="text-primary text-sm font-medium mb-4">
          🌿 {entryCount} {entryCount === 1 ? "entry" : "entries"} in your journal
        </p>

        <button
          onClick={onViewJournal}
          className="text-muted-foreground text-sm mb-4"
        >
          📖 View my past entries →
        </button>
      </div>

      <div className="pt-6">
        <Button variant="journal" onClick={onClose}>
          Close for Today
        </Button>
      </div>
    </div>
  );
};

export default ClosingScreen;
