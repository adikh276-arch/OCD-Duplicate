import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col min-h-screen px-6 py-8 relative"
    >
      {/* Back button */}
      <button className="w-9 h-9 rounded-full bg-card border border-accent-border flex items-center justify-center mb-4">
        <ChevronLeft className="w-5 h-5 text-primary" />
      </button>

      {/* Content centered */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <div className="space-y-3">
          <p className="text-[10px] text-hint tracking-[0.08em] uppercase">
            Psychoeducation
          </p>
          <h1 className="text-[19px] font-medium text-foreground leading-[1.3]">
            Things your brain wishes you knew
          </h1>
          <p className="text-[11px] text-muted-foreground leading-[1.7]">
            5 quick facts about trich — no jargon, no judgement.
          </p>
        </div>

        {/* Stacked card preview */}
        <div className="relative w-[220px] h-[140px] mx-auto mt-4">
          {/* Back card */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundColor: "#D8CEFF",
              transform: "rotate(-4deg) translateY(8px) scale(0.92)",
            }}
          />
          {/* Middle card */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundColor: "#E8E3F7",
              transform: "rotate(-2deg) translateY(4px) scale(0.96)",
            }}
          />
          {/* Front card */}
          <div
            className="absolute inset-0 rounded-2xl bg-card flex flex-col items-center justify-center gap-1"
            style={{ border: "0.5px solid hsl(var(--accent-border))" }}
          >
            <span className="text-[10px] text-hint tracking-[0.08em]">
              SWIPE THROUGH
            </span>
            <span className="text-[13px] font-medium text-primary">
              5 cards →
            </span>
          </div>
        </div>
      </div>

      {/* Bottom button */}
      <button
        onClick={onStart}
        className="w-full h-[50px] bg-primary text-primary-foreground rounded-[14px] text-[15px] font-medium"
      >
        Let's Go
      </button>
    </motion.div>
  );
};

export default WelcomeScreen;
