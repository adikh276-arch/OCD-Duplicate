import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";

interface MirrorMomentScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

const emojiMap = ["🌿", "💙", "🌊", "✨", "🤍", "🌸", "💛"];

const MirrorMomentScreen = ({ onBack, onComplete }: MirrorMomentScreenProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxViewed, setMaxViewed] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const affirmationsCount = (t("mirror.affirmations", { returnObjects: true }) as string[]).length;
  const allViewed = maxViewed >= affirmationsCount - 1;

  useEffect(() => {
    if (currentIndex > maxViewed) setMaxViewed(currentIndex);
  }, [currentIndex, maxViewed]);

  const goTo = useCallback((idx: number, dir: "left" | "right") => {
    if (idx < 0 || idx >= affirmationsCount) return;
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex(idx);
      setDirection(null);
    }, 200);
  }, [affirmationsCount]);

  const handleComplete = () => {
    setShowCompletion(true);
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 50) goTo(currentIndex - 1, "right");
    else if (diff < -50) goTo(currentIndex + 1, "left");
    setTouchStart(null);
  };

  if (showCompletion) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-warm-glow flex flex-col items-center text-center px-8 rounded-3xl py-16"
          style={{ background: `radial-gradient(circle, hsl(var(--warm-peach)) 0%, hsl(var(--warm-glow)) 40%, hsl(var(--background)) 80%)` }}>
          <p className="animate-gentle-fade font-display text-2xl text-foreground leading-relaxed max-w-[280px] whitespace-pre-line">
            {t("mirror.completion_msg")}
          </p>
        </div>
      </div>
    );
  }

  const affirmation = (t("mirror.affirmations", { returnObjects: true }) as string[])[currentIndex];
  const emoji = emojiMap[currentIndex % emojiMap.length];

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-background bg-texture">
      <LanguageSwitcher />
      {/* Back */}
      <button
        onClick={onBack}
        className="absolute left-4 top-4 text-muted-foreground font-body text-xl hover:text-foreground transition-colors z-10"
        aria-label={t("mirror.back")}
      >
        ←
      </button>

      {/* Header */}
      <div className="pt-14 px-8 text-center max-w-[375px]">
        <h1 className="font-display text-2xl font-semibold text-warm-rose mb-3">
          {t("mirror.title")}
        </h1>
        <p className="font-body text-sm text-foreground/70 leading-relaxed mb-6 max-w-[300px] mx-auto">
          {t("mirror.description")}
        </p>
      </div>

      {/* Card area */}
      <div className="flex flex-1 items-center justify-center w-full max-w-[375px] px-4 relative">
        {/* Left arrow */}
        <button
          onClick={() => goTo(currentIndex - 1, "right")}
          disabled={currentIndex === 0}
          className="absolute left-2 text-2xl text-muted-foreground disabled:opacity-20 hover:text-warm-rose transition-colors z-10"
          aria-label={t("mirror.prev")}
        >
          ‹
        </button>

        {/* Card */}
        <div
          className={`w-full max-w-[280px] mx-auto transition-all duration-200 ease-out ${
            direction === "left" ? "opacity-0 -translate-x-4" :
            direction === "right" ? "opacity-0 translate-x-4" :
            "opacity-100 translate-x-0"
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="rounded-2xl border border-warm-peach bg-card p-8 shadow-lg shadow-warm-rose/10 text-center">
            <div className="text-5xl mb-5">{emoji}</div>
            <p className="font-display text-xl text-foreground leading-relaxed whitespace-pre-line">
              {affirmation}
            </p>
          </div>
          <p className="font-body italic text-xs text-muted-foreground text-center mt-4">
            {t("mirror.read_again")}
          </p>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => goTo(currentIndex + 1, "left")}
          disabled={currentIndex === affirmationsCount - 1}
          className="absolute right-2 text-2xl text-muted-foreground disabled:opacity-20 hover:text-warm-rose transition-colors z-10"
          aria-label={t("mirror.next")}
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 justify-center py-4">
        {Array.from({ length: affirmationsCount }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === currentIndex ? "bg-warm-rose" : "bg-warm-peach"
            }`}
          />
        ))}
      </div>

      {/* Bottom button */}
      <div className="w-full max-w-[375px] px-8 pb-10">
        {allViewed ? (
          <Button variant="default" size="lg" className="h-14 text-lg" onClick={handleComplete}>
            {t("mirror.complete")}
          </Button>
        ) : (
          <div className="h-14" />
        )}
      </div>
    </div>
  );
};


export default MirrorMomentScreen;


