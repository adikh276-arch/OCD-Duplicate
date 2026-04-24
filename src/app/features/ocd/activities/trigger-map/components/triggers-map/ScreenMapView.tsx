import React from 'react';
import { Trigger } from './types';

interface Props {
  triggers: Trigger[];
  onSave: () => void;
}

const getBadgeStyle = (rating: number) => {
  if (rating <= 3) return { backgroundColor: '#ddffdd', color: '#226622' };
  if (rating <= 6) return { backgroundColor: '#fff3cc', color: '#aa7700' };
  if (rating <= 8) return { backgroundColor: '#ffe0cc', color: '#cc5500' };
  return { backgroundColor: '#ffdddd', color: '#cc3333' };
};

const sections: { key: string; label: string; emoji: string; color: string }[] = [
  { key: 'places', label: 'Places', emoji: '📍', color: '#0f6e56' },
  { key: 'situations', label: 'Situations', emoji: '🔄', color: '#c87040' },
  { key: 'people', label: 'People', emoji: '👤', color: '#7060d0' },
];

const ScreenMapView: React.FC<Props> = ({ triggers, onSave }) => {
  const sorted = [...triggers].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-8" style={{ backgroundColor: '#f8f8ff' }}>
      <h2 className="text-[17px] font-extrabold text-center mb-1" style={{ color: '#1a1a3a' }}>
        Your Triggers Map 🗺️
      </h2>
      <p className="text-[12px] text-center mb-6" style={{ color: '#9090b0' }}>
        Here's everything OCD is using against you.
      </p>

      <div className="w-full max-w-[340px] space-y-5 mb-8">
        {sections.map((sec) => {
          const items = sorted.filter((t) => t.category === sec.key);
          if (items.length === 0) return null;
          return (
            <div key={sec.key}>
              <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: sec.color }}>
                {sec.emoji} {sec.label}
              </div>
              <div className="space-y-2">
                {items.map((t) => {
                  const badge = getBadgeStyle(t.rating);
                  return (
                    <div
                      key={t.name}
                      className="flex items-center justify-between bg-white px-4 py-3"
                      style={{ border: '1px solid #e8e8f0', borderRadius: '12px' }}
                    >
                      <span className="text-[12px] font-bold" style={{ color: '#1a1a3a' }}>
                        {t.emoji} {t.name}
                      </span>
                      <span
                        className="text-[12px] font-bold px-2.5 py-0.5"
                        style={{ ...badge, borderRadius: '10px' }}
                      >
                        {t.rating}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onSave}
        className="w-full max-w-[340px] py-3.5 text-[15px] font-bold text-white"
        style={{
          backgroundColor: '#1a1a3a',
          borderRadius: '20px',
          borderBottom: '4px solid #000020',
        }}
      >
        Save My Map
      </button>
    </div>
  );
};

export default ScreenMapView;
