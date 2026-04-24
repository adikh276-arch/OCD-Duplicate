import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { questions } from "./QuizData";
import IntroScreen from "./IntroScreen";
import QuestionScreen from "./QuestionScreen";
import RevealScreen from "./RevealScreen";
import ResultsScreen from "./ResultsScreen";

type Screen = "intro" | "question" | "reveal" | "results";

const transition = { duration: 0.6, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] };

const MythOrFactQuiz = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<("myth" | "fact")[]>([]);
  const [score, setScore] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(false);

  const handleStart = () => setScreen("question");

  const handleAnswer = (answer: "myth" | "fact") => {
    const correct = answer === questions[questionIndex].answer;
    setAnswers((prev) => [...prev, answer]);
    if (correct) setScore((s) => s + 1);
    setLastCorrect(correct);
    setScreen("reveal");
  };

  const handleNext = () => {
    if (questionIndex < 4) {
      setQuestionIndex((i) => i + 1);
      setScreen("question");
    } else {
      setScreen("results");
    }
  };

  const handlePlayAgain = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setLastCorrect(false);
    setScreen("question");
  };

  const handleDone = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setLastCorrect(false);
    setScreen("intro");
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden" style={{ fontFamily: "'Nunito', 'Inter', sans-serif" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen + questionIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          {screen === "intro" && <IntroScreen onStart={handleStart} />}
          {screen === "question" && (
            <QuestionScreen
              questionIndex={questionIndex}
              statement={questions[questionIndex].statement}
              onAnswer={handleAnswer}
            />
          )}
          {screen === "reveal" && (
            <RevealScreen
              questionIndex={questionIndex}
              correct={lastCorrect}
              correctAnswer={questions[questionIndex].answer}
              explanation={questions[questionIndex].explanation}
              score={score}
              onNext={handleNext}
            />
          )}
          {screen === "results" && (
            <ResultsScreen
              answers={answers}
              score={score}
              onPlayAgain={handlePlayAgain}
              onDone={handleDone}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MythOrFactQuiz;
