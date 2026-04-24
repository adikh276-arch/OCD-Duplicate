interface ImpactSliderProps {
  emoji: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const getColor = (value: number) => {
  if (value <= 3) return "hsl(var(--primary))";
  if (value <= 6) return "hsl(45, 90%, 55%)";
  return "hsl(var(--destructive))";
};

const ImpactSlider = ({ emoji, label, value, onChange }: ImpactSliderProps) => {
  const percentage = (value / 10) * 100;
  const color = getColor(value);

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{emoji}</span>
          <span className="font-semibold text-foreground text-sm">{label}</span>
        </div>
        <span
          className="font-bold text-xs px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {value}/10
        </span>
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">None</span>
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">High</span>
      </div>

      <div className="relative h-2.5 w-full">
        {/* Track background */}
        <div className="absolute inset-0 rounded-full bg-muted" />
        {/* Filled track */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-150"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
        {/* Native input */}
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-card rounded-full border-2 shadow-md pointer-events-none z-20 transition-all duration-150"
          style={{
            left: `calc(${percentage}% - 9px)`,
            borderColor: color,
            width: "18px",
            height: "18px",
          }}
        />
      </div>
    </div>
  );
};

export default ImpactSlider;
