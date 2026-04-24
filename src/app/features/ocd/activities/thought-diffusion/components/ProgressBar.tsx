import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => (
  <div className="flex items-center justify-between w-full px-1 mb-4">
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
            i < current ? "bg-progress-done" : i === current ? "bg-progress-active" : "bg-secondary"
          }`}
        />
      ))}
    </div>
    <span className="text-[11px] font-body text-muted-foreground">
      {current + 1} of {total}
    </span>
  </div>
);

export default ProgressBar;
