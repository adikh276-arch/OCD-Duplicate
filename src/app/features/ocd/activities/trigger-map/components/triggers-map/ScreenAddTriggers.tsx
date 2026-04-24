import React, { useState } from 'react';
import { CATEGORIES, Trigger, CategoryKey } from './types';

interface Props {
  categoryIndex: number;
  triggers: Trigger[];
  onAddTrigger: (trigger: Omit<Trigger, 'rating'>) => void;
  onRemoveTrigger: (name: string, category: CategoryKey) => void;
  onNext: () => void;
}

const ScreenAddTriggers: React.FC<Props> = ({ categoryIndex, triggers, onAddTrigger, onRemoveTrigger, onNext }) => {
  const [customText, setCustomText] = useState('');
  const cat = CATEGORIES[categoryIndex];
  const catTriggers = triggers.filter((t) => t.category === cat.key);
  const selectedNames = new Set(catTriggers.map((t) => t.name));

  const handleSuggestionClick = (s: { emoji: string; name: string }) => {
    if (selectedNames.has(s.name)) {
      onRemoveTrigger(s.name, cat.key);
    } else {
      onAddTrigger({ name: s.name, emoji: s.emoji, category: cat.key });
    }
  };

  const handleAddCustom = () => {
    const trimmed = customText.trim();
    if (trimmed && !selectedNames.has(trimmed)) {
      onAddTrigger({ name: trimmed, emoji: '✏️', category: cat.key });
      setCustomText('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-8" style={{ backgroundColor: '#fff8f0' }}>
      {/* Category label */}
      <div className="text-[11px] uppercase tracking-wider font-bold mb-3" style={{ color: '#c09060' }}>
        Category: {cat.label} {cat.emoji}
      </div>

      <h2 className="text-[17px] font-extrabold text-center mb-1" style={{ color: '#5a2e10' }}>
        Which {cat.label.toLowerCase()} trigger you?
      </h2>
      <p className="text-[12px] text-center mb-6" style={{ color: '#c09060' }}>
        Tap to add. Be as specific as you like.
      </p>

      {/* Suggestion chips */}
      <div className="flex flex-wrap justify-center gap-2 max-w-[340px] mb-6">
        {cat.suggestions.map((s) => {
          const selected = selectedNames.has(s.name);
          return (
            <button
              key={s.name}
              onClick={() => handleSuggestionClick(s)}
              className="px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200"
              style={{
                backgroundColor: selected ? '#ffe8c8' : '#fff',
                border: '1.5px solid #f0c890',
                borderRadius: '20px',
                color: '#8a4a20',
              }}
            >
              {s.emoji} {s.name}
            </button>
          );
        })}
      </div>

      {/* Added so far */}
      {catTriggers.length > 0 && (
        <div className="w-full max-w-[340px] mb-6">
          <div className="text-[12px] font-bold mb-2" style={{ color: '#8a4a20' }}>Added so far</div>
          <div className="flex flex-wrap gap-2">
            {catTriggers.map((t) => (
              <span
                key={t.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold"
                style={{ backgroundColor: '#ffe8c8', color: '#8a4a20', border: '1px solid #f0c890', borderRadius: '20px' }}
              >
                {t.emoji} {t.name}
                <button onClick={() => onRemoveTrigger(t.name, cat.key)} className="ml-0.5 font-bold text-[14px] leading-none" style={{ color: '#c09060' }}>✕</button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Custom input */}
      <div className="w-full max-w-[340px] flex gap-2 mb-8">
        <input
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
          placeholder="Add your own…"
          className="flex-1 px-4 py-2.5 text-[13px] bg-white outline-none"
          style={{ border: '1.5px solid #f0d8b8', borderRadius: '12px', color: '#5a2e10' }}
        />
        <button
          onClick={handleAddCustom}
          className="px-4 py-2.5 text-[13px] font-bold text-white"
          style={{ backgroundColor: '#e8955a', borderRadius: '12px' }}
        >
          +
        </button>
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        disabled={catTriggers.length === 0}
        className="w-full max-w-[340px] py-3.5 text-[15px] font-bold text-white disabled:opacity-40 transition-opacity"
        style={{
          backgroundColor: '#e8955a',
          borderRadius: '20px',
          borderBottom: '4px solid #c87040',
        }}
      >
        {categoryIndex < 2 ? `Next: ${CATEGORIES[categoryIndex + 1].label} ${CATEGORIES[categoryIndex + 1].emoji}` : 'Rate These →'}
      </button>
    </div>
  );
};

export default ScreenAddTriggers;
