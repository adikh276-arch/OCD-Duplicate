import { useState } from "react";
import IntroScreen from "./components/erp/IntroScreen";
import ChallengeScreen from "./components/erp/ChallengeScreen";
import TimerScreen from "./components/erp/TimerScreen";
import WrapUpScreen from "./components/erp/WrapUpScreen";

const Index = () => {
  const [screen, setScreen] = useState(0);
  const [challenge, setChallenge] = useState("Touch a shoe sole");
  const [anxiety, setAnxiety] = useState(4);
  const [duration, setDuration] = useState(5);

  const handleChallengeNext = (c: string) => {
    setChallenge(c);
    setScreen(2);
  };

  const handleTimerDone = (anx: number, dur: number) => {
    setAnxiety(anx);
    setDuration(dur);
    setScreen(3);
  };

  const reset = () => {
    setScreen(0);
    setChallenge("Touch a shoe sole");
    setAnxiety(4);
    setDuration(5);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div
        className="w-[268px] h-[580px] rounded-[36px] border-2 border-border bg-background overflow-hidden flex flex-col"
      >
        {screen === 0 && <IntroScreen onNext={() => setScreen(1)} onBack={reset} />}
        {screen === 1 && <ChallengeScreen onNext={handleChallengeNext} />}
        {screen === 2 && <TimerScreen onNext={handleTimerDone} />}
        {screen === 3 && (
          <WrapUpScreen
            beforeAnxiety={anxiety}
            surface={challenge.replace("Touch a ", "").replace("Touch ", "")}
            duration={duration}
            onTryHarder={() => setScreen(1)}
            onDone={reset}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
