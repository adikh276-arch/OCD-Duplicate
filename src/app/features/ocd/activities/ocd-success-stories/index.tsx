import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "./components/ui/button";

interface Story {
  name: string;
  profession: string;
  emoji: string;
  pronoun: "he" | "she";
  struggled: string;
  managed: string;
  gradient: string;
  iconBg: string;
}

const stories: Story[] = [
  {
    name: "Howie Mandel",
    profession: "Comedian & TV Host",
    emoji: "🎤",
    pronoun: "he",
    struggled:
      "Severe contamination OCD. He has spoken about an intense fear of germs, avoiding handshakes, and experiencing constant anxiety about illness.",
    managed:
      "Through therapy and medication, he learned to tolerate anxiety rather than trying to eliminate it. By openly discussing his OCD in interviews and on TV, he helped reduce stigma while continuing a successful career.",
    gradient: "from-[hsl(168,55%,92%)] to-[hsl(168,55%,97%)]",
    iconBg: "bg-[hsl(168,55%,38%)]",
  },
  {
    name: "Lena Dunham",
    profession: "Actress, Writer & Director",
    emoji: "✍️",
    pronoun: "she",
    struggled:
      "She experienced intrusive thoughts and compulsive rituals from childhood. The thoughts felt distressing and difficult to control.",
    managed:
      "With CBT-based therapy, she learned that intrusive thoughts are common and don't reflect someone's character. Over time, she reduced compulsions and now advocates for early mental health support.",
    gradient: "from-[hsl(280,45%,92%)] to-[hsl(280,40%,97%)]",
    iconBg: "bg-[hsl(260,40%,55%)]",
  },
  {
    name: "David Beckham",
    profession: "Professional Footballer",
    emoji: "⚽",
    pronoun: "he",
    struggled:
      "Beckham has described a strong need for order and symmetry. If objects were not arranged perfectly, he felt uncomfortable and compelled to fix them.",
    managed:
      "By recognizing these tendencies and setting boundaries, he prevented them from taking over his time. He also channeled his attention to detail into discipline and focus in sports.",
    gradient: "from-[hsl(210,50%,92%)] to-[hsl(210,45%,97%)]",
    iconBg: "bg-[hsl(210,50%,45%)]",
  },
  {
    name: "Marc Summers",
    profession: "Television Host",
    emoji: "📺",
    pronoun: "he",
    struggled:
      "Severe contamination OCD that affected both his personal life and career. He avoided physical contact and had intense fears of germs.",
    managed:
      "Through structured therapy and exposure treatment, he gradually faced situations he feared. Over time, his anxiety reduced. He later spoke publicly about OCD to raise awareness.",
    gradient: "from-[hsl(38,80%,92%)] to-[hsl(38,75%,97%)]",
    iconBg: "bg-[hsl(38,80%,50%)]",
  },
  {
    name: "Cameron Diaz",
    profession: "Actress",
    emoji: "🌟",
    pronoun: "she",
    struggled:
      "She has spoken about obsessive concerns about cleanliness and germs, including frequent hand washing and discomfort touching public surfaces.",
    managed:
      "By increasing awareness and working to limit compulsive behaviors, she learned to address the anxiety instead of feeding it with rituals.",
    gradient: "from-[hsl(340,50%,93%)] to-[hsl(340,45%,97%)]",
    iconBg: "bg-[hsl(340,50%,50%)]",
  },
  {
    name: "Daniel Radcliffe",
    profession: "Actor",
    emoji: "🎬",
    pronoun: "he",
    struggled:
      "He experienced OCD in childhood, including repetitive checking and tapping behaviors that he felt compelled to perform.",
    managed:
      "With support and treatment, he learned to resist rituals and tolerate the discomfort that comes with ignoring them. He now speaks openly about mental health challenges.",
    gradient: "from-[hsl(200,55%,92%)] to-[hsl(200,50%,97%)]",
    iconBg: "bg-[hsl(200,55%,42%)]",
  },
  {
    name: "Leonardo DiCaprio",
    profession: "Actor",
    emoji: "🎭",
    pronoun: "he",
    struggled:
      "During childhood he dealt with obsessive thoughts and repetitive behaviors, such as stepping on sidewalk cracks in specific patterns.",
    managed:
      "Over time, he learned to recognize and resist compulsive urges. Focusing on acting and creative work helped redirect his attention and energy.",
    gradient: "from-[hsl(145,40%,92%)] to-[hsl(145,35%,97%)]",
    iconBg: "bg-[hsl(145,40%,38%)]",
  },
  {
    name: "Charlie Puth",
    profession: "Singer & Songwriter",
    emoji: "🎵",
    pronoun: "he",
    struggled:
      "He has discussed experiencing obsessive thought patterns and anxiety, which sometimes lead to repetitive thinking and overanalysis.",
    managed:
      "Music became an outlet. By channeling his focus into songwriting, structure, and creative routines, he transformed anxious energy into productivity.",
    gradient: "from-[hsl(270,45%,92%)] to-[hsl(270,40%,97%)]",
    iconBg: "bg-[hsl(270,45%,50%)]",
  },
  {
    name: "Hrithik Roshan",
    profession: "Actor",
    emoji: "💪",
    pronoun: "he",
    struggled:
      "He has spoken about struggles with anxiety and perfectionistic thinking, which can sometimes resemble obsessive tendencies.",
    managed:
      "Through discipline, mindfulness, and therapy, he focuses on growth and emotional balance instead of letting anxiety control his behavior.",
    gradient: "from-[hsl(20,60%,92%)] to-[hsl(20,55%,97%)]",
    iconBg: "bg-[hsl(20,60%,48%)]",
  },
];

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const isLast = current === stories.length - 1;
  const story = stories[current];

  const go = (to: number) => {
    setDirection(to > current ? 1 : -1);
    setCurrent(to);
  };

  const next = () => !isLast && go(current + 1);
  const prev = () => current > 0 && go(current - 1);
  const goFirst = () => go(0);

  const variants = {
    enter: (d: number) => ({ x: d * 300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: -d * 300, opacity: 0, scale: 0.95 }),
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          OCD Success Stories
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Real people. Real struggles. Real progress.
        </p>
      </div>

      {/* Card */}
      <div className="relative w-full max-w-lg" style={{ minHeight: 420 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
            className="absolute inset-0"
          >
            <div
              className={`h-full rounded-3xl bg-gradient-to-br ${story.gradient} border border-border/60 p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] md:p-8`}
            >
              {/* Card header */}
              <div className="mb-5 flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${story.iconBg} shadow-md`}
                >
                  {story.emoji}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {story.name}
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground">
                    {story.profession}
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-card px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
                  {current + 1}/{stories.length}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-4 text-[0.9rem] leading-relaxed text-foreground/80">
                <div className="rounded-2xl bg-card/70 p-4 shadow-sm">
                  <h3 className="mb-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                    Struggle
                  </h3>
                  <p>{story.struggled}</p>
                </div>
                <div className="rounded-2xl bg-card/70 p-4 shadow-sm">
                  <h3 className="mb-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                    How {story.pronoun} managed it
                  </h3>
                  <p>{story.managed}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex w-full max-w-lg items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          disabled={current === 0}
          className="h-11 w-11 rounded-full border-border/60 shadow-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-1.5">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-7 bg-primary shadow-sm"
                  : "w-2 bg-foreground/15 hover:bg-foreground/25"
              }`}
            />
          ))}
        </div>

        {isLast ? (
          <Button
            variant="outline"
            size="icon"
            onClick={goFirst}
            className="h-11 w-11 rounded-full border-border/60 shadow-sm"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="h-11 w-11 rounded-full border-border/60 shadow-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;
