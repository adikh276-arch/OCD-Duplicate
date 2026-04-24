import ProgressBar from "./ProgressBar";

interface QuestionScreenProps {
  questionIndex: number;
  statement: string;
  onAnswer: (answer: "myth" | "fact") => void;
}

const QuestionScreen = ({ questionIndex, statement, onAnswer }: QuestionScreenProps) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-10"
      style={{ backgroundColor: "#fffdf5" }}
    >
      <ProgressBar current={questionIndex} total={5} />

      <p
        className="uppercase tracking-widest mt-6 mb-4"
        style={{ fontSize: 11, color: "#b0a880" }}
      >
        Question {questionIndex + 1} of 5
      </p>

      <div
        className="w-full max-w-xs p-6 flex flex-col items-center text-center mb-8"
        style={{
          backgroundColor: "white",
          borderRadius: 22,
          border: "2px solid #ede8d8",
        }}
      >
        <span className="text-4xl mb-4">🤔</span>
        <p className="font-bold leading-relaxed" style={{ fontSize: 14, color: "#3a3020" }}>
          {statement}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        <button
          onClick={() => onAnswer("myth")}
          className="py-4 font-bold text-base flex items-center justify-center gap-2"
          style={{
            backgroundColor: "#fff0f0",
            border: "2.5px solid #f4c0c0",
            borderBottom: "4px solid #f4c0c0",
            borderRadius: 18,
            color: "#c05050",
          }}
        >
          ❌ Myth
        </button>
        <button
          onClick={() => onAnswer("fact")}
          className="py-4 font-bold text-base flex items-center justify-center gap-2"
          style={{
            backgroundColor: "#f0fff4",
            border: "2.5px solid #b8e8c8",
            borderBottom: "4px solid #b8e8c8",
            borderRadius: 18,
            color: "#2a8050",
          }}
        >
          ✅ Fact
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;
