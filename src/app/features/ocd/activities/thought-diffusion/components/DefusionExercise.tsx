import React, { useState, useCallback } from "react";
import ProgressBar from "../components/ProgressBar";
import Screen1Welcome from "../components/screens/Screen1Welcome";
import Screen2Defusion from "../components/screens/Screen2Defusion";
import Screen3Tool from "../components/screens/Screen3Tool";
import Screen4Practice from "../components/screens/Screen4Practice";
import Screen5Reflection from "../components/screens/Screen5Reflection";
import HistoryScreen, { type SessionEntry } from "../components/screens/HistoryScreen";
import { useActivityDB } from "../../../hooks/useActivityDB";

type View = "exercise" | "history";

const TOTAL_SCREENS = 5;

const DefusionExercise: React.FC = () => {
  const [view, setView] = useState<View>("exercise");
  const [screen, setScreen] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [guidedRewrite, setGuidedRewrite] = useState("");
  const [ownThought, setOwnThought] = useState("");
  const [ownRewrite, setOwnRewrite] = useState("");
  const [feeling, setFeeling] = useState("");
  const [sessions, setSessions] = useState<SessionEntry[]>([]);
  const { executeQuery } = useActivityDB("thought-diffusion");

  const startSession = useCallback(async () => {
    const data = await executeQuery("start_session", { activity: "thought_diffusion" });
    if (data?.session_id) setSessionId(data.session_id);
  }, [executeQuery]);

  const updateScreensViewed = useCallback(async (s: number) => {
    if (!sessionId) return;
    await executeQuery("update_progress", { sessionId, screensViewed: s + 1 });
  }, [sessionId, executeQuery]);

  const saveResponses = useCallback(async () => {
    if (!sessionId) return;
    const rows: any[] = [];
    if (guidedRewrite) rows.push({ part: "guided", original_thought: "I am a bad person for having these thoughts.", defused_thought: guidedRewrite });
    if (ownThought || ownRewrite) rows.push({ part: "own", original_thought: ownThought || null, defused_thought: ownRewrite || null });
    if (rows.length) await executeQuery("save_responses", { sessionId, responses: rows });
  }, [sessionId, guidedRewrite, ownThought, ownRewrite, executeQuery]);

  const saveReflection = useCallback(async (f: string) => {
    if (!sessionId || !f) return;
    await executeQuery("save_reflection", { sessionId, feelingAfter: f });
  }, [sessionId, executeQuery]);

  const loadHistory = useCallback(async () => {
    const data = await executeQuery("get_history", {});
    if (data) setSessions(data);
  }, [executeQuery]);

  const goNext = useCallback(async () => {
    if (screen === 0) await startSession();
    if (screen === 3) await saveResponses();
    const next = Math.min(screen + 1, TOTAL_SCREENS - 1);
    await updateScreensViewed(next);
    setScreen(next);
  }, [screen, startSession, saveResponses, updateScreensViewed]);

  const handleFeelingChange = useCallback(async (f: string) => {
    setFeeling(f);
    await saveReflection(f);
  }, [saveReflection]);

  const resetExercise = useCallback(() => {
    setScreen(0);
    setSessionId(null);
    setGuidedRewrite("");
    setOwnThought("");
    setOwnRewrite("");
    setFeeling("");
  }, []);

  const openHistory = useCallback(async () => {
    await loadHistory();
    setView("history");
  }, [loadHistory]);

  const renderScreen = () => {
    switch (screen) {
      case 0: return <Screen1Welcome onNext={goNext} onBack={() => window.history.back()} onHistory={openHistory} />;
      case 1: return <Screen2Defusion onNext={goNext} />;
      case 2: return <Screen3Tool onNext={goNext} />;
      case 3: return (
        <Screen4Practice
          guidedRewrite={guidedRewrite} ownThought={ownThought} ownRewrite={ownRewrite}
          onGuidedChange={setGuidedRewrite} onOwnThoughtChange={setOwnThought} onOwnRewriteChange={setOwnRewrite}
          onNext={goNext}
        />
      );
      case 4: return (
        <Screen5Reflection
          feeling={feeling}
          onFeelingChange={handleFeelingChange}
          onPracticeAgain={() => { resetExercise(); setScreen(0); }}
          onReturnHome={openHistory}
        />
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-outer flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] min-h-[700px] bg-background rounded-[28px] shadow-lg border border-border flex flex-col p-5">
        {view === "history" ? (
          <HistoryScreen
            sessions={sessions}
            onStartNew={() => { resetExercise(); setView("exercise"); }}
            onBack={() => setView("exercise")}
          />
        ) : (
          <>
            <ProgressBar current={screen} total={TOTAL_SCREENS} />
            <div className="flex-1 flex flex-col">{renderScreen()}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default DefusionExercise;
