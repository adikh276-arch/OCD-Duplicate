import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  FileText,
  TrendingUp,
  Calculator,
  Map,
  HelpCircle
} from "lucide-react";

interface Tip {
  id: number;
  title: string;
  description: string;
  url?: string;
}

const tips: Tip[] = [
  {
    id: 1,
    title: "Use ERP — Face the Fear Without Performing the Compulsion",
    description: "Exposure and Response Prevention is the single most effective tool for contamination OCD...",
    url: "/contamination-tip-1"
  },
  {
    id: 2,
    title: "Reduce Washing and Cleaning Rituals Gradually",
    description: "While washing is normal and healthy, in contamination OCD it becomes a compulsion that provides only temporary relief...",
    url: "/contamination-tip-2"
  },
  {
    id: 3,
    title: "Identify and Stop Avoidance Behaviors",
    description: "Avoidance is one of the most sneaky and damaging aspects of contamination OCD...",
    url: "/contamination-tip-3"
  },
  {
    id: 4,
    title: "Manage the Mental Side — Challenge Contamination Thinking",
    description: "Contamination OCD is driven by deeply ingrained patterns of thinking that make the fear feel real and urgent...",
    url: "/contamination-tip-4"
  },
  {
    id: 5,
    title: "Build a Support System and Educate Your Loved Ones",
    description: "Contamination OCD thrives in isolation and secrecy. Building a genuine support system is crucial...",
    url: "/contamination-tip-5"
  }
];

interface Article {
  id: number;
  title: string;
  description: string;
  url?: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "OCD and Contamination — A Complete Expert Guide",
    description: "One of the most accessible and widely recommended articles on contamination OCD...",
    url: "/contamination-article-1"
  },
  {
    id: 2,
    title: "Contamination OCD — Symptoms, Causes, and Treatment",
    description: "A beautifully written and highly compassionate article that explains contamination OCD from the perspective of what it actually feels like...",
    url: "/contamination-article-2"
  },
  {
    id: 3,
    title: "Contamination OCD and Smartphone Therapies",
    description: "A forward-thinking academic review exploring how technology can help treat this condition...",
    url: "/contamination-article-3"
  },
  {
    id: 4,
    title: "Spike in Contamination OCD Symptoms",
    description: "The longest study ever conducted on contamination-related OCD symptoms in the wake of the COVID-19 pandemic...",
    url: "/contamination-article-4"
  },
  {
    id: 5,
    title: "Self-Contamination — A Distinct Subtype of Contamination OCD",
    description: "A cutting-edge clinical research study exploring the self-contamination subtype...",
    url: "/contamination-article-5"
  }
];

interface Tool {
  id: string;
  label: string;
  icon: any;
  bgColor: string;
  iconColor: string;
  url?: string;
}

const tools: Tool[] = [
  {
    id: "brave-steps",
    label: "Brave Steps",
    icon: TrendingUp,
    bgColor: "#E8F5E9",
    iconColor: "#10B981",
    url: "/activities/brave-steps"
  },
  {
    id: "ritual-cost-calculator",
    label: "Ritual Cost Calculator",
    icon: Calculator,
    bgColor: "#E3F2FD",
    iconColor: "#3B82F6",
    url: "/activities/ritual-cost"
  },
  {
    id: "trigger-map",
    label: "My Trigger Map",
    icon: Map,
    bgColor: "#F3E5F5",
    iconColor: "#A855F7",
    url: "/activities/trigger-map"
  },
  {
    id: "quiz",
    label: "Quiz",
    icon: HelpCircle,
    bgColor: "#FFF4E5",
    iconColor: "#F97316",
    url: "/activities/truth-seeker"
  }
];

export function ContaminationOCDPage() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string>("");

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
                <h1 className="text-2xl font-bold text-[#020817]">Contamination OCD</h1>
                <p className="text-sm text-[#64748B]">Resources and tools for managing Contamination OCD</p>
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
                <div className="w-14 h-14 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={28} className="text-white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#020817]">Tips</h3>
                  <p className="text-sm text-[#64748B]">Practical strategies for recovery</p>
                </div>
              </div>
              {expandedSection === "tips" ? (
                <ChevronUp size={24} className="text-[#10B981]" />
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
                    {tips.map((tip) => (
                      <button
                        key={tip.id}
                        onClick={() => {
                          if (tip.url) {
                            navigate(tip.url);
                          }
                        }}
                        className="w-full bg-[#ecfdf5] border border-[#d0fae5] rounded-xl p-4 hover:shadow-md transition-all text-left"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#10B981] font-semibold text-sm">
                            {tip.id}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-[#020817] mb-1">
                              {tip.title}
                            </h4>
                            <p className="text-xs text-[#64748B]">
                              {tip.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Articles Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <button
              onClick={() => toggleSection("articles")}
              className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FileText size={28} className="text-white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#020817]">Articles</h3>
                  <p className="text-sm text-[#64748B]">Research and expert insights</p>
                </div>
              </div>
              {expandedSection === "articles" ? (
                <ChevronUp size={24} className="text-[#64748B]" />
              ) : (
                <ChevronDown size={24} className="text-[#64748B]" />
              )}
            </button>

            <AnimatePresence>
              {expandedSection === "articles" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 space-y-3">
                    {articles.map((article) => (
                      <button
                        key={article.id}
                        onClick={() => {
                          if (article.url) {
                            navigate(article.url);
                          }
                        }}
                        className="w-full bg-[#f0f9ff] border border-[#dff2fe] rounded-xl p-4 hover:shadow-md transition-all text-left"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#6366F1] font-semibold text-base">
                            {article.id}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-[#020817] mb-1">
                              {article.title}
                            </h4>
                            <p className="text-xs text-[#6366F1]">
                              {article.description}
                            </p>
                          </div>
                        </div>
                      </button>
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
                <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-2xl flex items-center justify-center">
                  <TrendingUp size={24} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#020817]">Interactive Tools</h2>
                  <p className="text-sm text-[#64748B]">Tools for tracking and understanding</p>
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

