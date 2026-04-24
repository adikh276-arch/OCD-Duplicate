interface Props {
  score: number | null;
  onSelect: (n: number) => void;
}

const DiscomfortBubbles = ({ score, onSelect }: Props) => {
  const bubbles = Array.from({ length: 11 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3 justify-items-center">
        {bubbles.map(n => (
          <button
            key={n}
            onClick={() => onSelect(n)}
            className={`bubble ${score === n ? 'bubble-selected' : ''}`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="space-y-1 text-sm text-muted-foreground text-center">
        <p>0–3 😌 Manageable</p>
        <p>4–6 😟 Noticeable</p>
        <p>7–10 😰 Overwhelming</p>
      </div>
    </div>
  );
};

export default DiscomfortBubbles;
