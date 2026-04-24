import { questions } from "./QuizData";

interface ResultsScreenProps {
  answers: ("myth" | "fact")[];
  score: number;
  onPlayAgain: () => void;
  onDone: () => void;
}

const ResultsScreen = ({ answers, score, onPlayAgain, onDone }: ResultsScreenProps) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-10"
      style={{ backgroundColor: "#eeebff" }}
    >
      <div className="text-5xl mb-3">🏆</div>
      <h2 className="font-bold text-center mb-1" style={{ fontSize: 28, color: "#3a2880" }}>
        {score} out of 5!
      </h2>
      <p className="text-center mb-6" style={{ fontSize: 12, color: "#9a90d0" }}>
        Great job busting those myths!
      </p>

      {/* Badge card */}
      <div
        className="w-full max-w-xs p-5 flex flex-col items-center text-center mb-6"
        style={{
          backgroundColor: "white",
          borderRadius: 18,
          border: "2px solid #ccc5f0",
        }}
      >
        <span className="text-3xl mb-1">🏅</span>
        <p className="font-bold" style={{ color: "#3a2880" }}>Myth Buster</p>
        <p className="text-xs" style={{ color: "#9a90d0" }}>Badge unlocked!</p>
        <span
          className="mt-2 px-3 py-0.5 text-xs font-bold rounded-full"
          style={{ backgroundColor: "#eeebff", color: "#5b4fcf" }}
        >
          NEW
        </span>
      </div>

      {/* Summary */}
      <div className="w-full max-w-xs flex flex-col gap-2 mb-8">
        {questions.map((q, i) => {
          const isMyth = q.answer === "myth";
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-3"
              style={{
                backgroundColor: "white",
                borderRadius: 14,
                border: "2px solid #e8e0f8",
              }}
            >
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0"
                style={{
                  backgroundColor: isMyth ? "#ffd0d0" : "#c8f0d8",
                  color: isMyth ? "#c05050" : "#2a7050",
                }}
              >
                {isMyth ? "MYTH" : "FACT"}
              </span>
              <p className="text-xs leading-snug" style={{ color: "#3a2880" }}>
                {q.statement.length > 60 ? q.statement.slice(0, 60) + "…" : q.statement}
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={onPlayAgain}
        className="w-full max-w-xs py-3.5 font-bold text-base mb-3"
        style={{
          backgroundColor: "#7c6fe0",
          color: "white",
          borderRadius: 18,
          borderBottom: "4px solid #5a4fbe",
        }}
      >
        Play Again
      </button>
      <button
        onClick={onDone}
        className="w-full max-w-xs py-3.5 font-bold text-base"
        style={{
          backgroundColor: "transparent",
          color: "#7c6fe0",
          borderRadius: 18,
          border: "2.5px solid #ccc5f0",
        }}
      >
        Done for Today
      </button>
    </div>
  );
};

export default ResultsScreen;
