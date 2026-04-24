import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import MirrorMomentScreen from "./components/MirrorMomentScreen";

const Index = () => {
  const [screen, setScreen] = useState<"welcome" | "mirror">("welcome");

  if (screen === "mirror") {
    return (
      <MirrorMomentScreen
        onBack={() => setScreen("welcome")}
        onComplete={() => setScreen("welcome")}
      />
    );
  }

  return (
    <WelcomeScreen
      onReady={() => setScreen("mirror")}
      onBack={() => {/* top-level back — no-op or could navigate away */}}
    />
  );
};

export default Index;
