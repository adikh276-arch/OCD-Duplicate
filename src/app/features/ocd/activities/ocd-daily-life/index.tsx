import { useState } from "react";
import { BarChart3, Globe, CheckCircle, Info, TrendingUp } from "lucide-react";
import ImpactSlider from "./components/ImpactSlider";
import WeeklyInsights from "./components/WeeklyInsights";

const categories = [
  { id: "work", emoji: "💼", label: "Work & Study" },
  { id: "social", emoji: "👥", label: "Relationships & Social" },
  { id: "sleep", emoji: "😴", label: "Sleep & Routine" },
  { id: "selfcare", emoji: "❤️", label: "Self-Care" },
];

type View = "daily" | "history" | "insights";

const Index = () => {
  const [view, setView] = useState<View>("daily");
  const [values, setValues] = useState<Record<string, number>>({
    work: 5,
    social: 5,
    sleep: 5,
    selfcare: 5,
  });

  if (view === "insights") {
    return <WeeklyInsights onBack={() => setView("daily")} />;
  }

  if (view === "history") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setView("daily")}
              className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              ←
            </button>
            <h1 className="text-xl font-bold text-foreground">History</h1>
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <BarChart3 className="w-12 h-12 text-primary/30 mb-4" />
            <p className="text-muted-foreground text-base">No history yet. Start by saving a daily entry.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground text-base">🧠</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">Daily Life</h1>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Track & Insights</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setView("history")}
              className="h-9 px-3 rounded-full bg-card border border-border/50 text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              History
            </button>
            <button
              onClick={() => setView("insights")}
              className="h-9 px-3 rounded-full bg-card border border-border/50 text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              Insights
            </button>
            <button className="h-9 px-3 rounded-full bg-card border border-border/50 text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              EN
            </button>
          </div>
        </div>

        {/* Section header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-primary" />
            </div>
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">Daily Impact Check-In</h2>
          </div>
          <p className="text-xs text-muted-foreground ml-9">
            Monitor how OCD affects your daily life across different areas.
          </p>
        </div>

        {/* Sliders */}
        <div className="space-y-3 mb-6">
          {categories.map((cat) => (
            <ImpactSlider
              key={cat.id}
              emoji={cat.emoji}
              label={cat.label}
              value={values[cat.id]}
              onChange={(v) => setValues((prev) => ({ ...prev, [cat.id]: v }))}
            />
          ))}
        </div>

        {/* Save button */}
        <button className="w-full py-3.5 rounded-2xl gradient-save text-primary-foreground font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity mb-5">
          <CheckCircle className="w-5 h-5" />
          Save Daily Entry
        </button>

        {/* Footer note */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <p>Daily check-ins help you stay mindful of your recovery journey.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
