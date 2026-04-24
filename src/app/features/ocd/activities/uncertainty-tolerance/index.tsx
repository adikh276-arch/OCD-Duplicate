import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useActivitySession } from './hooks/useActivitySession';
import ProgressDots from './components/activity/ProgressDots';
import WelcomeScreen from './components/activity/WelcomeScreen';
import NameUncertaintyScreen from './components/activity/NameUncertaintyScreen';
import AcceptBreatheScreen from './components/activity/AcceptBreatheScreen';
import SitWithItScreen from './components/activity/SitWithItScreen';
import NoticeShiftScreen from './components/activity/NoticeShiftScreen';
import ProgressDashboard from './components/activity/ProgressDashboard';

type View = 'activity' | 'dashboard' | 'completed';

const Index = () => {
  const [screen, setScreen] = useState(0);
  const [view, setView] = useState<View>('activity');
  const { session, update, complete } = useActivitySession();

  const next = useCallback(() => setScreen(s => s + 1), []);

  const handleComplete = useCallback(() => {
    complete();
    setView('completed');
  }, [complete]);

  if (view === 'dashboard') {
    return (
      <div className="warm-gradient-bg min-h-screen flex justify-center">
        <div className="w-full max-w-[375px]">
          <ProgressDashboard onBack={() => setView('activity')} />
        </div>
      </div>
    );
  }

  if (view === 'completed') {
    return (
      <div className="warm-gradient-bg min-h-screen flex justify-center">
        <div className="w-full max-w-[375px] flex flex-col items-center justify-center px-6 text-center space-y-6">
          <p className="text-4xl">🌟</p>
          <h1 className="text-2xl font-bold text-foreground">Session Complete</h1>
          <p className="text-muted-foreground">
            You showed up for yourself today. That matters.
          </p>
          <div className="w-full space-y-3 pt-4">
            <button onClick={() => setView('dashboard')} className="btn-secondary-activity">
              View My Progress
            </button>
            <button
              onClick={() => {
                setScreen(0);
                setView('activity');
                window.location.reload();
              }}
              className="btn-primary-activity"
            >
              Done ✓
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="warm-gradient-bg min-h-screen flex justify-center">
      <div className="w-full max-w-[375px] flex flex-col">
        {screen > 0 && screen < 5 && (
          <div className="px-6 pt-4">
            <ProgressDots currentScreen={screen - 1} totalScreens={4} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {screen === 0 && (
            <WelcomeScreen
              key="welcome"
              onBegin={next}
              onBack={() => window.history.back()}
            />
          )}
          {screen === 1 && (
            <NameUncertaintyScreen
              key="name"
              uncertaintyText={session.uncertaintyText}
              discomfortBefore={session.discomfortBefore}
              onUpdate={update}
              onNext={next}
            />
          )}
          {screen === 2 && (
            <AcceptBreatheScreen key="breathe" onNext={next} />
          )}
          {screen === 3 && (
            <SitWithItScreen
              key="sit"
              timerDuration={session.timerDuration}
              onUpdate={update}
              onNext={next}
            />
          )}
          {screen === 4 && (
            <NoticeShiftScreen
              key="shift"
              discomfortBefore={session.discomfortBefore}
              discomfortAfter={session.discomfortAfter}
              statementsChecked={session.statementsChecked}
              reflectionNote={session.reflectionNote}
              onUpdate={update}
              onComplete={handleComplete}
              onViewProgress={() => setView('dashboard')}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
