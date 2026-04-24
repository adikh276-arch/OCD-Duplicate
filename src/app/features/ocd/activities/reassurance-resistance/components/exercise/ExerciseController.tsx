import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useActivityDB } from '../../../hooks/useActivityDB';
import { toast } from 'sonner';
import Screen1Welcome from './Screen1Welcome';
import Screen2WhatsHappening from './Screen2WhatsHappening';
import Screen3Breathing from './Screen3Breathing';
import Screen4NameIt from './Screen4NameIt';
import Screen5BodyCheck from './Screen5BodyCheck';
import Screen6TheWait from './Screen6TheWait';
import Screen7DuringWait from './Screen7DuringWait';
import Screen8Reflection from './Screen8Reflection';
import Screen9BuildHabit from './Screen9BuildHabit';
import Screen9BSaveSession from './Screen9BSaveSession';
import Screen10Closing from './Screen10Closing';
import ProgressDashboard from './ProgressDashboard';

type Screen = 'welcome' | 'whats-happening' | 'breathing' | 'name-it' | 'body-check' | 'the-wait' | 'during-wait' | 'reflection' | 'build-habit' | 'save-session' | 'closing' | 'dashboard';

interface SessionState {
  worryText: string;
  urgeType: string;
  namingResponse: string;
  bodyAreas: string[];
  timerDuration: number;
  moodEmoji: string;
  reflectionNote: string;
  nextGoal: string;
}

const ExerciseController: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useCallback((next: Screen) => {
    setIsTransitioning(true);
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      setScreen(next);
      setIsTransitioning(false);
    }, 250);
  }, []);

  useEffect(() => () => { if (transitionTimeout.current) clearTimeout(transitionTimeout.current); }, []);
  const [sessionData, setSessionData] = useState<SessionState>({
    worryText: '',
    urgeType: '',
    namingResponse: '',
    bodyAreas: [],
    timerDuration: 0,
    moodEmoji: '',
    reflectionNote: '',
    nextGoal: '',
  });

  const update = useCallback((partial: Partial<SessionState>) => {
    setSessionData(prev => ({ ...prev, ...partial }));
  }, []);

  const { executeQuery } = useActivityDB("reassurance-resistance");

  const saveSession = async () => {
    try {
      const success = await executeQuery("save_session", {
        worry_text: sessionData.worryText,
        reassurance_urge_type: sessionData.urgeType,
        body_areas: sessionData.bodyAreas,
        timer_duration: sessionData.timerDuration,
        mood_emoji: sessionData.moodEmoji,
        reflection_note: sessionData.reflectionNote,
        next_time_goal: sessionData.nextGoal,
        naming_response: sessionData.namingResponse,
        is_completed: true,
      });
      if (!success) throw new Error();
      toast.success('Session saved!');
      setScreen('dashboard');
    } catch {
      toast.error('Failed to save session');
    }
  };

  const resetAndStart = () => {
    setSessionData({
      worryText: '',
      urgeType: '',
      namingResponse: '',
      bodyAreas: [],
      timerDuration: 0,
      moodEmoji: '',
      reflectionNote: '',
      nextGoal: '',
    });
    navigate('welcome');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <Screen1Welcome onNext={() => navigate('whats-happening')} onBack={() => {}} />;
      case 'whats-happening':
        return (
          <Screen2WhatsHappening
            onNext={(worry, urge) => {
              update({ worryText: worry, urgeType: urge });
              navigate('breathing');
            }}
          />
        );
      case 'breathing':
        return <Screen3Breathing onNext={() => navigate('name-it')} />;
      case 'name-it':
        return (
          <Screen4NameIt
            onNext={(response) => {
              update({ namingResponse: response });
              navigate('body-check');
            }}
          />
        );
      case 'body-check':
        return (
          <Screen5BodyCheck
            onNext={(areas) => {
              update({ bodyAreas: areas });
              navigate('the-wait');
            }}
          />
        );
      case 'the-wait':
        return (
          <Screen6TheWait
            onNext={(duration) => {
              update({ timerDuration: duration });
              navigate('during-wait');
            }}
          />
        );
      case 'during-wait':
        return <Screen7DuringWait onNext={() => navigate('reflection')} />;
      case 'reflection':
        return (
          <Screen8Reflection
            onNext={(emoji, note) => {
              update({ moodEmoji: emoji, reflectionNote: note });
              navigate('build-habit');
            }}
          />
        );
      case 'build-habit':
        return (
          <Screen9BuildHabit
            onNext={(goal) => {
              update({ nextGoal: goal });
              navigate('save-session');
            }}
          />
        );
      case 'save-session':
        return (
          <Screen9BSaveSession
            sessionData={sessionData}
            onSave={saveSession}
            onSkip={() => navigate('closing')}
          />
        );
      case 'closing':
        return (
          <Screen10Closing
            onViewProgress={() => navigate('dashboard')}
            onComplete={resetAndStart}
          />
        );
      case 'dashboard':
        return <ProgressDashboard onBack={resetAndStart} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`transition-opacity duration-250 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
    >
      {renderScreen()}
    </div>
  );
};

export default ExerciseController;
