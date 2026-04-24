import React from 'react';

interface Props {
  onStart: () => void;
  onBack: () => void;
}

const ScreenIntro: React.FC<Props> = ({ onStart, onBack }) => {
  const features = [
    { emoji: '📍', title: 'Places', subtitle: 'Locations that feel contaminating' },
    { emoji: '🔄', title: 'Situations', subtitle: 'Things that happen and trigger you' },
    { emoji: '👤', title: 'People', subtitle: 'Contact with others that triggers you' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-8" style={{ backgroundColor: '#e8f8f2' }}>
      {/* Back button */}
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full"
          style={{ backgroundColor: '#0f6e56', color: '#fff', fontSize: '18px', fontWeight: 700 }}
        >
          ‹
        </button>
      </div>

      {/* Hero */}
      <div className="text-center mb-8">
        <div className="text-[60px] mb-4">🗺️</div>
        <h1 className="text-[22px] font-extrabold mb-2" style={{ color: '#0f4f38' }}>
          My Triggers Map
        </h1>
        <p className="text-[12px] max-w-[280px] mx-auto" style={{ color: '#4a9a70' }}>
          Every contamination fear has a trigger. This activity helps you spot yours — so OCD has nowhere left to hide.
        </p>
      </div>

      {/* Feature cards */}
      <div className="w-full max-w-[340px] space-y-3 mb-8">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex items-start gap-3 p-4 bg-white"
            style={{ border: '1.5px solid #c8e8d8', borderRadius: '18px' }}
          >
            <span className="text-[28px] mt-0.5">{f.emoji}</span>
            <div>
              <div className="text-[14px] font-bold" style={{ color: '#0f4f38' }}>{f.title}</div>
              <div className="text-[12px]" style={{ color: '#4a9a70' }}>{f.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="w-full max-w-[340px] py-3.5 text-[15px] font-bold text-white"
        style={{
          backgroundColor: '#1d9e75',
          borderRadius: '20px',
          borderBottom: '4px solid #0f6e56',
        }}
      >
        Start Mapping
      </button>
    </div>
  );
};

export default ScreenIntro;
