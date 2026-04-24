import ProgressBar from "./ProgressBar";

interface RevealScreenProps {
  questionIndex: number;
  correct: boolean;
  correctAnswer: "myth" | "fact";
  explanation: string;
  score: number;
  onNext: () => void;
}

const RevealScreen = ({
  questionIndex,
  correct,
  correctAnswer,
  explanation,
  score,
  onNext,
}: RevealScreenProps) => {
  const isLast = questionIndex === 4;
  const bg = correct ? "#e8f8ee" : "#fff0f0";
  const titleColor = correct ? "#1a5c38" : "#c05050";
  const borderColor = correct ? "#c8e8d8" : "#f4c0c0";
  const btnBg = correct ? "#5aaa78" : "#e87070";
  const btnBorder = correct ? "#3d8a5a" : "#c85050";
  const labelColor = correct ? "#2a7050" : "#c05050";

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-10"
      style={{ backgroundColor: bg }}
    >
      <ProgressBar current={questionIndex + 1} total={5} />

      <div className="text-5xl mt-8 mb-3">{correct ? "🎉" : "😅"}</div>
      <h2 className="font-bold text-xl mb-1" style={{ color: titleColor }}>
        {correct ? "You got it!" : "Not quite!"}
      </h2>
      <p className="text-sm mb-6" style={{ color: titleColor }}>
        That's {correctAnswer === "myth" ? "a Myth" : "a Fact"}
      </p>

      <div
        className="w-full max-w-xs p-5 mb-5"
        style={{
          backgroundColor: "white",
          borderRadius: 18,
          border: `2px solid ${borderColor}`,
        }}
      >
        <p
          className="uppercase tracking-wider font-bold mb-2"
          style={{ fontSize: 11, color: labelColor }}
        >
          Why it's {correctAnswer === "fact" ? "true" : "a myth"}
        </p>
        <p style={{ fontSize: 12, color: "#2a3a30", lineHeight: 1.6 }}>{explanation}</p>
      </div>

      <div
        className="px-5 py-2.5 mb-8 text-center font-semibold"
        style={{
          backgroundColor: correct ? "#d0f0dc" : "#ffe0e0",
          borderRadius: 16,
          fontSize: 13,
          color: titleColor,
        }}
      >
        Score so far — {score}/{questionIndex + 1} ⭐
      </div>

      <button
        onClick={onNext}
        className="w-full max-w-xs py-3.5 font-bold text-base"
        style={{
          backgroundColor: btnBg,
          color: "white",
          borderRadius: 18,
          borderBottom: `4px solid ${btnBorder}`,
        }}
      >
        {isLast ? "See Results →" : "Next →"}
      </button>
    </div>
  );
};

export default RevealScreen;
