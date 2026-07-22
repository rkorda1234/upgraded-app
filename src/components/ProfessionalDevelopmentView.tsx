import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ChevronDown, 
  HelpCircle, 
  Clock, 
  Globe, 
  Sparkles,
  ArrowUpRight,
  CheckCircle,
  FileCheck
} from "lucide-react";

// Image references
import licensingHeroImg from "../assets/images/licensing_hero_1784649720836.jpg";
import agentsCollaboratingImg from "../assets/images/agents_collaborating_1784649734023.jpg";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "pro-faq-0",
    question: "Who are these programs designed for?",
    answer: "Our Professional Development programs are designed for real estate professionals who want to continue developing their knowledge, skills, leadership, marketing, technology, and business strategies beyond licensing education."
  },
  {
    id: "pro-faq-1",
    question: "Do I need to complete these programs in a specific order?",
    answer: "No. Choose the learning path that best aligns with your current goals, interests, and stage of your professional journey."
  },
  {
    id: "pro-faq-2",
    question: "Are these programs self-paced?",
    answer: "Yes. Study whenever and wherever it works best for you. Our online learning experience is designed to fit the schedule of today's professionals."
  },
  {
    id: "pro-faq-3",
    question: "Can I access the programs on my phone or tablet?",
    answer: "Absolutely. Our learning platform is fully responsive, allowing you to learn seamlessly from your desktop, tablet, or mobile device."
  },
  {
    id: "pro-faq-4",
    question: "How long will I have access?",
    answer: "Professional Development programs include lifetime access, allowing you to revisit lessons, resources, and future updates whenever you need them."
  },
  {
    id: "pro-faq-5",
    question: "Will these programs continue to evolve?",
    answer: "Yes. The real estate industry never stands still—and neither do we. Our Professional Development programs are continuously reviewed and enhanced to reflect emerging technologies, evolving strategies, and the changing needs of today's real estate professionals."
  },
  {
    id: "pro-faq-6",
    question: "Are programs available in English and Spanish?",
    answer: "Many of our Professional Development programs are available in both English and Spanish. Please refer to each program page for language availability."
  },
  {
    id: "pro-faq-7",
    question: "Still have questions?",
    answer: "We're here to help. If you're unsure which program is the right fit for your professional goals, our team is happy to guide you."
  }
];

interface ProfessionalDevelopmentViewProps {
  onOpenChat: (prompt?: string) => void;
  onExploreCourses?: (courseId?: string, category?: string) => void;
}

