import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Wrench,
  Clock,
  Lightbulb,
  Target,
  Mail
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
    title: "Pure O OCD — What It Is, Symptoms, and How It's Treated",
    description: "One of the most thorough and beginner-friendly articles on Pure O OCD available online...",
    url: "/pure-o-article-1"
  },
  {
    id: 2,
    title: "The Myth of the Pure Obsessional Type in OCD",
    description: "A landmark scientific study that challenges the very foundation of the \"Pure O\" label...",
    url: "/pure-o-article-2"
  },
  {
    id: 3,
    title: "How Does Pure O OCD Impact a Patient's Treatment Plan?",
    description: "A deeply practical approach focusing on what Pure O means for treatment...",
    url: "/pure-o-article-3"
  },
  {
    id: 4,
    title: "Pure O — An Exploration into a Lesser-Known Form of OCD",
    description: "One of the most human and relatable articles covering a wide range of subtypes...",
    url: "/pure-o-article-4"
  },
  {
    id: 5,
    title: "Pure O — Fact or Fiction?",
    description: "A thought-provoking article directly confronting the most debated question in the field...",
    url: "/pure-o-article-5"
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
    title: "Elliot — \"Just Existing in My Mind Was a Struggle\"",
    description: "A relatable and honest account of Pure O OCD from a young person's perspective...",
    url: "/pure-o-story-1"
  },
  {
    id: 2,
    title: "Jenni Brooks — Overlooked as a Child, Recovered as an Adult",
    description: "A powerful story exposing a heartbreaking failure of the mental health system...",
    url: "/pure-o-story-2"
  },
  {
    id: 3,
    title: "Shaun — Diagnosed at 27 After Months of Torment",
    description: "One of the most courageous accounts of Pure O OCD, diagnosed after months of suffering...",
    url: "/pure-o-story-3"
  },
  {
    id: 4,
    title: "Anonymous — \"I Couldn't Believe I Wasn't a Complete Monster\"",
    description: "A searingly honest account of living with intrusive, taboo thoughts...",
    url: "/pure-o-story-4"
  },
  {
    id: 5,
    title: "Hussain — From Bedridden at 22 to a Beacon of Hope",
    description: "A complete and powerful recovery account spanning from age 10 to full recovery...",
    url: "/pure-o-story-5"
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
    id: "diffusion-exercise",
    label: "Thought Diffusion",
    icon: Clock,
    bgColor: "#F3E5F5",
    iconColor: "#A855F7",
    url: "/ocd/activities/thought-diffusion"
  },
  {
    id: "thought-or-truth",
    label: "Thought or Truth",
    icon: Lightbulb,
    bgColor: "#E3F2FD",
    iconColor: "#3B82F6",
    url: "/ocd/activities/thought-truth"
  },
  {
    id: "uncertainty-acceptance",
    label: "Uncertainty Acceptance Practice",
    icon: Target,
    bgColor: "#E8F5E9",
    iconColor: "#10B981",
    url: "/ocd/activities/uncertainty-acceptance"
  },
  {
    id: "letter-to-ocd",
    label: "A Letter to My OCD",
    icon: Mail,
    bgColor: "#FCE7F3",
    iconColor: "#EC4899",
    url: "/ocd/activities/letter-to-ocd"
  }
];

export function PureOOCDPage() {
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
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#64748B] hover:text-[#043570] mb-4 transition-colors"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="white"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#020817]">Pure O OCD</h1>
                <p className="text-sm text-[#64748B] mt-1">Articles, stories, and interactive tools</p>
              </div>
            </div>
          </motion.div>

          {/* Articles Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
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
                  <p className="text-sm text-[#64748B]">Research and expert perspectives</p>
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
                          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#3B82F6] font-semibold text-base">
                            {article.id}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-[#020817] mb-1">
                              {article.title}
                            </h4>
                            <p className="text-xs text-[#3B82F6]">
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
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <button
              onClick={() => toggleSection("stories")}
              className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#EC4899] to-[#DB2777] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users size={28} className="text-white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#020817]">Real Stories</h3>
                  <p className="text-sm text-[#64748B]">Personal experiences and recovery journeys</p>
                </div>
              </div>
              {expandedSection === "stories" ? (
                <ChevronUp size={24} className="text-[#64748B]" />
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
                        className="w-full bg-[#FCE7F3] border border-[#FBCFE8] rounded-xl p-4 hover:shadow-md transition-all text-left"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#EC4899] font-semibold text-base">
                            {story.id}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-[#020817] mb-1">
                              {story.title}
                            </h4>
                            <p className="text-xs text-[#EC4899]">
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
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Wrench size={28} className="text-white" strokeWidth={2} />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-[#020817]">Interactive Tools</h3>
                <p className="text-sm text-[#64748B]">Tools for managing mental compulsions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
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
                    className="border border-[#E5E7EB] rounded-xl p-4 hover:shadow-md transition-all"
                    style={{ backgroundColor: tool.bgColor }}
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: tool.iconColor }}
                      >
                        <Icon size={24} className="text-white" strokeWidth={2} />
                      </div>
                      <span className="text-sm font-semibold text-[#020817]">
                        {tool.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

