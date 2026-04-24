import { useState, useEffect, useCallback, useRef } from "react";
import { LadderStep } from "../components/FearLadder/LadderBuilder";
import { useActivityDB } from "../../../hooks/useActivityDB";
import { toast } from "sonner";

export interface DayLog {
  day: number;
  stepId: string;
  anxietyBefore: number;
  anxietyAfter: number;
  notes: string;
  completedAt: string;
}

export interface FearLadderData {
  sessionId: string | null;
  goal: string;
  thought: string;
  reward: string;
  steps: LadderStep[];
  logs: DayLog[];
}

const createEmptySteps = (count: number): LadderStep[] =>
  Array.from({ length: count }, () => ({
    id: Math.random().toString(36).substring(2, 9),
    situation: "",
    anxiety: 50,
  }));

const getDefaultData = (): FearLadderData => ({
  sessionId: null,
  goal: "",
  thought: "",
  reward: "",
  steps: createEmptySteps(10),
  logs: [],
});

export type AppPhase = "build" | "practice" | "completed";

export const useFearLadderStorage = (userId: string | null) => {
  const [data, setData] = useState<FearLadderData>(getDefaultData);
  const [loading, setLoading] = useState(true);
  const [justSaved, setJustSaved] = useState(false);
  const { executeQuery } = useActivityDB("fear-ladder");

  // Reload when userId changes
  useEffect(() => {
    const loadData = async () => {
      if (!userId) {
        setData(getDefaultData());
        setLoading(false);
        return;
      }

      setLoading(true);
      const loaded = await executeQuery("get_session", {});
      if (loaded) {
        setData({
          sessionId: loaded.id,
          goal: loaded.practice_goal || "",
          thought: loaded.expected_fear || "",
          reward: loaded.reward_plan || "",
          steps: (loaded.steps || []).map((s: any) => ({
            id: s.id,
            situation: s.step_description,
            anxiety: s.anxiety_rating
          })),
          logs: (loaded.logs || []).map((l: any) => ({
            day: l.day_number,
            stepId: l.step_id,
            anxietyBefore: l.anxiety_before,
            anxietyAfter: l.anxiety_after,
            notes: l.notes,
            completedAt: l.created_at
          }))
        });
      } else {
        setData(getDefaultData());
      }
      setLoading(false);
    };

    loadData();
  }, [userId, executeQuery]);

  const completedCount = data.logs.length;

  // Sorted steps by anxiety (low to high)
  const sortedSteps = [...data.steps]
    .filter((s) => s.situation.trim().length > 0)
    .sort((a, b) => a.anxiety - b.anxiety);

  // Determine phase
  const phase: AppPhase = !data.sessionId
    ? "build"
    : completedCount >= sortedSteps.length
      ? "completed"
      : "practice";

  const currentStep = (phase === "practice" && completedCount < sortedSteps.length)
    ? sortedSteps[completedCount]
    : null;

  const completedStepIds = new Set(data.logs.map((l) => l.stepId));

  const currentStepAlreadyLogged = currentStep
    ? data.logs.some((l) => l.stepId === currentStep.id)
    : false;

  const updateField = useCallback(<K extends keyof FearLadderData>(
    key: K,
    value: FearLadderData[K]
  ) => {
    setData((prev) => {
      if (!prev.sessionId) {
        return { ...prev, [key]: value };
      }
      if (key === "goal" || key === "thought" || key === "reward") {
        return prev;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const updateSteps = useCallback((newSteps: LadderStep[]) => {
    setData((prev) => {
      if (prev.sessionId) return prev;
      return { ...prev, steps: newSteps };
    });
  }, []);

  const saveSession = useCallback(async () => {
    if (!userId) return { success: false as const, error: "Authentication required." };

    const filledSteps = data.steps
      .filter((s) => s.situation.trim().length > 0)
      .sort((a, b) => a.anxiety - b.anxiety);

    if (filledSteps.length < 1) {
      return { success: false as const, error: "Please add at least one step." };
    }

    const result = await executeQuery("save_session", {
      practice_goal: data.goal || null,
      expected_fear: data.thought || null,
      reward_plan: data.reward || null,
      steps: filledSteps.map((step, index) => ({
        step_order: index,
        step_description: step.situation,
        anxiety_rating: step.anxiety,
      }))
    });

    if (result?.sessionId) {
      setData((prev) => ({
        ...prev,
        sessionId: result.sessionId,
        steps: result.steps.map((s: any) => ({
          id: s.id,
          situation: s.step_description,
          anxiety: s.anxiety_rating
        })),
        logs: []
      }));
      setJustSaved(true);
      return { success: true as const };
    }

    return { success: false as const };
  }, [data.goal, data.thought, data.reward, data.steps, userId, executeQuery]);

  const addLog = useCallback(async (log: DayLog) => {
    if (!userId || !data.sessionId) return { success: false as const };

    if (data.logs.some((l) => l.stepId === log.stepId)) {
      return { success: false as const };
    }

    const success = await executeQuery("add_log", {
      sessionId: data.sessionId,
      stepId: log.stepId,
      dayNumber: log.day,
      anxietyBefore: log.anxietyBefore,
      anxietyAfter: log.anxietyAfter,
      notes: log.notes
    });

    if (!success) {
      return { success: false as const };
    }

    setData((prev) => ({
      ...prev,
      logs: [...prev.logs, log],
    }));

    return { success: true as const };
  }, [data.sessionId, data.logs, userId, executeQuery]);

  const resetLadder = useCallback(async () => {
    setData(getDefaultData());
    setJustSaved(false);
    toast.success("Flow reset. You are now back on Day 1.");
  }, []);

  return {
    data,
    phase,
    completedCount,
    sortedSteps,
    currentStep,
    completedStepIds,
    currentStepAlreadyLogged,
    updateField,
    updateSteps,
    saveSession,
    addLog,
    resetLadder,
    justSaved,
    setJustSaved,
    loading,
  };
};
