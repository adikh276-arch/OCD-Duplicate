import { useState, useCallback, useRef } from "react";
import { useActivityDB } from "@/app/features/ocd/hooks/useActivityDB";
import ScreenTransition from "./ScreenTransition";
import Screen1Welcome from "./Screen1Welcome";
import Screen2Notice from "./Screen2Notice";
import Screen3Ride from "./Screen3Ride";
import Screen4Reflect from "./Screen4Reflect";
import Screen5History from "./Screen5History";

type Screen = "welcome" | "notice" | "ride" | "reflect" | "history";

const UrgeSurfingActivity = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const sessionIdRef = useRef<string | null>(null);

  const { executeQuery } = useActivityDB("urge-surfing");

  const createSession = async () => {
    const id = await executeQuery("create_session", {});
    if (id) sessionIdRef.current = id;
  };

  const updateSession = async (fields: Record<string, unknown>) => {
    if (!sessionIdRef.current) return;
    await executeQuery("update_session", { sessionId: sessionIdRef.current, ...fields });
  };

  const handleBegin = async () => {
    await createSession();
    setScreen("notice");
  };

  const handleNoticeNext = async (location: string, sensation: string) => {
    await updateSession({ body_location: location, sensation_description: sensation });
    setScreen("ride");
  };

  const handleRideComplete = useCallback(() => {
    updateSession({ completed: true });
    setScreen("reflect");
  }, []);

  const handleFinish = async (reflection: string, surfAgain: boolean) => {
    await updateSession({ reflection_note: reflection, completed: true });
    if (surfAgain) {
      sessionIdRef.current = null;
      await createSession();
      setScreen("notice");
    } else {
      sessionIdRef.current = null;
      setScreen("welcome");
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[390px] bg-card min-h-screen relative">
        <ScreenTransition screenKey={screen}>
          {screen === "welcome" && (
            <Screen1Welcome
              onBegin={handleBegin}
              onHistory={() => setScreen("history")}
              onBack={() => {/* navigate out of activity */}}
            />
          )}
          {screen === "notice" && (
            <Screen2Notice onNext={handleNoticeNext} />
          )}
          {screen === "ride" && (
            <Screen3Ride onComplete={handleRideComplete} />
          )}
          {screen === "reflect" && (
            <Screen4Reflect
              onSurfAgain={(r) => handleFinish(r, true)}
              onDone={(r) => handleFinish(r, false)}
            />
          )}
          {screen === "history" && (
            <Screen5History onBack={() => setScreen("welcome")} />
          )}
        </ScreenTransition>
      </div>
    </div>
  );
};

export default UrgeSurfingActivity;
