import React from 'react';
import { Trigger } from './types';

interface Props {
  trigger: Trigger;
  currentIndex: number;
  total: number;
  onRate: (value: number) => void;
  onNext: () => void;
}

const ScreenRateTrigger: React.FC<Props> = ({ trigger, currentIndex, total, onRate, onNext }) => {
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-8" style={{ backgroundColor: '#f0eeff' }}>
      {/* Progress label */}
      <div className="text-[11px] uppercase tracking-wider font-bold mb-3" style={{ color: '#9080d0' }}>
        Rating — {currentIndex + 1} of {total}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[340px] h-1.5 mb-6" style={{ backgroundColor: '#e0d8f8', borderRadius: '20px' }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: '#7060d0', borderRadius: '20px' }}
        />
      </div>

      <h2 className="text-[17px] font-extrabold text-center mb-1" style={{ color: '#2a1a6a' }}>
        How anxious does this make you?
      </h2>
      <p className="text-[12px] text-center mb-8" style={{ color: '#9080d0' }}>
        Slide to rate from 0 to 10.
      </p>

      {/* Trigger card */}
      <div
        className="w-full max-w-[300px] bg-white p-6 flex flex-col items-center mb-8"
        style={{ border: '1.5px solid #d0c8f8', borderRadius: '20px' }}
      >
        <div className="text-[15px] font-bold mb-1" style={{ color: '#2a1a6a' }}>
          {trigger.emoji} {trigger.name}
        </div>
        <div className="text-[11px] capitalize" style={{ color: '#9080d0' }}>
          {trigger.category}
        </div>

        {/* Score */}
        <div className="text-[42px] font-extrabold my-4" style={{ color: '#7060d0' }}>
          {trigger.rating}
        </div>

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={10}
          value={trigger.rating}
          onChange={(e) => onRate(parseInt(e.target.value))}
          className="w-full h-2.5 appearance-none rounded-full outline-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #7060d0 ${trigger.rating * 10}%, #e0d8f8 ${trigger.rating * 10}%)`,
          }}
        />

        {/* Scale labels */}
        <div className="flex justify-between w-full mt-2 text-[11px]" style={{ color: '#9080d0' }}>
          <span>😌 No anxiety</span>
          <span>😰 Extreme</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        className="w-full max-w-[340px] py-3.5 text-[15px] font-bold text-white"
        style={{
          backgroundColor: '#7060d0',
          borderRadius: '20px',
          borderBottom: '4px solid #5040b0',
        }}
      >
        Next →
      </button>
    </div>
  );
};

export default ScreenRateTrigger;
