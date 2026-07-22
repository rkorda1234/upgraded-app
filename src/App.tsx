import { useState, useRef, RefObject, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUp,
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
import ProfessionalDevelopmentView from "./components/ProfessionalDevelopmentView";
import LeadershipView from "./components/LeadershipView";
import ContactView from "./components/ContactView";
import PolicyView, { PolicyKey } from "./components/PolicyView";
import ExploreCoursesView from "./components/ExploreCoursesView";
import ThankYouView from "./components/ThankYouView";
import heroVisual from "./assets/images/upgraded_hero_visual_1784582864331.jpg";

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'courses' | 'licensing' | 'pro_dev' | 'leadership' | 'contact' | 'policy' | 'thank_you'>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFloatingChat, setShowFloatingChat] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [subscribed, setSubscribed] = useState(false);
  const [selectedPolicyKey, setSelectedPolicyKey] = useState<PolicyKey>('terms');
  const [activePolicy, setActivePolicy] = useState<string | null>(null);
  
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

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setShowBackToTop(latest > 300);
    });
  }, [scrollY]);

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

  const navigateToView = (
    view: 'home' | 'courses' | 'licensing' | 'pro_dev' | 'leadership' | 'contact' | 'policy' | 'thank_you',
    opts?: { courseId?: string | null; category?: string | null; policyKey?: PolicyKey }
  ) => {
    setActiveView(view);
    const courseId = opts?.courseId !== undefined ? opts.courseId : (view === 'courses' ? selectedCourseId : null);
    const category = opts?.category !== undefined ? opts.category : (view === 'courses' ? selectedCategory : null);
    const policyKey = opts?.policyKey ?? selectedPolicyKey;

    if (view === 'courses') {
      setSelectedCourseId(opts ? (opts.courseId ?? null) : null);
      if (opts?.category) setSelectedCategory(opts.category);
    }
    if (opts?.policyKey) {
      setSelectedPolicyKey(opts.policyKey);
    }

    const url = new URL(window.location.href);
    if (view === 'home') {
      url.search = '';
    } else {
      url.searchParams.set('view', view);
      if (view === 'courses') {
        const activeCourseId = opts ? opts.courseId : selectedCourseId;
        const activeCat = opts ? opts.category : selectedCategory;
        if (activeCourseId) {
          url.searchParams.set('courseId', activeCourseId);
        } else {
          url.searchParams.delete('courseId');
        }
        if (activeCat && activeCat !== 'All') {
          url.searchParams.set('category', activeCat);
        } else {
          url.searchParams.delete('category');
        }
      } else {
        url.searchParams.delete('courseId');
        url.searchParams.delete('category');
      }

      if (view === 'policy' && policyKey) {
        url.searchParams.set('policyKey', policyKey);
      } else {
        url.searchParams.delete('policyKey');
      }
    }

    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExploreCourses = (courseId?: string, category?: string) => {
    navigateToView('courses', { courseId: courseId || null, category: category || "All" });
  };

  useEffect(() => {
    const syncStateFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      const courseId = params.get('courseId');
      const category = params.get('category');
      const policyKey = params.get('policyKey') as PolicyKey | null;

      if (view === 'thank-you' || view === 'thank_you' || params.has('thank-you')) {
        setActiveView('thank_you');
      } else if (view === 'courses' || courseId) {
        setActiveView('courses');
        if (courseId) setSelectedCourseId(courseId);
        if (category) setSelectedCategory(category);
      } else if (view === 'licensing') {
        setActiveView('licensing');
      } else if (view === 'pro_dev' || view === 'pro-dev') {
        setActiveView('pro_dev');
      } else if (view === 'leadership') {
        setActiveView('leadership');
      } else if (view === 'contact') {
        setActiveView('contact');
      } else if (view === 'policy') {
        setActiveView('policy');
        if (policyKey) setSelectedPolicyKey(policyKey);
      } else {
        setActiveView('home');
      }
    };

    syncStateFromUrl();

    window.addEventListener('popstate', syncStateFromUrl);
    return () => window.removeEventListener('popstate', syncStateFromUrl);
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
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans antialiased selection:bg-gray-100 selection:text-black relative overflow-x-hidden">
      <Helmet>
        <link rel="icon" type="image/png" href="https://storage.googleapis.com/funnel-ai-production/chat/f9BI6PkMYA8EmsOEt8AU/Upgraded--1-.png" />
        {activeView === 'home' && (
          <>
            <title>Upgraded | Modern Real Estate Education & Licensing Academy</title>
            <meta name="description" content="Upgraded provides premium DBPR-licensed real estate courses, advanced AI business frameworks, and professional development programs to help you stay ahead." />
            <meta property="og:title" content="Upgraded | Modern Real Estate Education & Licensing Academy" />
            <meta property="og:description" content="Upgraded provides premium DBPR-licensed real estate courses, advanced AI business frameworks, and professional development programs to help you stay ahead." />
          </>
        )}
        {activeView === 'courses' && (
          <>
            <title>Explore Real Estate Courses & DBPR Programs | Upgraded Academy</title>
            <meta name="description" content="Browse state-approved Florida continuing education, pre-licensing, and professional development courses with instant HighLevel checkout." />
            <meta property="og:title" content="Explore Real Estate Courses & DBPR Programs | Upgraded Academy" />
            <meta property="og:description" content="Browse state-approved Florida continuing education, pre-licensing, and professional development courses with instant HighLevel checkout." />
          </>
        )}
        {activeView === 'licensing' && (
          <>
            <title>Real Estate Licensing Education & Renewal | Upgraded Academy</title>
            <meta name="description" content="Earn your Florida real estate license, complete your post-licensing requirements, or renew your active license with our fully compliant, self-paced courses." />
            <meta property="og:title" content="Real Estate Licensing Education & Renewal | Upgraded Academy" />
            <meta property="og:description" content="Earn your Florida real estate license, complete your post-licensing requirements, or renew your active license with our fully compliant, self-paced courses." />
          </>
        )}
        {activeView === 'pro_dev' && (
          <>
            <title>Professional Development & Real Estate AI Blueprints | Upgraded</title>
            <meta name="description" content="Explore advanced marketing strategies, AI toolkits, and business planning blueprints built specifically for high-performance modern agents." />
            <meta property="og:title" content="Professional Development & Real Estate AI Blueprints | Upgraded" />
            <meta property="og:description" content="Explore advanced marketing strategies, AI toolkits, and business planning blueprints built specifically for high-performance modern agents." />
          </>
        )}
        {activeView === 'leadership' && (
          <>
            <title>Founding Team & Visionary Leadership | Upgraded Academy</title>
            <meta name="description" content="Meet the founding team behind Upgraded Academy. Combining deep real estate expertise, education technology, and business innovation." />
            <meta property="og:title" content="Founding Team & Visionary Leadership | Upgraded Academy" />
            <meta property="og:description" content="Meet the founding team behind Upgraded Academy. Combining deep real estate expertise, education technology, and business innovation." />
          </>
        )}
        {activeView === 'contact' && (
          <>
            <title>Contact Our Team | Upgraded Academy</title>
            <meta name="description" content="Have questions about Florida real estate licensing, course enrollment, or professional development? Connect with our team today." />
            <meta property="og:title" content="Contact Our Team | Upgraded Academy" />
            <meta property="og:description" content="Have questions about Florida real estate licensing, course enrollment, or professional development? Connect with our team today." />
          </>
        )}
      </Helmet>

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
            onClick={() => navigateToView('home')}
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
              onClick={() => navigateToView('courses', { courseId: null })}
              className={`transition-colors cursor-pointer text-left ${activeView === 'courses' ? 'text-black font-bold' : 'hover:text-black'}`}
            >
              COURSES
            </button>
            <button 
              onClick={() => navigateToView('licensing')}
              className={`transition-colors cursor-pointer text-left ${activeView === 'licensing' ? 'text-black font-bold' : 'hover:text-black'}`}
            >
              LICENSING EDUCATION
            </button>
            <button 
              onClick={() => navigateToView('pro_dev')}
              className={`transition-colors cursor-pointer text-left ${activeView === 'pro_dev' ? 'text-black font-bold' : 'hover:text-black'}`}
            >
              PROFESSIONAL DEVELOPMENT
            </button>
            <button 
              onClick={() => navigateToView('leadership')}
              className={`transition-colors cursor-pointer text-left ${activeView === 'leadership' ? 'text-black font-bold' : 'hover:text-black'}`}
            >
              LEADERSHIP
            </button>
            <button 
              onClick={() => navigateToView('contact')}
              className={`transition-colors cursor-pointer text-left ${activeView === 'contact' ? 'text-black font-bold' : 'hover:text-black'}`}
            >
              CONTACT
            </button>
            <a 
              href="https://learn.upgradedreacademy.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors cursor-pointer text-left text-black font-extrabold"
            >
              STUDENT LOGIN
            </a>
          </div>

          {/* Action Header Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOpenChatWithPrompt()}
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
            Agents <span className="animate-gradient-text italic font-extrabold">Upgrade</span> Themselves.
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
          <ProgramGrid 
            onExploreCourses={(courseId, category) => handleExploreCourses(courseId, category)}
          />
        </div>
      </section>

      {/* Google Reviews Widget */}
      <GoogleReviewsWidget />

      {/* FAQ Accordion Section */}
      <FAQAccordion />
        </>
      ) : activeView === 'courses' ? (
        <ExploreCoursesView
          initialCourseId={selectedCourseId}
          initialCategory={selectedCategory}
          onOpenChatWithPrompt={handleOpenChatWithPrompt}
          onBackToHome={() => navigateToView('home')}
        />
      ) : activeView === 'licensing' ? (
        <LicensingEducationView 
          onOpenChat={handleOpenChatWithPrompt} 
          onExploreCourses={(courseId, category) => handleExploreCourses(courseId, category)}
        />
      ) : activeView === 'pro_dev' ? (
        <ProfessionalDevelopmentView 
          onOpenChat={handleOpenChatWithPrompt} 
          onExploreCourses={(courseId, category) => handleExploreCourses(courseId, category)}
        />
      ) : activeView === 'leadership' ? (
        <LeadershipView 
          onOpenChat={handleOpenChatWithPrompt} 
          onExploreLearningPaths={() => handleExploreCourses(undefined, "All")}
        />
      ) : activeView === 'contact' ? (
        <ContactView 
          onExploreCourses={() => handleExploreCourses(undefined, "All")}
        />
      ) : activeView === 'thank_you' ? (
        <ThankYouView
          onBackToHome={() => navigateToView('home')}
          onExploreCourses={() => handleExploreCourses(undefined, "All")}
        />
      ) : (
        <PolicyView
          initialPolicy={selectedPolicyKey}
          onBack={() => navigateToView('home')}
        />
      )}

      {/* 7. Beautiful Global Footer */}
      <footer className="bg-black text-gray-400 py-20 px-6 relative border-t border-neutral-900 font-sans">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 items-start">
            
            {/* Brand Slogan */}
            <div className="lg:col-span-4 space-y-5 text-left">
              <div 
                className="flex items-center gap-1.5 cursor-pointer select-none" 
                onClick={() => navigateToView('home')}
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
              <div className="space-y-3">
                <p className="text-sm font-bold text-neutral-200 font-display">
                  Where Modern Agents Upgrade Themselves.
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                  Helping real estate professionals stay ahead in a changing industry.
                </p>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-2 space-y-4 text-left">
              <h4 className="text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button 
                    onClick={() => navigateToView('home')}
                    className={`transition-colors cursor-pointer text-left ${activeView === 'home' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToView('courses', { courseId: null })}
                    className={`transition-colors cursor-pointer text-left ${activeView === 'courses' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Explore Courses
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToView('licensing')}
                    className={`transition-colors cursor-pointer text-left ${activeView === 'licensing' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Licensing Education
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToView('pro_dev')}
                    className={`transition-colors cursor-pointer text-left ${activeView === 'pro_dev' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Professional Development
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToView('leadership')}
                    className={`transition-colors cursor-pointer text-left ${activeView === 'leadership' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Leadership
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToView('contact')}
                    className={`transition-colors cursor-pointer text-left ${activeView === 'contact' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <a 
                    href="https://learn.upgradedreacademy.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors block"
                  >
                    Student Login
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToView('thank_you')}
                    className={`transition-colors cursor-pointer text-left ${activeView === 'thank_you' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Order Confirmation
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-3 space-y-4 text-left">
              <h4 className="text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                Contact
              </h4>
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">
                    Email
                  </p>
                  <a 
                    href="mailto:adriana@upgradedreacademy.com" 
                    className="text-gray-300 hover:text-white font-medium hover:underline block"
                  >
                    adriana@upgradedreacademy.com
                  </a>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  For general inquiries, enrollment assistance, student support, or partnership opportunities, our team is here to help.
                </p>
              </div>
            </div>

            {/* Policies Column */}
            <div className="lg:col-span-3 space-y-4 text-left">
              <h4 className="text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                Policies
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                {[
                  "Student Policies",
                  "Course Purchase & Refund Policy",
                  "Privacy Policy",
                  "Terms & Conditions",
                  "Accessibility Statement",
                  "Cookie Policy"
                ].map((policy) => (
                  <li key={policy}>
                    <button
                      onClick={() => {
                        let key: PolicyKey = "terms";
                        if (policy === "Student Policies") key = "student";
                        else if (policy === "Course Purchase & Refund Policy") key = "refund";
                        else if (policy === "Privacy Policy") key = "privacy";
                        else if (policy === "Terms & Conditions") key = "terms";
                        else if (policy === "Accessibility Statement") key = "accessibility";
                        else if (policy === "Cookie Policy") key = "cookie";
                        
                        navigateToView('policy', { policyKey: key });
                      }}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {policy}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* School Information Block */}
          <div className="border-t border-neutral-900 pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
            <div className="md:col-span-5 space-y-3">
              <h4 className="text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                School Information
              </h4>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white font-display">
                  Upgraded Real Estate School
                </p>
                <p className="text-xs text-neutral-300 font-medium">
                  Licensed Florida Real Estate School
                </p>
                <p className="text-[10px] font-mono text-neutral-500 font-bold tracking-wide">
                  Florida School License #ZH1002624
                </p>
              </div>
            </div>

            <div className="md:col-span-7 text-[11px] leading-relaxed text-neutral-500 space-y-3 max-w-2xl font-sans">
              <p>
                Licensed education is provided by <strong className="text-neutral-400">Upgraded Real Estate School</strong>. Enrollment and payment processing are managed by <strong className="text-neutral-400">Upgraded Real Estate Academy, LLC</strong>.
              </p>
              <p>
                Upgraded Real Estate Academy provides online real estate education. Course approval status, credit eligibility, and applicable licensing requirements are determined by the Florida Department of Business and Professional Regulation (DBPR).
              </p>
              <p>
                Prospective students are encouraged to verify that the selected course meets their individual licensing requirements before enrolling. All educational programs are delivered online unless otherwise stated. No in-person instruction is provided.
              </p>
            </div>
          </div>

          {/* Copyright & Maker Credits */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-neutral-600">
            <p>
              © 2026 Upgraded Real Estate Academy, LLC. All Rights Reserved.
            </p>
            <p className="flex items-center gap-1">
              <span>Designed & Developed by</span>
              <a 
                href="https://marketingverse.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neutral-400 hover:text-white transition-colors font-bold"
              >
                Marketingverse
              </a>
            </p>
          </div>

        </div>
      </footer>

      {/* Interactive Policy Modal Overlay */}
      <AnimatePresence>
        {activePolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePolicy(null)}
              className="absolute inset-0 bg-black cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white border border-gray-150 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-4 shadow-2xl text-left z-10"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  Document / Policy Review
                </span>
                <h3 className="text-xl font-bold text-black font-display tracking-tight pt-1">
                  {activePolicy}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                {activePolicy === "Student Policies" && (
                  "We are committed to providing an exceptional learning environment. Students are expected to complete their coursework honestly, participate actively, and respect instructors and peers in all digital forums. In accordance with DBPR regulations, identity verification is required at various intervals throughout the course programs."
                )}
                {activePolicy === "Course Purchase & Refund Policy" && (
                  "All course purchases are subject to a 7-day satisfaction guarantee, provided that the student has completed less than 10% of the course modules. If these conditions are met, a full refund can be requested by emailing support. After 7 days or 10% completion, all sales are final."
                )}
                {activePolicy === "Privacy Policy" && (
                  "Your privacy is of utmost importance to us. Upgraded Real Estate Academy collects only essential student information (such as name, email, phone number, and licensing details) to register you for courses, provide licensing credit updates, and comply with state DBPR guidelines. We never sell your personal information."
                )}
                {activePolicy === "Terms & Conditions" && (
                  "By enrolling in Upgraded Real Estate Academy courses, you agree to comply with all student guidelines, complete all required modules yourself, and understand that credit eligibility is contingent upon successful course completion and state exam compliance rules."
                )}
                {activePolicy === "Accessibility Statement" && (
                  "We are dedicated to ensuring digital accessibility for all students. We continually improve the user experience for everyone, applying relevant accessibility standards (WCAG 2.1 Level AA) to our learning platforms."
                )}
                {activePolicy === "Cookie Policy" && (
                  "We use essential cookies to manage your login session, track course progress, and maintain platform security. By continuing to use our website, you consent to our use of these technical cookies."
                )}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActivePolicy(null)}
                  className="bg-black hover:bg-neutral-900 text-white font-semibold text-xs rounded-xl px-5 py-2.5 cursor-pointer transition-colors"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive AI Chatbot Popup Modal Overlay */}
      <AnimatePresence>
        {showFloatingChat && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFloatingChat(false)}
              className="absolute inset-0 bg-black cursor-pointer backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl z-10"
            >
              <AIChatConsole 
                initialPrompt={chatInitialPrompt} 
                onClose={() => setShowFloatingChat(false)} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </motion.div>

      {/* Floating Back to Top Button in Lower Left */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-50 p-3 bg-white text-black border border-gray-150 rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:border-black transition-all cursor-pointer flex items-center justify-center group"
            title="Back to Top"
            id="back-to-top-button"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
