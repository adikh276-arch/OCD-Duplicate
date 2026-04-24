import { useState, useCallback } from "react";
import { type LadderItem, type LadderData, loadLadder, saveLadder } from "./types";
import Screen1Welcome from "./Screen1Welcome";
import Screen2BuildLadder from "./Screen2BuildLadder";
import Screen3TodaysItem from "./Screen3TodaysItem";
import Screen4Breathe from "./Screen4Breathe";
import Screen5Discard from "./Screen5Discard";
import Screen6CheckIn from "./Screen6CheckIn";
import Screen7WellDone from "./Screen7WellDone";
import Screen8Ladder from "./Screen8Ladder";

const DiscardExposureActivity = () => {
  const [screen, setScreen] = useState(1);
  const [ladder, setLadder] = useState<LadderData>(() => loadLadder() || { items: [], currentStep: 1, sessions: [] });
  const [sessionAction, setSessionAction] = useState("");
  const [beforeAnxiety] = useState(7); // Default "before" anxiety — conceptually the anticipation level
  const [afterAnxiety, setAfterAnxiety] = useState(5);

  const go = useCallback((s: number) => setScreen(s), []);

  const handleBuildLadder = useCallback((items: LadderItem[]) => {
    const newLadder: LadderData = { ...ladder, items, currentStep: 1 };
    setLadder(newLadder);
    saveLadder(newLadder);
    go(3);
  }, [ladder, go]);

  const handleDiscard = useCallback((action: string) => {
    setSessionAction(action);
    go(6);
  }, [go]);

  const handleCheckIn = useCallback((anxiety: number) => {
    setAfterAnxiety(anxiety);
    const session = {
      step: ladder.currentStep,
      beforeAnxiety,
      afterAnxiety: anxiety,
      action: sessionAction,
      date: new Date().toISOString().slice(0, 10),
    };
    const updated: LadderData = {
      ...ladder,
      sessions: [...ladder.sessions, session],
    };
    setLadder(updated);
    saveLadder(updated);
    go(7);
  }, [ladder, beforeAnxiety, sessionAction, go]);

  const handleKeepGoing = useCallback(() => {
    const updated: LadderData = {
      ...ladder,
      currentStep: Math.min(ladder.currentStep + 1, 5),
    };
    setLadder(updated);
    saveLadder(updated);
    go(3);
  }, [ladder, go]);

  const handleDoneToday = useCallback(() => {
    const updated: LadderData = {
      ...ladder,
      currentStep: Math.min(ladder.currentStep + 1, 6),
    };
    setLadder(updated);
    saveLadder(updated);
    go(8);
  }, [ladder, go]);

  const currentItem = ladder.items[ladder.currentStep - 1];

  switch (screen) {
    case 1: return <Screen1Welcome onNext={() => go(2)} />;
    case 2: return <Screen2BuildLadder onNext={handleBuildLadder} />;
    case 3: return currentItem ? <Screen3TodaysItem item={currentItem} stepNumber={ladder.currentStep} onNext={() => go(4)} /> : <Screen2BuildLadder onNext={handleBuildLadder} />;
    case 4: return <Screen4Breathe onNext={() => go(5)} />;
    case 5: return <Screen5Discard onNext={handleDiscard} />;
    case 6: return <Screen6CheckIn onNext={handleCheckIn} />;
    case 7: return <Screen7WellDone beforeAnxiety={beforeAnxiety} afterAnxiety={afterAnxiety} onKeepGoing={handleKeepGoing} onDone={handleDoneToday} />;
    case 8: return <Screen8Ladder ladder={ladder} onContinue={() => go(3)} />;
    default: return null;
  }
};

export default DiscardExposureActivity;
