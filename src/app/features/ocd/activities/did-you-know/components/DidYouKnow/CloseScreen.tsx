import { motion } from "framer-motion";
import { Brain } from "lucide-react";

interface CloseScreenProps {
  onReadAgain: () => void;
  onDone: () => void;
}

const CloseScreen = ({ onReadAgain, onDone }: CloseScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col min-h-screen px-6 py-8"
    >
      {/* Content centered */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <div className="space-y-3">
          <p className="text-[10px] text-hint tracking-[0.08em] uppercase">
            All Done
          </p>
          <h1 className="text-[19px] font-medium text-foreground leading-[1.3]">
            Now you know
          </h1>
          <p className="text-[11px] text-muted-foreground leading-[1.7] max-w-[260px]">
            Knowledge doesn't cure trich. But it's where everything else begins.
          </p>
        </div>

        {/* Statement card */}
        <div
          className="w-full bg-card rounded-[22px] py-8 px-6 flex flex-col items-center gap-3"
          style={{ border: "0.5px solid hsl(var(--border))" }}
        >
          <div className="w-11 h-11 rounded-full bg-light-fill flex items-center justify-center">
            <Brain className="w-5 h-5 text-accent-border" />
          </div>
          <p className="text-[16px] font-medium text-foreground">
            You showed up to learn.
          </p>
          <p className="text-[12px] text-hint">That's not small.</p>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="flex gap-3">
        <button
          onClick={onReadAgain}
          className="flex-1 h-12 rounded-xl text-[14px] font-medium bg-light-fill"
          style={{ color: "#5B3FA6" }}
        >
          Read Again
        </button>
        <button
          onClick={onDone}
          className="flex-1 h-12 rounded-xl text-[14px] font-medium bg-primary text-primary-foreground"
        >
          I'm Done
        </button>
      </div>
    </motion.div>
  );
};

export default CloseScreen;
