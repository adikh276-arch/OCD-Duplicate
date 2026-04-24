export interface QuizQuestion {
  statement: string;
  answer: "myth" | "fact";
  explanation: string;
}

export const questions: QuizQuestion[] = [
  {
    statement: "Touching a doorknob can transfer dangerous germs that will make you seriously ill.",
    answer: "myth",
    explanation: "Most doorknob germs are harmless to a healthy immune system. OCD exaggerates the actual risk.",
  },
  {
    statement: "Washing your hands repeatedly makes contamination anxiety worse over time.",
    answer: "fact",
    explanation: "Every wash gives short-term relief but teaches your brain the threat was real — making OCD stronger.",
  },
  {
    statement: "You can feel when something is contaminated just by touching it.",
    answer: "myth",
    explanation: "That contaminated feeling is anxiety, not a reliable signal of actual danger.",
  },
  {
    statement: "Avoiding a feared surface makes contamination fear grow stronger.",
    answer: "fact",
    explanation: "Avoidance prevents your brain from learning the surface is safe, keeping the fear alive.",
  },
  {
    statement: "If you touch something dirty, you must wash immediately or harm will follow.",
    answer: "myth",
    explanation: "The urge to wash is OCD talking. Delaying or skipping the wash breaks the cycle.",
  },
];