export default function ProfessionalDevelopmentView({ onOpenChat, onExploreCourses }: ProfessionalDevelopmentViewProps) {
  const [openFAQId, setOpenFAQId] = useState<string | null>(null);
  const programsRef = useRef<HTMLDivElement | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQId((prev) => (prev === id ? null : id));
  };

  const scrollToPrograms = () => {
    if (onExploreCourses) {
      onExploreCourses(undefined, "Professional Development");
    } else {
      programsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-28 px-6 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* Hero text */}
          <div className="lg:col-span-6 space-y-7 text-left">
            <div className="inline-block mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/80 rounded-full shadow-sm text-xs font-semibold text-blue-600">
                <span className="font-mono tracking-widest text-[9px] uppercase">Evolving Industry Curriculum</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-black font-display leading-[1.05]">
              Never Stop <br />
              <span className="text-gray-400 italic font-light">Upgrading.</span>
            </h1>
            
            <p className="text-gray-500 font-sans text-base sm:text-lg leading-relaxed font-medium">
              Professional Development for Modern Real Estate Professionals.
            </p>
            
            <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed">
              The real estate industry never stops evolving. Artificial intelligence, technology, marketing, consumer expectations, and business strategies continue to reshape the profession every day.
            </p>
            
            <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed">
              Staying licensed is only the beginning. <span className="text-blue-600 font-semibold">Staying relevant</span> is what defines long-term success.
            </p>

            <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed">
              At Upgraded, we create modern professional development programs designed to help real estate professionals continue learning, adapting, and staying ahead throughout every stage of their careers.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={scrollToPrograms}
                className="bg-black hover:bg-neutral-900 text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
              >
                Explore Programs
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Image Frame */}
          <div className="lg:col-span-6">
            <div className="relative bg-white border border-gray-150 p-3 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                <img
                  src={agentsCollaboratingImg}
                  alt="Modern Real Estate Professional Development Hub"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 text-left bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <span className="text-[9px] font-mono tracking-widest text-gray-300 uppercase font-bold block mb-1">
                    Continuous Growth
                  </span>
                  <p className="text-white text-xs font-semibold leading-relaxed">
                    Designed for high-performance agents focused on technology, AI, and scale.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* 2. Education That Evolves With You Section */}
      <section className="py-24 px-6 bg-gray-50/50 border-b border-gray-100 relative">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="inline-block">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full shadow-sm">
              Instructional Standard
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-semibold text-black tracking-tight leading-tight font-display">
            Education That Evolves With You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-6 items-center">
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-black font-display tracking-tight leading-snug">
                Information is everywhere. <br />
                <span className="text-blue-600 font-semibold">Knowing what truly matters</span> is the advantage.
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                The best professionals don't succeed because they consume more content. They succeed because they focus on learning the right things at the right time.
              </p>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-semibold text-gray-800">
                Because education should evolve just as quickly as the industry itself.
              </p>
            </div>

            <div className="bg-white border border-gray-150 rounded-2xl p-8 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:border-blue-500/30 transition-all duration-300">
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-sans">
                At Upgraded, every program is intentionally designed to <span className="text-blue-600 font-semibold">reduce the noise</span>, <span className="text-blue-600 font-semibold">simplify learning</span>, and help professionals develop practical knowledge they can immediately apply to their business.
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">Designed for Today's Agent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Choose Your Next Upgrade Section */}
      <section ref={programsRef} className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-block mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full shadow-sm">
                Choose Your Next Upgrade
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight leading-tight font-display">
              Choose Your Next Upgrade
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Professional development designed for <span className="text-blue-600 font-semibold">today's real estate professionals</span>.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* AI for Real Estate */}
            <motion.div 
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => {
                if (onExploreCourses) onExploreCourses("ai-real-estate", "Professional Development");
              }}
              className="group bg-white border border-gray-150 rounded-3xl p-8 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.05)] hover:border-blue-200 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" />
                      EN & ES
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="text-lg font-bold text-black tracking-tight font-display group-hover:text-blue-600 transition-colors duration-200">
                    AI for Real Estate Professionals
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Artificial intelligence is transforming the real estate industry. Learn practical ways to leverage AI to improve productivity, enhance client communication, streamline marketing, create content, automate workflows, and work more efficiently.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onExploreCourses) onExploreCourses("ai-real-estate", "Professional Development");
                  }}
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-black group-hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  View Program Details
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Marketing & Business Growth */}
            <motion.div 
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => {
                if (onExploreCourses) onExploreCourses("marketing-growth-mastery", "Professional Development");
              }}
              className="group bg-white border border-gray-150 rounded-3xl p-8 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.05)] hover:border-blue-200 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" />
                      EN & ES
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="text-lg font-bold text-black tracking-tight font-display group-hover:text-blue-600 transition-colors duration-200">
                    Marketing & Business Growth
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Marketing continues to evolve. Develop modern marketing strategies, lead generation systems, personal branding techniques, and business growth frameworks designed to help you remain competitive in today's marketplace.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onExploreCourses) onExploreCourses("marketing-growth-mastery", "Professional Development");
                  }}
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-black group-hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  View Program Details
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Business Planning */}
            <motion.div 
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => {
                if (onExploreCourses) onExploreCourses("business-planning-masterclass", "Professional Development");
              }}
              className="group bg-white border border-gray-150 rounded-3xl p-8 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.05)] hover:border-blue-200 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" />
                      EN & ES
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="text-lg font-bold text-black tracking-tight font-display group-hover:text-blue-600 transition-colors duration-200">
                    Business Planning for Real Estate Professionals
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Successful businesses don't happen by accident. Learn how to build a personalized business plan, establish meaningful goals, measure progress, and create systems that support sustainable long-term growth.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onExploreCourses) onExploreCourses("business-planning-masterclass", "Professional Development");
                  }}
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-black group-hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  View Program Details
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Our Philosophy Section */}
      <section className="py-24 px-6 bg-gray-50/50 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image visual on left */}
          <div className="lg:col-span-5 order-last lg:order-first">
            <div className="relative bg-white border border-gray-150 p-3 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <img
                  src={licensingHeroImg}
                  alt="Upgraded Real Estate Philosophy Concept"
                  className="w-full h-full object-cover grayscale brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
                  <span className="text-white font-mono tracking-widest text-[9px] uppercase font-bold bg-blue-600/95 border border-blue-400 px-2 py-1 rounded">
                    Our Core Principle
                  </span>
                  <p className="text-white text-base font-bold font-display mt-2">
                    Less Noise. More Clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy text on right */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-block mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full shadow-sm">
                Our Philosophy
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight leading-tight font-display">
              Our Philosophy
            </h2>
            
            <p className="text-gray-800 text-sm sm:text-base font-bold font-sans">
              Professional development isn't measured by the number of courses you complete. It's measured by your ability to adapt.
            </p>

            <div className="space-y-3 pl-4 border-l-2 border-blue-200 py-1">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-semibold">
                To think differently.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-semibold">
                To apply what you learn.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-semibold">
                To remain relevant.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <p className="text-gray-800 text-sm sm:text-base font-bold font-sans flex items-center gap-2">
                Every Upgraded program is built around one simple principle:
                <span className="text-blue-600 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-xs uppercase font-mono font-black">Less Noise. More Clarity.</span>
              </p>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-sans">
                We don't create more content simply for the sake of creating content. We create practical learning experiences that evolve alongside the industry, helping professionals focus on the knowledge, skills, and strategies that create the greatest value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header block */}
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <div className="inline-block mb-6">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 shadow-sm">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                Everything You Need to Know
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight leading-tight font-display">
              Everything You Need to Know
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Answers regarding program alignment, language pathways, and self-paced capabilities.
            </p>
          </div>

          {/* Accordion container */}
          <div className="space-y-4 text-left">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFAQId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="border border-gray-150 rounded-2xl overflow-hidden transition-colors bg-white hover:border-blue-200"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left font-semibold text-sm sm:text-base text-black transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transform transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-0 border-t border-gray-50 text-xs sm:text-sm leading-relaxed text-gray-500 whitespace-pre-line font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="pt-4 text-center">
            <p className="text-xs text-gray-400">
              Still have questions? Our Career Advisor is always active to guide your choice.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Bottom Banner Section */}
      <section className="relative py-28 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50 rounded-full opacity-40 blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <div className="inline-block mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 shadow-sm">
                Your Professional Upgrade
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold text-black tracking-tight leading-tight font-display">
              READY FOR YOUR NEXT UPGRADE?
            </h2>
            <div className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto space-y-3">
              <p>
                Your license starts your career. <span className="text-blue-600 font-semibold">Continuous learning</span> moves it forward.
              </p>
              <p>
                Invest in practical education designed to help you stay relevant, adapt with confidence, and continue growing in an industry that never stops evolving.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col items-center gap-4">
            <button
              onClick={scrollToPrograms}
              className="bg-black hover:bg-neutral-900 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Explore Professional Development
            </button>
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest pt-2">
              <span>Where Modern Agents Upgrade Themselves.</span>
              <span className="text-blue-300">•</span>
              <span>Education That Evolves With You.</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
