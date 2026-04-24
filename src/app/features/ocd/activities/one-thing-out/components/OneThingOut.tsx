// @ts-nocheck
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import DrawerIcon from "./illustrations/DrawerIcon";
import drawerIcon from "../assets/drawer-icon.png";
import CheckCircle from "./illustrations/CheckCircle";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import sql from "../lib/db";
import { toast } from "sonner";

const prompts = [
  "Something from a drawer you haven't opened in months",
  "Something you've been keeping just in case",
  "Something expired, broken, or no longer working",
  "Something you own two or more of",
  "Something that belongs to a past version of you",
];

const thoughts = [
  "What if I need this someday?",
  "I feel guilty letting it go",
  "It might still be useful",
  "I feel okay actually",
  "I'm worried I'll regret it",
];

const feelings = [
  "Lighter",
  "Anxious but okay",
  "Proud",
  "Still unsure — but I did it",
];

const motivationalStatements = [
  "Letting go isn't about losing — it's about making room for what truly matters.",
  "You survived without it today. You'll be okay tomorrow too.",
  "Every item you release is proof you are stronger than your fear.",
  "You are not your belongings. You are so much more.",
  "Small acts of courage, done daily, change everything.",
];

const transition = { duration: 0.6, ease: [0.4, 0, 0.2, 1] };

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={transition}
    className="flex flex-col items-center text-center w-full min-h-screen px-6 pt-6 pb-28"
  >
    {children}
  </motion.div>
);

