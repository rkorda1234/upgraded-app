import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, ShieldAlert, Sparkles, BookOpen, Clock, Layers, ArrowRight, X, CheckCircle2 } from "lucide-react";
import { Program, ProgramCategory } from "../types";

interface ProgramGridProps {
  onExploreCourses?: (courseId?: string, category?: string) => void;
}

const PROGRAM_TO_COURSE_ID: Record<string, string> = {
  "pre-license": "fl-63hr-prelicensing",
  "continuing-ed": "fl-14hr-ce",
  "post-license": "fl-45hr-postlicensing",
  "ai-real-estate": "ai-real-estate",
  "marketing-growth": "marketing-growth-mastery",
  "business-planning": "business-planning-masterclass"
};

export default function ProgramGrid({ onExploreCourses }: ProgramGridProps) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const categories: ProgramCategory[] = [
    {
      id: "licensing",
      title: "Florida Licensing Education",
      description: "State-approved courses designed to meet formal compliance demands while laying down a modern, practical foundation for real-world real estate operations.",
      ctaText: "Explore Licensing Education",
      programs: [
        {
          id: "pre-license",
          title: "63-Hour Florida Sales Associate Pre-License",
          status: "active",
          hours: "63 Hours",
          description: "Our premier pre-licensing path. Built with advanced educational engineering to guarantee state exam readiness on your very first try.",
          highlights: [
            "Comprehensive law & practice prep",
            "Simulated state-grade practice exams",
            "Interactive audio & text modules",
            "Mobile-friendly micro-learning bits"
          ]
        },
        {
          id: "continuing-ed",
          title: "14-Hour Florida Continuing Education",
          status: "active",
          hours: "14 Hours",
          description: "A streamlined, frictionless path to fulfill your biennial state renewal. Zero nonsense, high retention of new legislative updates.",
          highlights: [
            "Core Law & Real Estate Ethics included",
            "100% online self-paced study",
            "Auto-reporting directly to DBPR",
            "Downloadable immediate certificate"
          ]
        },
        {
          id: "post-license",
          title: "45-Hour Florida Sales Associate Post-License",
          status: "active",
          hours: "45 Hours",
          description: "Complete your first renewal cycle successfully with intensive business-building principles rather than just rote legal theory.",
          highlights: [
            "Operational mechanics of listings & contracts",
            "Risk management & professional liability",
            "Advanced property valuations",
            "Practical escrow & trust accounting"
          ]
        }
      ]
    },
    {
      id: "pro-development",
      title: "Professional Development",
      description: "Futuristic education focusing on cutting-edge systems, marketing mastery, and business frameworks to keep modern agents ahead of the curve.",
      ctaText: "Explore Professional Development",
      programs: [
        {
          id: "ai-real-estate",
          title: "AI for Real Estate Professionals",
          status: "new",
          hours: "8 Modules",
          description: "Master the exact prompt structures, custom GPTs, and text/image generators to produce high-end copy, property sheets, and marketing funnels in seconds.",
          highlights: [
            "Master Gemini & ChatGPT architectures",
            "Auto-generate high-conversion listings",
            "Build automated lead nurturing systems",
            "AI-powered local market micro-reports"
          ]
        },
        {
          id: "marketing-growth",
          title: "Marketing & Business Growth",
          status: "active",
          hours: "12 Modules",
          description: "Transition from old-school cold calling to organic digital attraction, professional video content strategies, and localized search dominance.",
          highlights: [
            "Short-form vertical video blueprint",
            "Local hyper-targeted SEO techniques",
            "Paid acquisition on premium networks",
            "Personal brand positioning & design"
          ]
        },
        {
          id: "business-planning",
          title: "Business Planning for Real Estate",
          status: "active",
          hours: "6 Modules",
          description: "Operate like a high-growth tech enterprise. Create scalable financial systems, CRM routines, and structural operations for sustainable longevity.",
          highlights: [
            "P&L generation and tax planning",
            "High-efficiency calendar & lead block systems",
            "Team building and standard operating rules",
            "Predictive data pipelines & metrics"
          ]
        }
      ]
    }
  ];

  return (
    <div id="learning-paths" className="space-y-20 py-8">
      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {categories.map((category) => {
          const isDark = category.id === "pro-development";
          return (
            <div
              key={category.id}
              className={`flex flex-col p-8 sm:p-10 rounded-3xl transition-all duration-500 relative overflow-hidden ${
                isDark 
                  ? "bg-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)]" 
                  : "bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)]"
              }`}
            >
              <div className="relative z-10 flex-1 space-y-6">
                {/* Category Header */}
                <div className="space-y-3 lg:min-h-[165px]">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${
                      isDark 
                        ? "bg-neutral-900 text-white border border-neutral-800" 
                        : "bg-gray-50 text-black border border-gray-100"
                    }`}>
                      {!isDark ? <GraduationCap className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${isDark ? "text-gray-400" : "text-blue-600"}`}>
                      {category.id === "licensing" ? "Florida Licensing" : "Modern Growth"}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {category.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {category.description}
                  </p>
                </div>

                {/* Programs List */}
                <div className={`space-y-4 pt-4 border-t ${isDark ? "border-neutral-900" : "border-gray-100"}`}>
                  {category.programs.map((prog) => (
                    <div
                      key={prog.id}
                      onClick={() => setSelectedProgram(prog)}
                      className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 border ${
                        isDark 
                          ? "bg-neutral-950/60 hover:bg-neutral-900 border-neutral-900/60 hover:border-neutral-800" 
                          : "bg-gray-50/50 hover:bg-white border-transparent hover:border-gray-200"
                      }`}
                    >
                      <div className="space-y-1.5 pr-4 text-left">
                        <h4 className="text-sm font-semibold transition-colors leading-snug">
                          {prog.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Status badges below the course title */}
                          {prog.status === "coming_soon" && (
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase border ${
                              isDark 
                                ? "bg-neutral-900 text-gray-400 border-neutral-800" 
                                : "bg-gray-100 text-gray-450 border-gray-150"
                            }`}>
                              Coming Soon
                            </span>
                          )}
                          {prog.status === "new" && (
                            <span className="text-[9px] font-mono px-2 py-0.5 bg-white text-black rounded font-bold uppercase border border-gray-200">
                              New
                            </span>
                          )}
                          {prog.status === "active" && (
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase border ${
                              isDark 
                                ? "bg-neutral-800 text-gray-300 border-neutral-700" 
                                : "bg-gray-50 text-gray-400 border-gray-100"
                            }`}>
                              Verified
                            </span>
                          )}
                        </div>

                        <p className={`text-xs line-clamp-1 ${isDark ? "text-gray-500" : "text-gray-450"}`}>
                          {prog.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {prog.hours && (
                          <span className={`text-[10px] font-mono font-medium px-2 py-1 rounded border ${
                            isDark 
                              ? "bg-neutral-900 text-gray-400 border-neutral-800" 
                              : "bg-white text-gray-500 border-gray-200"
                          }`}>
                            {prog.hours}
                          </span>
                        )}
                        <div className={`p-1.5 rounded-lg border transition-all ${
                          isDark 
                            ? "bg-neutral-950 border-neutral-800 text-gray-400 group-hover:text-white group-hover:border-neutral-700" 
                            : "bg-white border-gray-200 text-gray-400 group-hover:text-black group-hover:border-gray-400"
                        }`}>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Action Link */}
              <div className={`mt-8 pt-4 border-t flex justify-end ${isDark ? "border-neutral-900" : "border-gray-100"}`}>
                <button 
                  onClick={() => {
                    if (onExploreCourses) {
                      const catName = category.id === "licensing" ? "Licensing Education" : "Professional Development";
                      onExploreCourses(undefined, catName);
                    } else {
                      setSelectedProgram(category.programs[0]);
                    }
                  }}
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group transition-colors cursor-pointer ${
                    isDark ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                  }`}
                >
                  {category.ctaText}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Program Detail Syllabus Overlay Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-gray-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-black"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="relative px-6 py-6 border-b border-gray-100 bg-gray-50/50 flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                    Syllabus Overview
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-display">
                    {selectedProgram.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-black rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-bold">Course Scope</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedProgram.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[9px] font-mono text-gray-400 uppercase font-bold">Duration</p>
                      <p className="text-xs font-semibold text-black">{selectedProgram.hours || "Self-Paced"}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-3">
                    <Layers className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[9px] font-mono text-gray-400 uppercase font-bold">Method</p>
                      <p className="text-xs font-semibold text-black">Online Interactive</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-bold">Key Syllabus Focus Areas</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProgram.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <span className="text-[10px] font-mono text-gray-400 uppercase">Official Upgraded certification path</span>
                
                {selectedProgram.status === "coming_soon" ? (
                  <button
                    disabled
                    className="px-5 py-2.5 bg-gray-200 text-gray-400 rounded-full text-xs font-semibold cursor-not-allowed text-center"
                  >
                    Launching Soon (Waiting list active)
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const progId = selectedProgram.id;
                      setSelectedProgram(null);
                      if (onExploreCourses) {
                        const targetCourseId = PROGRAM_TO_COURSE_ID[progId] || (progId.includes("continuing") ? "fl-14hr-ce" : "fl-63hr-prelicensing");
                        onExploreCourses(targetCourseId);
                      }
                    }}
                    className="px-6 py-3 bg-black hover:bg-neutral-900 text-white rounded-full text-xs font-bold shadow transition-all text-center cursor-pointer"
                  >
                    View Program & Enroll
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
