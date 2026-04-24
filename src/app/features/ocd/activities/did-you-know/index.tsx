import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "./components/DidYouKnow/WelcomeScreen";
import CardsScreen from "./components/DidYouKnow/CardsScreen";
import CloseScreen from "./components/DidYouKnow/CloseScreen";

type Screen = "welcome" | "cards" | "close";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("welcome");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-[390px] min-h-screen">
        <AnimatePresence mode="wait">
          {screen === "welcome" && (
            <WelcomeScreen key="welcome" onStart={() => setScreen("cards")} />
          )}
          {screen === "cards" && (
            <CardsScreen key="cards" onDone={() => setScreen("close")} />
          )}
          {screen === "close" && (
            <CloseScreen
              key="close"
              onReadAgain={() => setScreen("welcome")}
              onDone={() => setScreen("welcome")}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
