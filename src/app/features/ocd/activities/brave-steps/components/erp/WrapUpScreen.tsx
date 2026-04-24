import { useState } from "react";

interface WrapUpScreenProps {
  beforeAnxiety: number;
  surface: string;
  duration: number;
  onTryHarder: () => void;
  onDone: () => void;
}

const WrapUpScreen = ({ beforeAnxiety, surface, duration, onTryHarder, onDone }: WrapUpScreenProps) => {
  const [afterAnxiety] = useState(Math.max(1, beforeAnxiety - 4));
  const drop = beforeAnxiety - afterAnxiety;
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col h-full px-5 py-6">
      <h1 className="text-bark text-xl font-medium mb-4">How do you feel now? 🎉</h1>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1 text-sm text-bark">
          <span className="font-medium">Before:</span>
          <span className="bg-sandy px-2 py-0.5 rounded-md">{beforeAnxiety}</span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="flex items-center gap-1 text-sm text-bark">
          <span className="font-medium">After:</span>
          <span className="bg-sandy px-2 py-0.5 rounded-md">{afterAnxiety}</span>
        </div>
        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
          Dropped by {drop}
        </span>
      </div>

      <hr className="border-border mb-4" />

      <label className="text-bark text-xs font-medium mb-1.5">What did you notice?</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write anything from this session…"
        className="w-full bg-sandy-light border border-border rounded-[13px] p-3 text-sm text-bark placeholder:text-muted-foreground resize-none h-20 mb-4 focus:outline-none focus:ring-1 focus:ring-primary"
      />

      <div className="bg-sandy rounded-[13px] border border-primary p-4 flex items-center gap-3 mb-4">
        <span className="text-2xl">🏅</span>
        <div>
          <p className="text-bark text-sm font-medium">Brave Hands</p>
          <p className="text-muted-foreground text-xs">Badge unlocked</p>
        </div>
      </div>

      <hr className="border-border mb-4" />

      <div className="flex flex-col gap-2 text-sm mb-auto">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Surface</span>
          <span className="text-bark font-medium">{surface}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Time held</span>
          <span className="text-bark font-medium">{duration} mins</span>
        </div>
      </div>

      <button
        onClick={onTryHarder}
        className="w-full bg-primary text-primary-foreground text-sm font-medium py-3.5 rounded-[14px] mt-5"
      >
        Try a harder level
      </button>
      <button
        onClick={onDone}
        className="w-full text-bark text-sm font-medium py-3 mt-2"
      >
        Done for today
      </button>
    </div>
  );
};

export default WrapUpScreen;
