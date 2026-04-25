import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronLeft, Lightbulb, Shield, Brain, Sparkles, ChevronRight } from "lucide-react";

const tipCategories = [
  {
    id: "contamination",
    label: "Contamination OCD",
    color: "#10B981",
    bg: "#E8F5E9",
    icon: Shield,
    tips: [
      { route: "/contamination-tip-1", title: "Use ERP — Face the Fear Without Performing the Compulsion" },
      { route: "/contamination-tip-2", title: "Build a Fear Ladder and Tackle It Step by Step" },
      { route: "/contamination-tip-3", title: "Delay the Compulsion — Buy Yourself Time" },
      { route: "/contamination-tip-4", title: "Challenge the 'What If' Spiral" },
      { route: "/contamination-tip-5", title: "Practice Self-Compassion During Setbacks" },
    ],
  },
  {
    id: "trichotillomania",
    label: "Trichotillomania",
    color: "#AB47BC",
    bg: "#F3E5F5",
    icon: Sparkles,
    tips: [
      { route: "/trich-myth-1", title: "Myth: Hair Pulling is Just a Bad Habit You Can Stop Anytime" },
      { route: "/trich-myth-2", title: "Myth: Only Children and Teenagers Pull Their Hair" },
      { route: "/trich-myth-3", title: "Myth: Hair Pulling Means You Are Mentally Unstable" },
      { route: "/trich-myth-4", title: "Myth: You Cannot Recover from Trichotillomania" },
      { route: "/trich-myth-5", title: "Myth: Hair Pulling is Attention-Seeking Behaviour" },
    ],
  },
  {
    id: "general",
    label: "General OCD Tips",
    color: "#FFB347",
    bg: "#FFF4E5",
    icon: Lightbulb,
    tips: [
      { route: "/activities/thought-truth", title: "Thought or Truth — Challenge Intrusive Thoughts" },
      { route: "/activities/anxiety-cycle", title: "Break the Anxiety Cycle" },
      { route: "/activities/uncertainty-acceptance", title: "Practice Uncertainty Acceptance" },
      { route: "/activities/self-compassion", title: "Build Self-Compassion" },
      { route: "/activities/truth-seeker", title: "Truth Seeker — Quiz Your OCD" },
    ],
  },
  {
    id: "pure-o",
    label: "Pure O OCD",
    color: "#42A5F5",
    bg: "#E3F2FD",
    icon: Brain,
    tips: [
      { route: "/pure-o-article-1", title: "What is Pure O OCD?" },
      { route: "/pure-o-article-2", title: "Intrusive Thoughts — Why They Are Not Dangerous" },
      { route: "/pure-o-article-3", title: "Mental Rituals and How to Recognise Them" },
      { route: "/pure-o-article-4", title: "Defusion Techniques for Unwanted Thoughts" },
      { route: "/pure-o-article-5", title: "Finding Peace With Uncertainty" },
    ],
  },
];

export function OCDTipsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-[#64748B] hover:text-[#043570] hover:bg-white/80 transition-all"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFB347] to-[#FF9F00] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Lightbulb size={24} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-semibold">OCD Tips</h1>
                <p className="text-sm text-[#62748e] font-normal mt-0.5">
                  Evidence-based tips and myth-busters for every type of OCD
                </p>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <div className="space-y-6">
            {tipCategories.map((category, catIndex) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.08 }}
                  className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: category.bg }}
                    >
                      <IconComponent size={20} style={{ color: category.color }} strokeWidth={2} />
                    </div>
                    <h2 className="text-base font-semibold text-[#020817]">{category.label}</h2>
                    <span
                      className="ml-auto text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: category.bg, color: category.color }}
                    >
                      {category.tips.length} Tips
                    </span>
                  </div>

                  {/* Tips List */}
                  <div className="divide-y divide-[#F8FAFC]">
                    {category.tips.map((tip, tipIndex) => (
                      <motion.button
                        key={tip.route}
                        whileHover={{ backgroundColor: "#F8FAFC" }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => navigate(tip.route)}
                        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors group"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                          style={{ backgroundColor: category.bg, color: category.color }}
                        >
                          {tipIndex + 1}
                        </div>
                        <p className="flex-1 text-sm font-medium text-[#374151] group-hover:text-[#020817] transition-colors leading-snug">
                          {tip.title}
                        </p>
                        <ChevronRight size={16} className="text-[#CBD5E1] group-hover:text-[#94A3B8] flex-shrink-0 transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