const BottomButton = ({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) => (
  <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center">
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full max-w-[343px] py-4 rounded-2xl font-sans font-semibold text-base tracking-wide transition-all duration-300 ${
        disabled
          ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
          : "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]"
      }`}
    >
      {label}
    </button>
  </div>
);

export default function OneThingOut() {
  const [screen, setScreen] = useState(0);
  const [itemName, setItemName] = useState("");
  const [selectedThoughts, setSelectedThoughts] = useState<string[]>([]);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const todayPrompt = useMemo(() => {
    const day = new Date().getDate();
    return prompts[day % prompts.length];
  }, []);

  const todayMotivation = useMemo(() => {
    const day = new Date().getDate();
    return motivationalStatements[day % motivationalStatements.length];
  }, []);

  const { t } = useTranslation();

  const toggleThought = (t: string) => {
    setSelectedThoughts((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const saveToDatabase = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      console.error("No user_id found in sessionStorage");
      return;
    }

    try {
      await sql`
        INSERT INTO releases (item_name, thoughts, feeling, motivation, user_id)
        VALUES (${itemName}, ${selectedThoughts}, ${selectedFeeling}, ${todayMotivation}, ${userId})
      `;
      console.log("Saved to database");
    } catch (error) {
      console.error("Error saving to database:", error);
      toast.error("Failed to save to database");
    }
  };

  const fetchEntries = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) return;

    setIsLoading(true);
    try {
      const data = await sql`
        SELECT * FROM releases 
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
      `;
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
      toast.error("Failed to fetch history");
    } finally {
      setIsLoading(false);
    }
  };

  const next = async () => {
    if (screen === 3) {
      await saveToDatabase();
    }
    setScreen((s) => Math.min(s + 1, 4));
  };

  if (showHistory) {
    return (
      <div className="min-h-screen bg-background flex justify-center p-6">
        <LanguageSwitcher />
        <div className="w-full max-w-full max-w-2xl flex flex-col pt-12">
          <div className="flex items-center mb-8">
            <button
              onClick={() => setShowHistory(false)}
              className="p-2 -ml-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="font-serif text-2xl font-semibold ml-2">{t("Your History")}</h1>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pb-24">
            {isLoading ? (
              <div className="flex justify-center pt-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : entries.length === 0 ? (
              <p className="text-center text-muted-foreground pt-20">{t("No entries yet. Start your journey today!")}</p>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif font-semibold text-lg">{entry.item_name}</h3>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {new Date(entry.created_at).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter opacity-70">{t("Thoughts")}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {entry.thoughts.map((thought: string, i: number) => (
                        <span key={i} className="bg-muted px-2 py-0.5 rounded text-[11px]">{t(thought)}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter opacity-70 mb-1">{t("Feeling")}</p>
                      <span className="text-sm font-medium text-primary">{t(entry.feeling)}</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      🌿
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center">
            <button
              onClick={() => setShowHistory(false)}
              className="w-full max-w-[343px] py-4 rounded-2xl bg-primary text-primary-foreground font-sans font-semibold text-base tracking-wide shadow-lg shadow-primary/20"
            >
              {t("Back to Practice")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <LanguageSwitcher />
      <div className="w-full max-w-full max-w-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {screen === 0 && (
            <ScreenWrapper key="welcome">
              {/* Back button */}
              <div className="w-full flex items-center mb-4">
                <button className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft size={24} />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center mt-4">
                <img src={drawerIcon} alt="Open box" className="w-24 h-24" />
                <h1 className="font-serif text-3xl font-semibold text-foreground mt-8 leading-tight">
                  {t("One Thing Out")}
                </h1>
                <p className="font-serif italic text-foreground/80 mt-3 text-base leading-relaxed max-w-[280px]">
                  {t("One item. One day. One small act of letting go.")}
                </p>
                <p className="text-muted-foreground text-sm mt-4 leading-relaxed max-w-[260px] opacity-70">
                  {t("Not about decluttering. About practicing the feeling of release.")}
                </p>

                <button
                  onClick={() => {
                    setShowHistory(true);
                    fetchEntries();
                  }}
                  className="mt-12 text-primary font-sans font-semibold text-sm hover:underline flex items-center gap-1 group"
                >
                  {t("See History")}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

              <BottomButton label={t("I'm Ready →")} onClick={next} />
            </ScreenWrapper>
          )}

          {screen === 1 && (
            <ScreenWrapper key="prompt">
              <div className="flex-1 flex flex-col items-center justify-center w-full mt-16">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-8">
                  {t("Today, look for…")}
                </h2>

                <div className="w-full bg-card rounded-2xl p-6 flex flex-col items-center">
                  <DrawerIcon />
                  <p className="font-serif text-lg text-foreground mt-4 leading-relaxed">
                    "{t(todayPrompt)}"
                  </p>
                </div>

                <p className="text-muted-foreground text-sm mt-6 leading-relaxed max-w-[280px] opacity-70">
                  {t("Don't overthink it. The first thing that comes to mind is usually the right one.")}
                </p>
              </div>

              <BottomButton label={t("I Found Something →")} onClick={next} />
            </ScreenWrapper>
          )}

          {screen === 2 && (
            <ScreenWrapper key="reflect">
              <div className="flex-1 flex flex-col items-center w-full mt-16">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  {t("What is it?")}
                </h2>

                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. old charger, magazine from 2019"
                  className="w-full bg-card rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground font-sans text-sm border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                />

                <AnimatePresence>
                  {itemName.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full mt-6"
                    >
                      <p className="font-serif text-foreground/80 text-sm mb-4 leading-relaxed">
                        {t("What thought comes up when you think about letting it go?")}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {thoughts.map((th) => {
                          const selected = selectedThoughts.includes(th);
                          return (
                            <button
                              key={th}
                              onClick={() => toggleThought(th)}
                              className={`rounded-xl px-3 py-3 text-sm font-sans leading-snug transition-all duration-300 ${
                                selected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-card text-foreground"
                              }`}
                            >
                              {t(th)}
                            </button>
                          );
                        })}
                      </div>

                      <p className="font-serif italic text-muted-foreground text-xs mt-5 opacity-70 leading-relaxed">
                        {t("Noticing the thought is the practice. You don't have to fix it.")}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <BottomButton
                label="I See My Thought → Let It Go"
                onClick={next}
                disabled={itemName.trim() === "" || selectedThoughts.length === 0}
              />
            </ScreenWrapper>
          )}

          {screen === 3 && (
            <ScreenWrapper key="closing">
              <div className="flex-1 flex flex-col items-center justify-center w-full mt-16">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  {t("You Let Something Go Today")}
                </h2>

                <p className="font-serif italic text-foreground/80 text-sm leading-relaxed max-w-[280px] mb-8">
                  {t("That wasn't just an object. That was you practicing trust — that you'll be okay without it.")}
                </p>

                <p className="font-serif text-foreground text-base mb-4">
                  {t("How do you feel?")}
                </p>

                <div className="flex flex-wrap justify-center gap-2.5">
                  {feelings.map((f) => {
                    const selected = selectedFeeling === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setSelectedFeeling(f)}
                        className={`rounded-full px-4 py-2.5 text-sm font-sans transition-all duration-300 ${
                          selected
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-foreground"
                        }`}
                      >
                        {t(f)}
                      </button>
                    );
                  })}
                </div>

                <p className="text-muted-foreground text-sm mt-8 opacity-60">
                  🌿 {t("Day 1 of your practice")}
                </p>
              </div>

              <BottomButton
                label={t("See How Far You've Come →")}
                onClick={next}
                disabled={!selectedFeeling}
              />
            </ScreenWrapper>
          )}

          {screen === 4 && (
            <ScreenWrapper key="motivation">
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                <CheckCircle />

                <h2 className="font-serif text-2xl font-semibold text-foreground mt-6 mb-5">
                  {t("Every small step counts.")}
                </h2>

                <p className="font-serif italic text-foreground/80 text-base leading-relaxed max-w-[280px] mb-8">
                  "{t(todayMotivation)}"
                </p>

                <div className="w-full bg-card rounded-2xl p-5">
                  <p className="font-sans text-foreground text-sm">
                    {t("Today's release: 1 item out 🌿")}
                  </p>
                  <p className="font-sans text-muted-foreground text-sm mt-1">
                    {t("Day 1 streak")}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowHistory(true);
                    fetchEntries();
                  }}
                  className="mt-8 text-primary font-sans font-semibold text-sm hover:underline flex items-center gap-1 group"
                >
                  {t("See History")}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

              <BottomButton label={t("Done for Today")} onClick={() => setScreen(0)} />
            </ScreenWrapper>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
