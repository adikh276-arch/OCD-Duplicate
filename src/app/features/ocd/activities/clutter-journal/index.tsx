import { useState } from "react";
import WelcomeScreen from "./components/journal/WelcomeScreen";
import ExplorationScreen from "./components/journal/ExplorationScreen";
import InsightScreen from "./components/journal/InsightScreen";
import ClosingScreen from "./components/journal/ClosingScreen";
import JournalScreen from "./components/journal/JournalScreen";

type Screen = "welcome" | "exploration" | "insight" | "closing" | "journal";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [objectName, setObjectName] = useState("");
  const [insight, setInsight] = useState("");

  const reset = () => {
    setObjectName("");
    setInsight("");
    setScreen("welcome");
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px]">
          {screen === "welcome" && (
            <WelcomeScreen
              onNext={(name) => {
                setObjectName(name);
                setScreen("exploration");
              }}
              onViewJournal={() => setScreen("journal")}
            />
          )}
          {screen === "exploration" && (
            <ExplorationScreen onNext={() => setScreen("insight")} />
          )}
          {screen === "insight" && (
            <InsightScreen
              onNext={(sel) => {
                setInsight(sel);
                setScreen("closing");
              }}
            />
          )}
          {screen === "closing" && (
            <ClosingScreen
              objectName={objectName}
              insight={insight}
              onViewJournal={() => setScreen("journal")}
              onClose={reset}
            />
          )}
          {screen === "journal" && (
            <JournalScreen onStartEntry={reset} />
          )}
      </div>
    </div>
  );
};

export default Index;
