import React from "react";
import TagLabel from "../../components/TagLabel";
import CTAButton from "../../components/CTAButton";

interface SessionEntry {
  id: string;
  date: string;
  completed: boolean;
  guidedThought?: string;
  guidedDefused?: string;
  ownThought?: string;
  ownDefused?: string;
  feeling?: string;
}

interface Props {
  sessions: SessionEntry[];
  onStartNew: () => void;
  onBack: () => void;
}

const feelingLabels: Record<string, string> = {
  much_less_powerful: "💜 Much less powerful",
  little_less_powerful: "🙂 A little less powerful",
  about_same: "😐 About the same",
  harder_at_first: "😔 Harder at first",
};

const HistoryScreen: React.FC<Props> = ({ sessions, onStartNew, onBack }) => (
  <div className="animate-fade-slide-up flex flex-col flex-1">
    <div className="text-center mb-4">
      <TagLabel>📖 Past Sessions</TagLabel>
      <h1 className="font-heading text-[20px] text-foreground mb-1">Your Entries</h1>
      <p className="text-[12px] font-body text-muted-foreground">
        {sessions.length} session{sessions.length !== 1 ? "s" : ""} completed
      </p>
    </div>

    <div className="space-y-3 flex-1 overflow-y-auto mb-4">
      {sessions.length === 0 && (
        <p className="text-[12px] font-body text-muted-foreground text-center py-8">
          No sessions yet. Start your first one!
        </p>
      )}
      {sessions.map((s) => (
        <div key={s.id} className="p-4 rounded-pill bg-muted border border-border">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[11px] font-body text-muted-foreground">{s.date}</span>
            {s.completed ? (
              <span className="text-[10px] font-body font-semibold px-2 py-0.5 rounded-full bg-complete-bg text-complete-text border border-complete-border">
                ✓ Completed
              </span>
            ) : (
              <span className="text-[10px] font-body font-semibold px-2 py-0.5 rounded-full bg-incomplete-bg text-incomplete-text border border-incomplete-border">
                ⏸ Incomplete
              </span>
            )}
          </div>

          {(s.guidedThought || s.ownThought) && (
            <div className="space-y-2 mb-3">
              {s.guidedThought && (
                <div>
                  <span className="text-[10px] font-body text-muted-foreground uppercase tracking-wide">Thought</span>
                  <div className="mt-1 p-2 rounded-lg bg-pink-pill-bg border border-pink-pill-border text-[11px] font-body text-pink-pill-text">
                    {s.guidedThought}
                  </div>
                </div>
              )}
              {s.guidedDefused && (
                <div>
                  <span className="text-[10px] font-body text-muted-foreground uppercase tracking-wide">Defused</span>
                  <div className="mt-1 p-2 rounded-lg bg-purple-pill-bg border border-purple-pill-border text-[11px] font-body text-purple-pill-text">
                    {s.guidedDefused}
                  </div>
                </div>
              )}
            </div>
          )}

          {s.feeling && (
            <>
              <div className="h-px bg-border my-2" />
              <p className="text-[10px] font-body text-muted-foreground">
                Felt: {feelingLabels[s.feeling] || s.feeling}
              </p>
            </>
          )}
        </div>
      ))}
    </div>

    <div className="w-full space-y-2">
      <CTAButton onClick={onStartNew}>Start New Session ✨</CTAButton>
      <CTAButton variant="outline" onClick={onBack}>← Back</CTAButton>
    </div>
  </div>
);

export type { SessionEntry };
export default HistoryScreen;
