import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { getEntries, type JournalEntry } from "../../lib/journal-store";

interface Props {
  onStartEntry: () => void;
}

const JournalScreen = ({ onStartEntry }: Props) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    setEntries([...getEntries()].reverse());
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background px-6 py-8">
      <div className="flex-1 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-foreground font-serif mb-2">
          My Journal 📖
        </h1>

        <p className="text-muted-foreground text-xs mb-6">
          Every entry is a moment of courage.
        </p>

        {entries.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-4xl mb-4">🌸</span>
            <p className="text-muted-foreground text-sm">
              Your journal is waiting. Start your first reflection today.
            </p>
          </div>
        ) : (
          <div className="w-full space-y-3 overflow-y-auto flex-1">
            {entries.map((entry, i) => (
              <div
                key={i}
                className="w-full rounded-2xl border border-border bg-card p-4 text-left"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span>📦</span>
                  <p className="text-card-foreground text-sm font-serif font-medium">
                    {entry.objectName}
                  </p>
                </div>
                <div className="flex items-start gap-2 mb-2">
                  <span>💭</span>
                  <p className="text-card-foreground text-sm font-serif">
                    {entry.insight}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span>🗓️</span>
                  <p className="text-muted-foreground text-xs">{entry.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-6">
        <Button variant="journal" onClick={onStartEntry}>
          Start Today's Entry →
        </Button>
      </div>
    </div>
  );
};

export default JournalScreen;
