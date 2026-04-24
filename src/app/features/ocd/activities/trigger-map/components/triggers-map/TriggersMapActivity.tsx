import React, { useState, useCallback } from 'react';
import { Trigger, CategoryKey } from './types';
import ScreenIntro from './ScreenIntro';
import ScreenAddTriggers from './ScreenAddTriggers';
import ScreenRateTrigger from './ScreenRateTrigger';
import ScreenMapView from './ScreenMapView';
import ScreenComplete from './ScreenComplete';

type Screen = 'intro' | 'add' | 'rate' | 'map' | 'complete';

const TriggersMapActivity: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('intro');
  const [transitioning, setTransitioning] = useState(false);
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [rateIndex, setRateIndex] = useState(0);

  const goTo = useCallback((next: Screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 600);
  }, []);

  const handleAddTrigger = (t: Omit<Trigger, 'rating'>) => {
    setTriggers((prev) => [...prev, { ...t, rating: 5 }]);
  };

  const handleRemoveTrigger = (name: string, category: CategoryKey) => {
    setTriggers((prev) => prev.filter((t) => !(t.name === name && t.category === category)));
  };

  const handleNextCategory = () => {
    if (categoryIndex < 2) {
      setCategoryIndex((i) => i + 1);
      // Just re-render same screen with new category, with transition
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), 600);
    } else {
      setRateIndex(0);
      goTo('rate');
    }
  };

  const handleRate = (value: number) => {
    setTriggers((prev) =>
      prev.map((t, i) => (i === rateIndex ? { ...t, rating: value } : t))
    );
  };

  const handleNextRate = () => {
    if (rateIndex < triggers.length - 1) {
      setRateIndex((i) => i + 1);
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), 600);
    } else {
      goTo('map');
    }
  };

  const handleAddMore = () => {
    setCategoryIndex(0);
    goTo('add');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'intro':
        return <ScreenIntro onStart={() => { setCategoryIndex(0); goTo('add'); }} onBack={() => {}} />;
      case 'add':
        return (
          <ScreenAddTriggers
            categoryIndex={categoryIndex}
            triggers={triggers}
            onAddTrigger={handleAddTrigger}
            onRemoveTrigger={handleRemoveTrigger}
            onNext={handleNextCategory}
          />
        );
      case 'rate':
        return triggers.length > 0 ? (
          <ScreenRateTrigger
            trigger={triggers[rateIndex]}
            currentIndex={rateIndex}
            total={triggers.length}
            onRate={handleRate}
            onNext={handleNextRate}
          />
        ) : null;
      case 'map':
        return <ScreenMapView triggers={triggers} onSave={() => goTo('complete')} />;
      case 'complete':
        return <ScreenComplete triggers={triggers} onAddMore={handleAddMore} onDone={() => goTo('intro')} />;
    }
  };

  return (
    <div className="max-w-[430px] mx-auto overflow-hidden relative" style={{ minHeight: '100vh' }}>
      <div
        key={`${screen}-${categoryIndex}-${rateIndex}`}
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 600ms ease-in-out, transform 600ms ease-in-out',
        }}
      >
        {renderScreen()}
      </div>
    </div>
  );
};

export default TriggersMapActivity;
