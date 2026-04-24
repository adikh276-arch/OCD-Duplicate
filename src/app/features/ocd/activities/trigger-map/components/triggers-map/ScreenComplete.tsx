import React from 'react';
import { Trigger, CATEGORIES } from './types';

interface Props {
  triggers: Trigger[];
  onAddMore: () => void;
  onDone: () => void;
}

const ScreenComplete: React.FC<Props> = ({ triggers, onAddMore, onDone }) => {
  const highTriggers = triggers.filter((t) => t.rating >= 7);
  const categoryCounts: Record<string, number> = {};
  const categoryHighCounts: Record<string, number> = {};

  triggers.forEach((t) => {
    categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
  });
  highTriggers.forEach((t) => {
    categoryHighCounts[t.category] = (categoryHighCounts[t.category] || 0) + 1;
  });

  const categoriesMapped = Object.keys(categoryCounts).length;

  // Find top category by high-rated triggers
  let topCategoryKey = '';
  let topCount = 0;
  Object.entries(categoryHighCounts).forEach(([k, v]) => {
    if (v > topCount) { topCount = v; topCategoryKey = k; }
  });
  if (!topCategoryKey && triggers.length > 0) {
    // fallback: most triggers
    Object.entries(categoryCounts).forEach(([k, v]) => {
      if (v > topCount) { topCount = v; topCategoryKey = k; }
    });
  }

  const topCat = CATEGORIES.find((c) => c.key === topCategoryKey);
  const sorted = [...triggers].sort((a, b) => b.rating - a.rating);
  const top2 = sorted.slice(0, 2).map((t) => `${t.emoji} ${t.name}`).join(' and ');

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-8" style={{ backgroundColor: '#fffbe8' }}>
      <div className="text-[60px] mb-4">🎉</div>
      <h1 className="text-[22px] font-extrabold mb-2" style={{ color: '#4a3800' }}>Map saved!</h1>
      <p className="text-[12px] text-center mb-6" style={{ color: '#a09030' }}>
        You've made OCD visible. That's powerful.
      </p>

      {/* Insight card */}
      <div className="w-full max-w-[340px] bg-white p-4 mb-4" style={{ border: '1.5px solid #e8d888', borderRadius: '16px' }}>
        <div className="text-[11px] font-bold mb-2" style={{ color: '#a09030' }}>💡 Your insight</div>
        <p className="text-[12px]" style={{ color: '#4a3800' }}>
          Your highest triggers are in {topCat?.label || 'your categories'} — especially {top2 || 'your top picks'}. These could be good starting points for your fear ladder.
        </p>
      </div>

      {/* Badge card */}
      <div className="w-full max-w-[340px] bg-white p-4 flex items-center gap-3 mb-4" style={{ border: '1.5px solid #e8d888', borderRadius: '16px' }}>
        <span className="text-[32px]">🏅</span>
        <div className="flex-1">
          <div className="text-[13px] font-bold" style={{ color: '#4a3800' }}>Trigger Spotter</div>
          <div className="text-[11px]" style={{ color: '#a09030' }}>Badge unlocked!</div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5" style={{ backgroundColor: '#f0c030', color: '#3a2800', borderRadius: '10px' }}>NEW</span>
      </div>

      {/* Stats */}
      <div className="w-full max-w-[340px] grid grid-cols-3 gap-2 mb-8">
        {[
          { label: 'Total triggers', value: triggers.length },
          { label: 'High (7+)', value: highTriggers.length, red: true },
          { label: 'Categories', value: categoriesMapped },
        ].map((s) => (
          <div key={s.label} className="bg-white p-3 flex flex-col items-center text-center" style={{ border: '1px solid #e8d888', borderRadius: '12px' }}>
            <div className="text-[20px] font-extrabold" style={{ color: s.red ? '#cc3333' : '#4a3800' }}>{s.value}</div>
            <div className="text-[10px]" style={{ color: '#a09030' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <button
        onClick={onAddMore}
        className="w-full max-w-[340px] py-3.5 text-[15px] font-bold mb-3"
        style={{
          backgroundColor: '#f0c030',
          color: '#3a2800',
          borderRadius: '20px',
          borderBottom: '4px solid #c8a010',
        }}
      >
        Add More Triggers
      </button>
      <button
        onClick={onDone}
        className="w-full max-w-[340px] py-3 text-[14px] font-bold bg-transparent"
        style={{
          border: '1.5px solid #e8d888',
          color: '#a09030',
          borderRadius: '20px',
        }}
      >
        Done for Today
      </button>
    </div>
  );
};

export default ScreenComplete;
