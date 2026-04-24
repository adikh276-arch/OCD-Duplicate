interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 relative"
      style={{ backgroundColor: "#ffe8e8" }}
    >
      {/* Back button */}
      <button
        className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full"
        style={{ backgroundColor: "white", color: "#c05050", fontSize: 20, fontWeight: 700 }}
      >
        &lt;
      </button>

      <div className="text-6xl mb-4">🧠</div>

      <h1 className="font-bold text-center mb-2" style={{ fontSize: 24, color: "#7a2a2a" }}>
        Myth or Fact?
      </h1>
      <p className="text-center mb-8" style={{ fontSize: 13, color: "#c08080" }}>
        OCD twists the truth. Can you spot what's real?
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs mb-8">
        <div
          className="flex items-center gap-3 p-4"
          style={{
            backgroundColor: "#fff5f5",
            border: "2px solid #f4c8c8",
            borderRadius: 18,
          }}
        >
          <span className="text-2xl">🃏</span>
          <div>
            <p className="font-bold text-sm" style={{ color: "#7a2a2a" }}>5 rounds</p>
            <p style={{ fontSize: 12, color: "#c08080" }}>Myth or fact — you decide</p>
          </div>
        </div>
        <div
          className="flex items-center gap-3 p-4"
          style={{
            backgroundColor: "#fff5f5",
            border: "2px solid #f4c8c8",
            borderRadius: 18,
          }}
        >
          <span className="text-2xl">⚡</span>
          <div>
            <p className="font-bold text-sm" style={{ color: "#7a2a2a" }}>Instant feedback</p>
            <p style={{ fontSize: 12, color: "#c08080" }}>Learn the truth after each one</p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full max-w-xs py-3.5 font-bold text-base"
        style={{
          backgroundColor: "#e87070",
          color: "white",
          borderRadius: 18,
          borderBottom: "4px solid #c85050",
        }}
      >
        Let's Play! 🎮
      </button>
    </div>
  );
};

export default IntroScreen;
