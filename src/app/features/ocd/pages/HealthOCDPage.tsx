import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ImageIcon,
  Shield,
  Timer,
  BookOpen,
  Sparkles
} from "lucide-react";

interface Myth {
  id: number;
  title: string;
  description: string;
}

const myths: Myth[] = [
  {
    id: 1,
    title: '"Health OCD is just being a hypochondriac"',
    description: "Many people confuse Health OCD with hypochondria, but these are very different experiences..."
  },
  {
    id: 2,
    title: '"If you just stop worrying, it will go away"',
    description: "This is one of the most damaging myths because it places the entire burden of recovery on the person suffering..."
  },
  {
    id: 3,
    title: '"Googling symptoms is helpful and responsible"',
    description: "In today's world, looking up health information online seems like a perfectly reasonable thing to do..."
  },
  {
    id: 4,
    title: `"If doctors give you a clean bill of health, you should feel better"`,
    description: `For people without OCD, a doctor saying 'you're fine' brings lasting relief...`
  },
  {
    id: 5,
    title: `"Health OCD means you're weak or mentally fragile"`,
    description: "There is a significant stigma around OCD and mental health in general..."
  }
];

interface Tool {
  id: string;
  label: string;
  icon: any;
  bgColor: string;
  iconColor: string;
  url: string;
}

const tools: Tool[] = [
  {
    id: "reassurance-resistance",
    label: "Reassurance Resistance",
    icon: Shield,
    bgColor: "#FFF4E5",
    iconColor: "#FF8C42",
    url: "/activities/reassurance-resistance"
  },
  {
    id: "uncertainty-tolerance",
    label: "Uncertainty Tolerance",
    icon: Timer,
    bgColor: "#E3F2FD",
    iconColor: "#42A5F5",
    url: "/activities/uncertainty-tolerance"
  },
  {
    id: "psycho-education",
    label: "Psycho Education",
    icon: BookOpen,
    bgColor: "#E8F5E9",
    iconColor: "#66BB6A",
    url: "/activities/anxiety-cycle"
  },
  {
    id: "mirror-moments",
    label: "Mirror Moments",
    icon: Sparkles,
    bgColor: "#F3E5F5",
    iconColor: "#AB47BC",
    url: "/activities/mirror-moments"
  }
];

export function HealthOCDPage() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string>("myths");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-[#64748B] hover:text-[#043570] hover:bg-white/80 transition-all"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#020817]">Health OCD</h1>
                <p className="text-sm text-[#64748B]">Resources and tools for managing Health OCD</p>
              </div>
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4"
          >
            <button
              onClick={() => toggleSection("tips")}
              className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#A855F7] to-[#9333EA] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={28} className="text-white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#020817]">Tips</h3>
                  <p className="text-sm text-[#64748B]">Daily wisdom for your wellbeing</p>
                </div>
              </div>
              {expandedSection === "tips" ? (
                <ChevronUp size={24} className="text-[#64748B]" />
              ) : (
                <ChevronDown size={24} className="text-[#64748B]" />
              )}
            </button>

            <AnimatePresence>
              {expandedSection === "tips" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 space-y-3">
                    <div className="space-y-4">
                      <div className="bg-[#F0F4FF] border border-[#C7D7FE] rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-[#020817] mb-2">
                          1. Recognize Reassurance-Seeking Behavior
                        </h4>
                        <p className="text-xs text-[#64748B]">
                          Notice when you're asking for reassurance or checking symptoms. Awareness is the first step toward change.
                        </p>
                      </div>

                      <div className="bg-[#F0F4FF] border border-[#C7D7FE] rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-[#020817] mb-2">
                          2. Practice "Maybe" Thinking
                        </h4>
                        <p className="text-xs text-[#64748B]">
                          Instead of seeking certainty, practice responding to anxious thoughts with "Maybe" or "I don't know." This builds tolerance for uncertainty.
                        </p>
                      </div>

                      <div className="bg-[#F0F4FF] border border-[#C7D7FE] rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-[#020817] mb-2">
                          3. Delay Checking and Googling
                        </h4>
                        <p className="text-xs text-[#64748B]">
                          When the urge to check symptoms arises, delay it by 15 minutes. Gradually increase this time to reduce compulsive behaviors.
                        </p>
                      </div>

                      <div className="bg-[#F0F4FF] border border-[#C7D7FE] rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-[#020817] mb-2">
                          4. Label Thoughts as OCD
                        </h4>
                        <p className="text-xs text-[#64748B]">
                          When health anxiety strikes, remind yourself: "This is my OCD talking, not reality." This creates distance from the intrusive thoughts.
                        </p>
                      </div>

                      <div className="bg-[#F0F4FF] border border-[#C7D7FE] rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-[#020817] mb-2">
                          5. Engage in Valued Activities
                        </h4>
                        <p className="text-xs text-[#64748B]">
                          Redirect your attention to activities that matter to you—hobbies, relationships, work. Living fully is the best way to combat OCD.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Myths Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <button
              onClick={() => toggleSection("myths")}
              className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#EC4899] to-[#DB2777] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ImageIcon size={28} className="text-white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#020817]">Myths</h3>
                  <p className="text-sm text-[#64748B]">Debunking harmful stereotypes</p>
                </div>
              </div>
              {expandedSection === "myths" ? (
                <ChevronUp size={24} className="text-[#EC4899]" />
              ) : (
                <ChevronDown size={24} className="text-[#64748B]" />
              )}
            </button>

            <AnimatePresence>
              {expandedSection === "myths" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 space-y-3">
                    {myths.map((myth) => (
                      <div
                        key={myth.id}
                        className="bg-[#FFF4F9] border border-[#FFC4E1] rounded-xl p-4"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#EC4899] font-semibold text-sm">
                            {myth.id}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-[#020817] mb-1">
                              {myth.title}
                            </h4>
                            <p className="text-xs text-[#64748B]">
                              {myth.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Interactive Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-2xl flex items-center justify-center">
                  <Shield size={24} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#020817]">Interactive Tools</h2>
                  <p className="text-sm text-[#64748B]">Exercises for recovery and wellness</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center gap-3 hover:shadow-lg transition-all"
                  onClick={() => {
                    if (tool.url) {
                      if (tool.url.startsWith('/')) {
                        navigate(tool.url);
                      } else if (tool.url.includes("mantracare")) {
                        navigate(`/tool?url=${encodeURIComponent(tool.url)}&title=${encodeURIComponent(tool.label)}`);
                      } else {
                        window.open(tool.url, "_blank");
                      }
                    }
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: tool.bgColor }}
                  >
                    <tool.icon size={28} style={{ color: tool.iconColor }} strokeWidth={2} />
                  </div>
                  <p className="text-sm font-medium text-[#020817] text-center">
                    {tool.label}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

