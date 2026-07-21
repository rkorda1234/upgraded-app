import { useState, useRef, RefObject, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Compass, 
  HelpCircle, 
  Layers, 
  ChevronRight, 
  CheckCircle, 
  Zap, 
  Users, 
  Award, 
  GraduationCap,
  MessageSquare,
  Volume2
} from "lucide-react";
import PointerParticles from "./components/PointerParticles";
import DynamicUpgradeTerminal from "./components/DynamicUpgradeTerminal";
import AIChatConsole from "./components/AIChatConsole";
import ProgramGrid from "./components/ProgramGrid";
import HeroAnimation from "./components/HeroAnimation";
import GoogleReviewsWidget from "./components/GoogleReviewsWidget";
import FAQAccordion from "./components/FAQAccordion";
import LicensingEducationView from "./components/LicensingEducationView";
import heroVisual from "./assets/images/upgraded_hero_visual_1784582864331.jpg";

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'licensing'>('home');
  const [showFloatingChat, setShowFloatingChat] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [subscribed, setSubscribed] = useState(false);
  
  const learningPathsRef = useRef<HTMLDivElement | null>(null);
  const approachRef = useRef<HTMLDivElement | null>(null);
  const aiAdvisorRef = useRef<HTMLDivElement | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [pageHeight, setPageHeight] = useState(0);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, {
    damping: 25,
    stiffness: 100,
    mass: 0.4,
    restDelta: 0.01
  });

  const y = useTransform(smoothY, (value) => -value);

  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        setPageHeight(scrollRef.current.scrollHeight);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    const interval = setInterval(handleResize, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
      resizeObserver.disconnect();
      clearInterval(interval);
    };
  }, []);

  const scrollToSection = (ref: RefObject<HTMLDivElement | null>) => {
    if (ref.current && scrollRef.current) {
      const rect = ref.current.getBoundingClientRect();
      const currentScroll = window.scrollY;
      const targetScroll = rect.top + currentScroll - 90;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToElement = (selector: string) => {
    const element = document.querySelector(selector);
    if (element && scrollRef.current) {
      const rect = element.getBoundingClientRect();
      const currentScroll = window.scrollY;
      const targetScroll = rect.top + currentScroll - 90;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const handleOpenChatWithPrompt = (prompt?: string) => {
    setChatInitialPrompt(prompt);
    setShowFloatingChat(true);
    // Also scroll down to the chat panel area to make it obvious
    scrollToSection(aiAdvisorRef);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans antialiased selection:bg-gray-100 selection:text-black relative overflow-x-hidden">
      {/* Spacer to make page scrollable based on content height */}
      <div style={{ height: pageHeight }} className="w-full pointer-events-none" />

      {/* 1. Futuristic Cursor Arrow Particles Animation (Placed outside to keep tracking pixel-perfect) */}
      <PointerParticles />

      {/* Fixed viewport container holding the smooth scroll content */}
      <motion.div
        ref={scrollRef}
        style={{ y }}
        className="fixed top-0 left-0 right-0 w-full overflow-hidden flex flex-col"
      >
        {/* Background Decorative Elements (Hints of Motion) */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-50px] right-[-50px] w-[300px] h-[300px] bg-gradient-to-tl from-gray-100 to-transparent rounded-full opacity-60 blur-3xl pointer-events-none" />

      {/* 2. Brand Header / Navigation */}
      <nav className="sticky top-0 z-40 bg-[#FAFAFA]/80 backdrop-blur-md px-6 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-1.5 cursor-pointer select-none" 
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="text-2xl font-black tracking-tight text-black font-sans flex items-center">
              Upgr
              <span className="inline-block mx-[0.5px] text-black">
                <svg className="w-[18px] h-[18px] transform rotate-[-15deg] translate-y-[-1.5px]" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 12 L88 88 L50 68 L12 88 Z" />
                </svg>
              </span>
              ded
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden xl:flex items-center gap-6 text-[12px] font-sans uppercase tracking-wider text-gray-400 font-semibold">
            <button 
              onClick={() => {
                setActiveView('licensing');
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`transition-colors cursor-pointer text-left ${activeView === 'licensing' ? 'text-black font-bold' : 'hover:text-black'}`}
            >
              LICENSING EDUCATION
            </button>
            <button 
              onClick={() => {
                setActiveView('home');
                setTimeout(() => scrollToSection(learningPathsRef), 100);
              }}
              className={`hover:text-black transition-colors cursor-pointer text-left`}
            >
              PROFESSIONAL DEVELOPMENT
            </button>
            <button 
              onClick={() => {
                setActiveView('home');
                setTimeout(() => scrollToSection(approachRef), 100);
              }}
              className={`hover:text-black transition-colors cursor-pointer text-left`}
            >
              LEADERSHIP
            </button>
            <button 
              onClick={() => {
                setActiveView('home');
                setTimeout(() => scrollToElement('footer'), 100);
              }}
              className={`hover:text-black transition-colors cursor-pointer text-left`}
            >
              CONTACT
            </button>
            <button 
              onClick={() => alert("Upgraded Student Portal: Secure sandbox environment verified. Standard student sign-in is coming soon.")}
              className="hover:text-black transition-colors cursor-pointer text-left text-black font-extrabold"
            >
              STUDENT LOGIN
            </button>
          </div>

          {/* Action Header Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection(aiAdvisorRef)}
              className="bg-black hover:bg-neutral-900 text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 shadow-sm flex items-center gap-1.5 hover:scale-[1.03] active:scale-[0.98] hover:shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-gray-300" />
              AI Career Advisor
            </button>
          </div>
        </div>
      </nav>

      {activeView === 'home' ? (
        <>
          {/* 3. Hero Section - Separated with generous negative space and a clean border bottom */}
      <header className="relative pt-28 pb-32 px-6 overflow-hidden border-b border-gray-100 mb-20">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        {/* Dynamic technology-focused animation representing growth and pathways */}
        <HeroAnimation />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Logo badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm text-xs font-semibold text-gray-400"
          >
            <span className="font-mono tracking-widest text-[9px] uppercase">The Future of Learning</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[44px] sm:text-[64px] md:text-[76px] leading-[0.95] font-semibold tracking-tight text-black max-w-4xl mx-auto font-display"
          >
            Where Modern <br />
            Agents <span className="text-gray-400 italic font-light">Upgrade</span> Themselves.
          </motion.h1>

          {/* Interactive dropdown component below the headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <DynamicUpgradeTerminal 
              onOpenChat={handleOpenChatWithPrompt} 
              onScrollToEducation={() => scrollToSection(learningPathsRef)} 
              onScrollToApproach={() => scrollToSection(approachRef)}
            />
          </motion.div>
        </div>
      </header>

      {/* 4. Visual Layout Split: Premium Hero Image + Interactive AI Console */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Hero Image Block with 3D shadow lift effect */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="group relative bg-white border border-gray-150 p-3 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] hover:scale-[1.01] transition-all duration-500 cursor-pointer overflow-hidden h-full flex flex-col">
              <div className="relative aspect-video sm:aspect-auto sm:flex-1 rounded-2xl overflow-hidden bg-slate-900 min-h-[320px]">
                {/* 3D soft overlay shadow gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 z-10" />
                
                <img
                  src={heroVisual}
                  alt="Upgraded Premium Learning Architectural Hub"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Info Overlay inside image */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 space-y-1.5 text-left">
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">
                    Florida State DBPR Provider
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
                    Premium Technological Hub
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm max-w-md">
                    Designed for high-performance Florida real estate professionals seeking modern certification paired with actionable AI and marketing blueprints.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive AI Chat Console Bento Block */}
          <div ref={aiAdvisorRef} className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="space-y-1.5 text-left">
                <div className="flex items-center gap-2 text-black font-mono text-[10px] font-bold uppercase tracking-widest">
                  <Zap className="w-3.5 h-3.5 text-black" />
                  Dual-Mode Assist
                </div>
                <h3 className="text-2xl font-bold text-black tracking-tight font-display">
                  Instant AI Advice & Career Roadmap
                </h3>
                <p className="text-gray-500 text-sm">
                  Simulate voice conversations or drop questions about curriculum paths. Unmute for direct vocal response.
                </p>
              </div>

              {/* Integrated Chat Console */}
              <AIChatConsole />
            </div>
          </div>

        </div>
      </section>

      {/* 5. Education That Evolves With You Section */}
      <section ref={approachRef} className="bg-white border-y border-gray-150 py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-white border border-gray-200 px-3.5 py-1 rounded-full shadow-sm">
              <Layers className="w-3 h-3 text-gray-500" />
              Instructional Standard
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold text-black tracking-tight leading-tight font-display">
              Education That Evolves With You
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto space-y-1.5 mt-6 px-4">
              <span className="block">The way professionals learn should evolve just as quickly as the industry itself.</span>
              <span className="block">Information has never been more accessible, yet access alone is no longer the challenge.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-150 rounded-2xl p-8 space-y-4 hover:border-black hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] transition-all duration-500 transform-gpu cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200 text-black">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-black font-display">Knowing What Matters</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                The challenge is knowing what truly matters. At Upgraded, we believe education should do more than deliver content. It should provide clarity.
              </p>
            </div>

            <div className="bg-white border border-gray-150 rounded-2xl p-8 space-y-4 hover:border-black hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] transition-all duration-500 transform-gpu cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200 text-black">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-black font-display">Continuous Adaptability</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Our educational approach continuously evolves alongside the industry, helping professionals focus on the knowledge, skills, and strategies that create the greatest value.
              </p>
            </div>

            <div className="bg-white border border-gray-150 rounded-2xl p-8 space-y-4 hover:border-black hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] transition-all duration-500 transform-gpu cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200 text-black">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-black font-display">Staying Ahead</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Because staying ahead starts with education that evolves with you. Upgraded is built upon that precise foundation.
              </p>
            </div>
          </div>

          {/* Premium Tech Comparison Block */}
          <div className="bg-black rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-bold">Standard vs Upgraded</span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">The Future-Proof Distinction</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Traditional real estate schools optimize for passive compliance and memorization. Upgraded optimizes for professional dominance, tech fluency, and sustainable career compounding.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-3">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-bold">Traditional Education</h4>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex items-center gap-2">✕ Static, outdated PDFs</li>
                    <li className="flex items-center gap-2">✕ Pure compliance overhead</li>
                    <li className="flex items-center gap-2">✕ Dry legal lecture format</li>
                    <li className="flex items-center gap-2">✕ Zero tech/business integration</li>
                  </ul>
                </div>

                <div className="bg-neutral-800/40 border border-neutral-700/60 rounded-2xl p-6 space-y-3">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-white font-bold">Upgraded Learning</h4>
                  <ul className="space-y-2 text-xs text-gray-200 font-medium">
                    <li className="flex items-center gap-2">✓ Beautiful micro-syllabus</li>
                    <li className="flex items-center gap-2">✓ Career growth integration</li>
                    <li className="flex items-center gap-2">✓ High exam pass algorithms</li>
                    <li className="flex items-center gap-2">✓ Specialized AI & marketing playbooks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Explore Your Learning Path Section */}
      <section ref={learningPathsRef} className="py-24 px-6 max-w-7xl mx-auto relative">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-white px-3.5 py-1 rounded-full border border-gray-200 shadow-sm">
              Interactive Catalog
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-black tracking-tight leading-tight font-display">
              Explore Your Learning Path
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Whether you're starting your real estate career, maintaining your license, or investing in your professional development, Upgraded offers learning experiences designed for every stage of your journey.
            </p>
          </div>

          {/* Programs Grid Component */}
          <ProgramGrid />
        </div>
      </section>

      {/* Google Reviews Widget */}
      <GoogleReviewsWidget />

      {/* FAQ Accordion Section */}
      <FAQAccordion />
        </>
      ) : (
        <LicensingEducationView onOpenChat={handleOpenChatWithPrompt} />
      )}

      {/* 7. Beautiful Newsletter / Contact Footer Block */}
      <footer className="bg-black text-gray-400 py-20 px-6 relative border-t border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          <div className="col-span-1 md:col-span-5 space-y-6 text-left">
            <div 
              className="flex items-center gap-1.5 cursor-pointer select-none" 
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="text-2xl font-black tracking-tight text-white font-sans flex items-center">
                Upgr
                <span className="inline-block mx-[0.5px] text-white">
                  <svg className="w-[18px] h-[18px] transform rotate-[-15deg] translate-y-[-1.5px]" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 12 L88 88 L50 68 L12 88 Z" />
                  </svg>
                </span>
                ded
              </span>
            </div>
            
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Where Modern Agents Upgrade Themselves. Bridging official Florida DBPR-compliant licensing education with cutting-edge real-world systems, AI marketing, and scalable business planning.
            </p>

            <div className="text-[10px] font-mono text-gray-600 leading-relaxed">
              © {new Date().getFullYear()} Upgraded Real Estate Education. All rights reserved. <br />
              Florida State DBPR Approved Real Estate Platform.
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1 md:col-span-3 space-y-4 text-left">
            <h4 className="text-white text-[10px] font-mono uppercase tracking-widest font-semibold">Curriculum paths</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => {
                    setActiveView('home');
                    setTimeout(() => scrollToSection(learningPathsRef), 100);
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left text-gray-400"
                >
                  63-Hour Florida Pre-License
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActiveView('home');
                    setTimeout(() => scrollToSection(learningPathsRef), 100);
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left text-gray-400"
                >
                  14-Hour Florida CE Renewal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActiveView('home');
                    setTimeout(() => scrollToSection(learningPathsRef), 100);
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left text-gray-400"
                >
                  45-Hour Florida Post-License
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActiveView('home');
                    setTimeout(() => scrollToSection(learningPathsRef), 100);
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left text-gray-400"
                >
                  AI for Real Estate Professionals
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div className="col-span-1 md:col-span-4 space-y-4 text-left">
            <h4 className="text-white text-[10px] font-mono uppercase tracking-widest font-semibold font-sans">Newsletter</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Subscribe to get notified about upcoming Florida Pre-Licensing cohorts, law adjustments, and AI real estate prompt packages.
            </p>
            
            {subscribed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white text-xs font-mono font-bold flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                ✓ Joined Upgraded waitlist successfully
              </motion.div>
            ) : (
              <div className="flex gap-2 bg-neutral-900 border border-neutral-800 p-1.5 rounded-xl">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="bg-transparent border-0 text-white placeholder-gray-600 text-xs px-3 focus:outline-none focus:ring-0 flex-1 min-w-0"
                />
                <button
                  onClick={() => setSubscribed(true)}
                  className="px-4 py-2 bg-white hover:bg-neutral-100 text-black font-semibold rounded-lg text-xs transition-all cursor-pointer font-sans shrink-0"
                >
                  Join Waitlist
                </button>
              </div>
            )}
          </div>
        </div>
      </footer>
      </motion.div>
    </div>
  );
}
