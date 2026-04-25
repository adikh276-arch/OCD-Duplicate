import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Trash2,
  DiscIcon,
  Home,
  BookOpen
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  description: string;
  url?: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "What is Compulsive Hoarding?",
    description: "One of the most beginner-friendly and widely referenced articles on Hoarding OCD, written by leading researchers...",
    url: "/compulsive-hoarding-article"
  },
  {
    id: 2,
    title: "Hoarding Disorder — Symptoms, Causes, Diagnosis and Treatment",
    description: "A well-rounded, clinically informed overview of Hoarding Disorder covering everything from its causes to treatment...",
    url: "/hoarding-disorder-article"
  },
  {
    id: 3,
    title: "Compulsive Hoarding — OCD Symptom, Distinct Syndrome, or Both?",
    description: "A research-based article that explores whether hoarding is truly a part of OCD or its own separate condition...",
    url: "/ocd-symptom-article"
  },
  {
    id: 4,
    title: "Characterizing the Hoarding Phenotype in Individuals with OCD",
    description: "Dive deep into what makes Hoarding OCD uniquely different from OCD without hoarding...",
    url: "/hoarding-phenotype-article"
  },
  {
    id: 5,
    title: "Compulsive Hoarding — Current Controversies and New Directions",
    description: "A comprehensive review of the evolving scientific understanding of hoarding...",
    url: "/hoarding-controversies-article"
  }
];

interface Story {
  id: number;
  title: string;
  description: string;
  url?: string;
}

const stories: Story[] = [
  {
    id: 1,
    title: `"I Wanted a Life Beyond Piles" — A Retired Woman's Journey`,
    description: "One of the most moving and honest accounts of hoarding OCD ever written...",
    url: "/life-beyond-piles-story"
  },
  {
    id: 2,
    title: "Joan — A Retired Teacher Who Couldn't Let Go",
    description: "A 58-year-old retired teacher who struggled with hoarding for over 20 years...",
    url: "/joan-teacher-story"
  },
  {
    id: 3,
    title: "Jeanne Leier — When Grief Triggered Hoarding",
    description: "Her compulsive accumulation began after her fiancé was deployed to Iraq...",
    url: "/jeanne-leier-story"
  },
  {
    id: 4,
    title: `"That Hoarder" — An Anonymous Audio Diary That Became a Community`,
    description: "An anonymous podcast that began as an audio diary and grew into something much bigger...",
    url: "/that-hoarder-story"
  },
  {
    id: 5,
    title: "The Brain Behind the Hoarding — Three Clinical Cases",
    description: "A neuroscientist shares three real cases offering a rare window into what hoarding looks like from the inside...",
    url: "/brain-behind-hoarding-story"
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
    id: "one-thing-out",
    label: "One Thing Out",
    icon: Trash2,
    bgColor: "#FFEBEE",
    iconColor: "#EF5350",
    url: "/ocd/activities/one-thing-out"
  },
  {
    id: "discard-it",
    label: "Discard It",
    icon: DiscIcon,
    bgColor: "#E3F2FD",
    iconColor: "#42A5F5",
    url: "/ocd/activities/discard-it"
  },
  {
    id: "clutter-free-space",
    label: "Clutter-Free Space",
    icon: Home,
    bgColor: "#E8F5E9",
    iconColor: "#66BB6A",
    url: "/ocd/activities/clutter-journal"
  },
  {
    id: "emotion-journal",
    label: "Emotion Journal",
    icon: BookOpen,
    bgColor: "#F3E5F5",
    iconColor: "#AB47BC",
    url: "/ocd/activities/clutter-journal"
  }
];

export function HoardingOCDPage() {
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
                <h1 className="text-2xl font-bold text-[#020817]">Hoarding OCD</h1>
                <p className="text-sm text-[#64748B]">Resources and tools for managing Hoarding OCD</p>
              </div>
            </div>
          </motion.div>

          {/* Articles Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4"
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
                  <p className="text-sm text-[#64748B]">Research and clinical perspectives</p>
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
                        className="w-full bg-[#F0F4FF] border border-[#C7D7FE] rounded-xl p-4 hover:shadow-md transition-all text-left"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#A855F7] font-semibold text-sm">
                            {article.id}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-[#020817] mb-1">
                              {article.title}
                            </h4>
                            <p className="text-xs text-[#64748B]">
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

          {/* Real Stories Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <button
              onClick={() => toggleSection("stories")}
              className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users size={28} className="text-white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#020817]">Real Stories</h3>
                  <p className="text-sm text-[#64748B]">Authentic experiences of recovery</p>
                </div>
              </div>
              {expandedSection === "stories" ? (
                <ChevronUp size={24} className="text-[#06B6D4]" />
              ) : (
                <ChevronDown size={24} className="text-[#64748B]" />
              )}
            </button>

            <AnimatePresence>
              {expandedSection === "stories" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 space-y-3">
                    {stories.map((story) => (
                      <button
                        key={story.id}
                        onClick={() => {
                          if (story.url) {
                            navigate(story.url);
                          }
                        }}
                        className="w-full bg-[#E0F7FA] border border-[#B2EBF2] rounded-xl p-4 hover:shadow-md transition-all text-left"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#06B6D4] font-semibold text-sm">
                            {story.id}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-[#020817] mb-1">
                              {story.title}
                            </h4>
                            <p className="text-xs text-[#64748B]">
                              {story.description}
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
                  <BookOpen size={24} className="text-white" strokeWidth={2} />
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
                  onClick={() => { if (tool.url) navigate(tool.url); }}
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

