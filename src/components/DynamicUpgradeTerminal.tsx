import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight, ShieldCheck, Sparkles, Compass, GraduationCap, Users } from "lucide-react";
import { UpgradeOption, UpgradeOptionDetail } from "../types";

interface DynamicUpgradeTerminalProps {
  onOpenChat: (initialPrompt?: string) => void;
  onScrollToEducation: () => void;
  onScrollToApproach?: () => void;
}

export default function DynamicUpgradeTerminal({
  onOpenChat,
  onScrollToEducation,
  onScrollToApproach,
}: DynamicUpgradeTerminalProps) {
  const [selectedOption, setSelectedOption] = useState<UpgradeOption>("programs");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const options: UpgradeOptionDetail[] = [
    {
      id: "programs",
      label: "Our Educational Mission",
      title: "Helping real estate professionals stay ahead in a changing industry.",
      description: "Upgraded combines Florida licensing education with modern professional development to help professionals adapt, grow, and lead throughout every stage of their careers.",
      badge: "Education"
    },
    {
      id: "ai_help",
      label: "AI help for next step",
      title: "Interactive AI Career Strategist",
      description: "Get personalized guidance. Our integrated intelligence maps your current credentials to the fastest path forward.",
      badge: "Instant Assistance"
    },
    {
      id: "jump_start",
      label: "Jump Start education",
      title: "New Agent Launchpad",
      description: "Begin your Florida real estate career from scratch. High-pass-rate syllabus with adaptive learning schedules.",
      badge: "63-Hour Track"
    },
    {
      id: "renew_license",
      label: "Renew License",
      title: "Fast-Track 14-Hour Renewal",
      description: "Stay compliant with state mandates. Keep your active status without the typical classroom friction.",
      badge: "State Approved"
    },
    {
      id: "leadership",
      label: "Meet leadership",
      title: "The Minds Behind Upgraded",
      description: "We are educators, technologists, and veteran industry strategists rewriting the standard for real estate success.",
      badge: "Founders"
    }
  ];

  const activeDetail = options.find((o) => o.id === selectedOption) || options[0];

  const handleSelect = (id: UpgradeOption) => {
    setSelectedOption(id);
    setIsOpen(false);
  };

  return (
    <div id="upgrade-terminal" className="w-full max-w-5xl mx-auto my-8 px-4">
      {/* Selector Dropdown Container */}
      <div ref={dropdownRef} className="relative z-20 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono mb-2 font-semibold">
          how would you like to start?
        </span>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-4 px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all duration-300 min-w-[300px] sm:min-w-[360px] text-black font-sans font-medium text-sm group"
        >
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 bg-black rounded-full" />
            {activeDetail.label}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full mt-2 w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-30"
            >
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-xs font-medium flex items-center justify-between ${
                    selectedOption === opt.id
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-50 text-gray-550"
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                    selectedOption === opt.id
                      ? "bg-black text-white"
                      : "bg-gray-150 text-gray-450"
                  }`}>
                    {opt.badge}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal View Content Panel */}
      <div className="mt-8 relative">
        {/* Soft, clean shadows and neutral backdrop */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent rounded-3xl -m-4 blur-2xl opacity-40 pointer-events-none" />
        
        <motion.div
          layout
          className="relative bg-white border-0 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] transition-all duration-500 overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50/60 border-b border-gray-100">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            </div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 bg-black rounded-full" />
              {activeDetail.badge}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOption}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Visual / Icon Panel */}
                <div className="col-span-1 md:col-span-3 flex justify-center md:justify-start">
                  <div className="relative p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32">
                    <div className="absolute inset-0 bg-gray-100/30 rounded-2xl animate-pulse" />
                    {selectedOption === "programs" && <GraduationCap className="w-10 h-10 text-black relative z-10" />}
                    {selectedOption === "ai_help" && <Sparkles className="w-10 h-10 text-black relative z-10" />}
                    {selectedOption === "jump_start" && <Compass className="w-10 h-10 text-black relative z-10" />}
                    {selectedOption === "renew_license" && <ShieldCheck className="w-10 h-10 text-black relative z-10" />}
                    {selectedOption === "leadership" && <Users className="w-10 h-10 text-black relative z-10" />}
                  </div>
                </div>

                {/* Content Details */}
                <div className="col-span-1 md:col-span-9 space-y-4 text-center md:text-left">
                  <div className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-800 text-[10px] font-mono font-semibold rounded uppercase tracking-wider">
                    {activeDetail.badge}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-black font-sans">
                    {activeDetail.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                    {activeDetail.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
                    {selectedOption === "programs" && (
                      <>
                        <button
                          onClick={onScrollToEducation}
                          className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full font-semibold text-xs hover:bg-neutral-900 transition-all duration-300 shadow-sm cursor-pointer"
                        >
                          Explore Learning Paths
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={onScrollToApproach}
                          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full font-semibold text-xs hover:bg-gray-50 hover:text-black hover:border-black transition-all duration-300 cursor-pointer"
                        >
                          Learn More
                        </button>
                      </>
                    )}

                    {selectedOption === "ai_help" && (
                      <button
                        onClick={() => onOpenChat("What are the best real estate learning paths for a beginner?")}
                        className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full font-medium text-xs hover:bg-neutral-900 transition-all duration-300 shadow-sm"
                      >
                        Launch AI Advisor
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {selectedOption === "jump_start" && (
                      <button
                        onClick={onScrollToEducation}
                        className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full font-medium text-xs hover:bg-neutral-900 transition-all duration-300 shadow-sm"
                      >
                        Pre-License Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {selectedOption === "renew_license" && (
                      <button
                        onClick={onScrollToEducation}
                        className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full font-medium text-xs hover:bg-neutral-900 transition-all duration-300 shadow-sm"
                      >
                        Renew Checklist
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {selectedOption === "leadership" && (
                      <div className="flex gap-4 items-center">
                        <div className="flex -space-x-2">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100"
                            alt="Leader"
                            className="w-8 h-8 rounded-full border border-white object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
                            alt="Leader"
                            className="w-8 h-8 rounded-full border border-white object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono uppercase">Expert Florida Real Estate Strategists</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
