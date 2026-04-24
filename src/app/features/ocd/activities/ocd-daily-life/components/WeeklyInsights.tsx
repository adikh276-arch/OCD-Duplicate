import { useState } from "react";
import { ChevronLeft, BarChart3 } from "lucide-react";

interface WeeklyInsightsProps {
  onBack: () => void;
}

const WeeklyInsights = ({ onBack }: WeeklyInsightsProps) => {
  const [period, setPeriod] = useState<string>("this-week");

  const periods = [
    { id: "this-week", label: "This Week" },
    { id: "last-week", label: "Last Week" },
    { id: "2-weeks", label: "2 Weeks Ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Weekly Insights</h1>
        </div>

        {/* Period selector */}
        <div className="flex gap-2 mb-10">
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                period === p.id
                  ? "gradient-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border/50 text-foreground hover:bg-muted"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-20">
          <BarChart3 className="w-12 h-12 text-primary/30 mb-4" />
          <p className="text-muted-foreground text-base">No check-ins for this period yet.</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyInsights;
