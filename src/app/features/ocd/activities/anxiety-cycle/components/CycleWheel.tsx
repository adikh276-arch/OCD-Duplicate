import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const NODES = [
  { key: 'trigger', emoji: "⚡" },
  { key: 'anxiety', emoji: "😰" },
  { key: 'check', emoji: "📱" },
  { key: 'relief', emoji: "😮‍💨" },
  { key: 'doubt', emoji: "🔄" },
];

// Positions around a circle (top, then clockwise)
const getNodePosition = (index: number, radius: number, centerX: number, centerY: number) => {
  const angle = (index * 72 - 90) * (Math.PI / 180); // Start from top, 72° apart
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
};

interface CycleWheelProps {
  animated?: boolean;
  interactive?: boolean;
  activeNode?: number | null;
  onNodeTap?: (index: number) => void;
}

const CycleWheel = ({ animated = false, interactive = false, activeNode: externalActive, onNodeTap }: CycleWheelProps) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showRestart, setShowRestart] = useState(false);

  const centerX = 150;
  const centerY = 140;
  const radius = 100;

  useEffect(() => {
    if (!animated) return;

    const cycleDuration = 8000;
    const nodeTime = cycleDuration / 5;
    let timer: ReturnType<typeof setInterval>;
    let restartTimer: ReturnType<typeof setTimeout>;

    const runCycle = () => {
      let step = 0;
      setShowRestart(false);
      setActiveIndex(0);

      timer = setInterval(() => {
        step++;
        if (step < 5) {
          setActiveIndex(step);
          setShowRestart(false);
        }
        if (step === 4) {
          // Show restart text briefly after node 5
          restartTimer = setTimeout(() => setShowRestart(true), 800);
        }
        if (step >= 5) {
          // Restart
          step = -1;
          setShowRestart(false);
          setActiveIndex(0);
        }
      }, nodeTime);
    };

    runCycle();
    return () => {
      clearInterval(timer);
      clearTimeout(restartTimer);
    };
  }, [animated, animated]);

  const currentActive = interactive ? externalActive : activeIndex;

  const nodePositions = NODES.map((_, i) => getNodePosition(i, radius, centerX, centerY));

  // Generate arrow paths between nodes
  const getArrowPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const midX = (from.x + to.x) / 2 + (centerX - (from.x + to.x) / 2) * 0.3;
    const midY = (from.y + to.y) / 2 + (centerY - (from.y + to.y) / 2) * 0.3;
    return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
  };

  return (
    <div className="relative">
      <svg viewBox="0 0 300 280" className="w-full max-w-[300px] mx-auto">
        {/* Connecting arrows */}
        {NODES.map((_, i) => {
          const from = nodePositions[i];
          const to = nodePositions[(i + 1) % 5];
          const isActive = animated ? (currentActive !== null && currentActive !== undefined && currentActive >= i) : true;

          return (
            <path
              key={`arrow-${i}`}
              d={getArrowPath(from, to)}
              stroke={isActive ? "hsl(250 40% 70%)" : "hsl(230 20% 88%)"}
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 3"
              style={{ transition: "stroke 0.5s ease" }}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const pos = nodePositions[i];
          const isActive = currentActive === i;

          return (
            <g
              key={i}
              onClick={() => interactive && onNodeTap?.(i)}
              style={{ cursor: interactive ? "pointer" : "default" }}
            >
              <rect
                x={pos.x - 38}
                y={pos.y - 18}
                width="76"
                height="36"
                rx="18"
                fill={isActive ? "hsl(250 45% 92%)" : "hsl(240 30% 97%)"}
                stroke={isActive ? "hsl(250 40% 65%)" : "hsl(230 20% 85%)"}
                strokeWidth={isActive ? "2" : "1"}
                style={{
                  transition: "all 0.3s ease",
                  filter: isActive ? "drop-shadow(0 0 12px hsl(250 40% 55% / 0.3))" : "none",
                }}
              />
              <text
                x={pos.x}
                y={pos.y - 2}
                textAnchor="middle"
                fontSize="13"
                fill="hsl(240 20% 20%)"
              >
                {node.emoji}
              </text>
              <text
                x={pos.x}
                y={pos.y + 12}
                textAnchor="middle"
                fontSize="8"
                fontWeight="600"
                fill="hsl(240 20% 30%)"
              >
                {t(`nodes.${node.key}.label`)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active node description (animated mode) */}
      {animated && currentActive !== null && currentActive !== undefined && currentActive >= 0 && (
        <p
          key={currentActive}
          className="text-center text-sm text-muted-foreground italic mt-2 animate-fade-up px-6"
        >
          {NODES[currentActive].emoji} "{t(`nodes.${NODES[currentActive].key}.desc`)}"
        </p>
      )}

      {/* Restart label */}
      {animated && showRestart && (
        <p className="text-center text-xs text-calm-purple mt-1 animate-fade-up">
          {t('cycle.restart')}
        </p>
      )}
    </div>
  );
};

export default CycleWheel;
export { NODES };