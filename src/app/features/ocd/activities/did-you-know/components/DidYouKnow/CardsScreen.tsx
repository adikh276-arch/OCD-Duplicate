import { useState, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cards } from "./cardData";

interface CardsScreenProps {
  onDone: () => void;
}

const SWIPE_THRESHOLD = 50;

const CardsScreen = ({ onDone }: CardsScreenProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const isLast = current === cards.length - 1;
  const isFirst = current === 0;

  const go = useCallback(
    (dir: 1 | -1) => {
      const next = current + dir;
      if (next < 0 || next >= cards.length) return;
      setDirection(dir);
      setCurrent(next);
    },
    [current]
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && !isLast) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD && !isFirst) go(-1);
  };

  const card = cards[current];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col min-h-screen px-6 py-8"
    >
      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {cards.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: i === current ? 18 : 6,
              height: 6,
              backgroundColor:
                i === current
                  ? "hsl(var(--primary))"
                  : "hsl(var(--accent-border))",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ x: direction * 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -300, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            className="w-full bg-card rounded-[22px] p-5 cursor-grab active:cursor-grabbing"
            style={{ border: "0.5px solid hsl(var(--border))" }}
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-medium text-primary bg-light-fill px-3 py-1 rounded-full">
                DID YOU KNOW?
              </span>
              <span className="text-[10px] text-accent-border">
                {current + 1} of 5
              </span>
            </div>

            {/* Big number */}
            <p className="text-[30px] font-medium text-light-fill leading-none mb-2">
              {card.number}
            </p>

            {/* Title */}
            <h2 className="text-[14px] font-medium text-foreground leading-[1.4] mb-3">
              {card.title}
            </h2>

            {/* Body */}
            <p className="text-[11px] leading-[1.75] mb-4" style={{ color: "#666" }}>
              {card.body}
            </p>

            {/* Quote block */}
            <div
              className="bg-soft-fill rounded-r-[10px] px-3 py-2"
              style={{ borderLeft: "2.5px solid hsl(var(--hint))" }}
            >
              <p className="text-[11px] italic" style={{ color: "#5B3FA6" }}>
                {card.quote}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => go(-1)}
          disabled={isFirst}
          className="w-9 h-9 rounded-full bg-card flex items-center justify-center transition-opacity"
          style={{
            border: "0.5px solid hsl(var(--accent-border))",
            opacity: isFirst ? 0.2 : 1,
          }}
        >
          <ChevronLeft className="w-4 h-4 text-primary" />
        </button>

        {isLast ? (
          <button
            onClick={onDone}
            className="bg-primary text-primary-foreground text-[13px] font-medium rounded-xl px-5 py-2.5"
          >
            I'm Done
          </button>
        ) : (
          <span className="text-[10px] text-hint">swipe or tap</span>
        )}

        <button
          onClick={() => go(1)}
          disabled={isLast}
          className="w-9 h-9 rounded-full bg-card flex items-center justify-center transition-opacity"
          style={{
            border: "0.5px solid hsl(var(--accent-border))",
            opacity: isLast ? 0.2 : 1,
          }}
        >
          <ChevronRight className="w-4 h-4 text-primary" />
        </button>
      </div>
    </motion.div>
  );
};

export default CardsScreen;
