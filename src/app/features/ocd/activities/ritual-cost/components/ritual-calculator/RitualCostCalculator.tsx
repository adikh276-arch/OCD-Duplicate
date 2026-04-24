import { useState, useCallback } from 'react';
import { Ritual, calculateCosts } from './types';
import Screen1Intro from './Screen1Intro';
import Screen2Rituals from './Screen2Rituals';
import Screen3CostReveal from './Screen3CostReveal';
import Screen4Completion from './Screen4Completion';

const RitualCostCalculator = () => {
  const [screen, setScreen] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [rituals, setRituals] = useState<Ritual[]>([]);

  const costs = calculateCosts(rituals);

  const goTo = useCallback((s: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(s);
      setTransitioning(false);
    }, 300);
  }, []);

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-background">
      <div
        className="transition-opacity duration-[600ms] ease-in-out"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        {screen === 1 && (
          <Screen1Intro onNext={() => goTo(2)} onBack={() => {}} />
        )}
        {screen === 2 && (
          <Screen2Rituals
            rituals={rituals}
            setRituals={setRituals}
            onNext={() => goTo(3)}
          />
        )}
        {screen === 3 && (
          <Screen3CostReveal costs={costs} onNext={() => goTo(4)} />
        )}
        {screen === 4 && (
          <Screen4Completion
            costs={costs}
            onStartExposure={() => {/* navigate to Dirty Hands Exposure */}}
            onDone={() => goTo(1)}
          />
        )}
      </div>
    </div>
  );
};

export default RitualCostCalculator;
