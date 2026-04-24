import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  FileText,
  Sparkles,
  Shield,
  Info,
  Heart
} from "lucide-react";

interface Myth {
  id: number;
  title: string;
  description: string;
  url?: string;
}

const myths: Myth[] = [
  {
    id: 1,
    title: `"Trichotillomania is just a bad habit you can stop anytime"`,
    description: "Many people assume that the urge to pull is simply a misplaced habit, and that the person can stop whenever they choose to...",
    url: "/trich-myth-1"
  },
  {
    id: 2,
    title: `"Only women and girls get trichotillomania"`,
    description: "Because trichotillomania is more commonly diagnosed in women and girls, a widespread myth has developed that it is exclusively a female condition...",
    url: "/trich-myth-2"
  },
  {
    id: 3,
    title: `"People with trichotillomania are doing it for attention"`,
    description: "Far from doing it publicly for attention, most people with trichotillomania go to extraordinary lengths to hide their hair pulling and its effects...",
    url: "/trich-myth-3"
  },
  {
    id: 4,
    title: `"Trichotillomania is caused by vanity or a desire to self-harm"`,
    description: "People sometimes assume that hair pulling must be motivated by self-harm — but that person is hurting themselves on purpose...",
    url: "/trich-myth-4"
  },
  {
    id: 5,
    title: `"There is no effective treatment — you just have to live with it"`,
    description: "The truth is that effective, evidence-based treatments do exist, and many people experience significant improvement or full recovery...",
    url: "/trich-myth-5"
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
    title: "Trichotillomania — A Complete Overview",
    description: "One of the most comprehensive and clinically reliable overviews of trichotillomania available online...",
    url: "/trich-article-1"
  },
  {
    id: 2,
    title: "Psychosocial Treatment of Trichotillomania — A Review",
    description: "A thorough academic review of all the psychological treatments that have been studied for trichotillomania...",
    url: "/trich-article-2"
  },
  {
    id: 3,
    title: "Trichotillomania and Its Treatment — An Updated Review",
    description: "One of the most up-to-date and authoritative reviews on trichotillomania, written by leading researchers...",
    url: "/trich-article-3"
  },
  {
    id: 4,
    title: "Sociodemographic & Clinical Characteristics of 1,234 Trichotillomania Patients",
    description: "A landmark large-scale study from Sweden — one of the biggest real-world datasets on trichotillomania ever published...",
    url: "/trich-article-4"
  },
  {
    id: 5,
    title: "Behavioral and Pharmacological Treatments for Trichotillomania",
    description: "A complete, balanced, and accessible overview of both psychological and medication-based treatments...",
    url: "/trich-article-5"
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
    id: "urge-surfing",
    label: "Urge Surfing",
    icon: Sparkles,
    bgColor: "#F3E5F5",
    iconColor: "#AB47BC",
    url: "/ocd/activities/urge-surfing"
  },
  {
    id: "competing-response",
    label: "Competing Response Practice",
    icon: Shield,
    bgColor: "#E3F2FD",
    iconColor: "#42A5F5",
    url: "/ocd/activities/response-guide"
  },
  {
    id: "did-you-know",
    label: "Did You Know",
    icon: Info,
    bgColor: "#E8F5E9",
    iconColor: "#66BB6A",
    url: "/ocd/activities/did-you-know"
  },
  {
    id: "self-compassion-break",
    label: "Self Compassion Break",
    icon: Heart,
    bgColor: "#FFEBEE",
    iconColor: "#EF5350",
    url: "/ocd/activities/self-compassion"
  }
];

export function TrichotillomaniaPage() {
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
                <h1 className="text-2xl font-bold text-[#020817]">Trichotillomania</h1>
                <p className="text-sm text-[#64748B]">Resources and tools for managing Trichotillomania</p>
              </div>
            </div>
          </motion.div>

          {/* Myths Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4"
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
                  <p className="text-sm text-[#64748B]">Debunking down misconceptions</p>
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
                      <button
                        key={myth.id}
                        onClick={() => {
                          if (myth.url) {
                            navigate(myth.url);
                          }
                        }}
                        className="w-full bg-[#FFF4F9] border border-[#FFC4E1] rounded-xl p-4 hover:shadow-md transition-all text-left"
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
                <div className="w-14 h-14 bg-gradient-to-br from-[#A855F7] to-[#9333EA] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FileText size={28} className="text-white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#020817]">Articles</h3>
                  <p className="text-sm text-[#64748B]">Research and clinical insights</p>
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
                        className="w-full bg-[#F3F0FF] border border-[#E9E3FF] rounded-xl p-4 hover:shadow-md transition-all text-left"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#7C3AED] font-semibold text-base">
                            {article.id}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-[#020817] mb-1">
                              {article.title}
                            </h4>
                            <p className="text-xs text-[#7C3AED]">
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
                <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-2xl flex items-center justify-center">
                  <Sparkles size={24} className="text-white" strokeWidth={2} />
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

