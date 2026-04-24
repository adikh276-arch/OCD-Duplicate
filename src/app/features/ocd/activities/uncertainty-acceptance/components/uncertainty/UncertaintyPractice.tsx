import React, { useState, useCallback } from "react";
import Screen1Intro from "./Screen1Intro";
import Screen2NameDoubt from "./Screen2NameDoubt";
import Screen3Acceptance from "./Screen3Acceptance";
import Screen4Completion from "./Screen4Completion";
import Screen5History, { type Session } from "./Screen5History";

type ScreenKey = "intro" | "name" | "acceptance" | "completion" | "history";

const UncertaintyPractice: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenKey>("intro");
  const [transitioning, setTransitioning] = useState(false);
  const [visibleScreen, setVisibleScreen] = useState<ScreenKey>("intro");
  const [userDoubt, setUserDoubt] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);

  const navigateTo = useCallback((screen: ScreenKey) => {
    setTransitioning(true);
    setTimeout(() => {
      setVisibleScreen(screen);
      setCurrentScreen(screen);
      setTransitioning(false);
    }, 600);
  }, []);

  const handleBegin = () => navigateTo("name");
  const handleViewHistory = () => navigateTo("history");
  const handleBackToIntro = () => navigateTo("intro");

  const handleContinueWithDoubt = (doubt: string) => {
    setUserDoubt(doubt);
    navigateTo("acceptance");
  };

  const handleAcceptanceComplete = () => {
    // Save session
    const statement = `I don't know for certain that ${userDoubt} — and that's okay for now.`;
    setSessions((prev) => [...prev, { date: new Date(), doubt: userDoubt, statement }]);
    navigateTo("completion");
  };

  const handleSaveReflection = (reflection: string) => {
    if (reflection.trim()) {
      setSessions((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1] = { ...updated[updated.length - 1], reflection };
        }
        return updated;
      });
    }
  };

  const handleSitAgain = () => {
    setUserDoubt("");
    navigateTo("name");
  };

  const handleDone = () => {
    setUserDoubt("");
    navigateTo("intro");
  };

  const renderScreen = () => {
    switch (visibleScreen) {
      case "intro":
        return <Screen1Intro onBegin={handleBegin} onViewHistory={handleViewHistory} />;
      case "name":
        return <Screen2NameDoubt onContinue={handleContinueWithDoubt} />;
      case "acceptance":
        return <Screen3Acceptance userDoubt={userDoubt} onComplete={handleAcceptanceComplete} />;
      case "completion":
        return (
          <Screen4Completion
            userDoubt={userDoubt}
            onSitAgain={handleSitAgain}
            onDone={handleDone}
            onSaveReflection={handleSaveReflection}
          />
        );
      case "history":
        return <Screen5History sessions={sessions} onBack={handleBackToIntro} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen">
      <div className={transitioning ? "screen-exit" : "screen-enter"}>
        {renderScreen()}
      </div>
    </div>
  );
};

export default UncertaintyPractice;
