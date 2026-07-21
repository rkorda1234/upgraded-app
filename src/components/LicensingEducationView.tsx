import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  ArrowRight, 
  ChevronDown, 
  HelpCircle, 
  Clock, 
  Globe, 
  AlertCircle, 
  Sparkles,
  ArrowUpRight,
  BookmarkCheck,
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
    id: "lic-faq-1",
    question: "Why choose Upgraded?",
    answer: "Because today's professionals need more than information. Our educational approach focuses on practical, relevant learning that evolves alongside the real estate industry, helping professionals develop the knowledge and skills that matter most."
  },
  {
    id: "lic-faq-2",
    question: "Are your courses self-paced?",
    answer: "Yes. Our online programs are designed to provide the flexibility to learn whenever and wherever it works best for you."
  },
  {
    id: "lic-faq-3",
    question: "Can I take my course on my phone or tablet?",
    answer: "Yes. Our learning platform is fully responsive, allowing you to access your courses from your desktop, tablet, or mobile device."
  },
  {
    id: "lic-faq-4",
    question: "How long will I have access to my course?",
    answer: "Students receive 12 months of access from the date of enrollment, giving you the flexibility to complete your course on your own schedule."
  },
  {
    id: "lic-faq-5",
    question: "How are course completions reported?",
    answer: "For applicable Florida licensing education programs, course completions are electronically reported following successful course completion in accordance with applicable Florida requirements."
  },
  {
    id: "lic-faq-6",
    question: "What happens if I don't pass the final assessment?",
    answer: "Don't worry. If you don't successfully pass the final assessment, our team will guide you through the next steps and explain the retake process in accordance with the policies for your course."
  },
  {
    id: "lic-faq-7",
    question: "Do you offer courses in English and Spanish?",
    answer: "Yes. Many of our programs are available in both English and Spanish. Please refer to each course page for language availability."
  },
  {
    id: "lic-faq-8",
    question: "Still have questions?",
    answer: "We're here to help. If you're unsure which course is right for you or need assistance before enrolling, our team is happy to guide you."
  }
];

interface LicensingEducationViewProps {
  onOpenChat: (prompt?: string) => void;
}

export default function LicensingEducationView({ onOpenChat }: LicensingEducationViewProps) {
  const [openFAQId, setOpenFAQId] = useState<string | null>(null);
  const programsRef = useRef<HTMLDivElement | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQId((prev) => (prev === id ? null : id));
  };

  const scrollToPrograms = () => {
    programsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-28 px-6 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm text-xs font-semibold text-gray-400">
              <span className="font-mono tracking-widest text-[9px] uppercase">State Accredited Curriculum</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-black font-display leading-[1.05]">
              Florida Licensing <br />
              <span className="text-gray-400 italic font-light">Education</span>
            </h1>
            
            <p className="text-gray-500 font-sans text-base sm:text-lg leading-relaxed font-medium">
              Modern education for every stage of your Florida real estate career.
            </p>
            
            <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed">
              Whether you're preparing to enter the real estate profession, completing your first license renewal, or maintaining an active Florida real estate license, Upgraded delivers engaging, practical educational experiences designed to support your professional development.
            </p>
            
            <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed">
              Our goal is to provide high-quality education that combines Florida licensing requirements with a modern learning experience.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={scrollToPrograms}
                className="bg-black hover:bg-neutral-900 text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
              >
                Explore Courses
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
                  src={licensingHeroImg}
                  alt="Modern Florida Licensing Student Collaboration Hub"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 text-left bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <span className="text-[9px] font-mono tracking-widest text-gray-300 uppercase font-bold block mb-1">
                    Florida State DBPR Approved
                  </span>
                  <p className="text-white text-xs font-semibold leading-relaxed">
                    Cloud-native, interactive syllabus compliant with all Florida regulatory standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Our Licensing Programs Section */}
      <section ref={programsRef} className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Title block */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-gray-50 border border-gray-200 px-3.5 py-1 rounded-full shadow-sm">
              State approved paths
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight leading-tight font-display">
              Our Licensing Programs
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Education designed to support every stage of your Florida real estate career.
            </p>
          </div>

          {/* Core Highlights Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { label: "63 Hours", action: "Launch Your Career." },
              { label: "45 Hours", action: "Protect Your First License." },
              { label: "14 Hours", action: "Renew With Confidence." }
            ].map((highlight, idx) => (
              <div 
                key={idx}
                className="bg-[#FAFAFA] border border-gray-150 rounded-2xl p-6 flex items-center justify-between hover:border-black transition-colors duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-mono font-bold text-xs">
                    {idx + 1}
                  </div>
                  <span className="font-sans font-bold text-sm tracking-tight text-black">
                    {highlight.label} <span className="text-gray-400 font-normal">→</span> {highlight.action}
                  </span>
                </div>
                <BookmarkCheck className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors shrink-0" />
              </div>
            ))}
          </div>

          {/* Course Details Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
            
            {/* Card 1: 63-Hour Pre-License */}
            <div className="bg-white border border-gray-150 rounded-2xl p-8 flex flex-col justify-between hover:border-black transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] group">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-black">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded font-bold uppercase tracking-wider">
                      Coming Soon
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono font-medium">
                      Pending state approval.
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-black tracking-tight font-display group-hover:text-neutral-800 transition-colors">
                    63-Hour Florida Sales Associate Pre-License Course
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Start your real estate journey with a comprehensive Pre-License program designed to introduce the knowledge, principles, and professional practices required of Florida Sales Associates.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <button
                  onClick={() => alert("Registration for our 63-Hour Pre-License course will open soon following state approval. Leave your email in our system to be notified immediately.")}
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-black group-hover:underline cursor-pointer"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 2: 45-Hour Post-License */}
            <div className="bg-white border border-gray-150 rounded-2xl p-8 flex flex-col justify-between hover:border-black transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] group">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-black">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" />
                      EN & ES
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-black tracking-tight font-display group-hover:text-neutral-800 transition-colors">
                    45-Hour Florida Post-License Course
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Complete your first license renewal requirement through a comprehensive Post-License program designed to reinforce professional knowledge while supporting your continued development as a real estate professional.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <button
                  onClick={() => alert("Standard real estate enrollment workflow. Our 45-Hour course is fully active! Leave a prompt with our AI advisor or register inside your student portal.")}
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-black group-hover:underline cursor-pointer"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 3: 14-Hour Continuing Ed */}
            <div className="bg-white border border-gray-150 rounded-2xl p-8 flex flex-col justify-between hover:border-black transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] group">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-black">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" />
                      EN & ES
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-black tracking-tight font-display group-hover:text-neutral-800 transition-colors">
                    14-Hour Florida Continuing Education
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Complete your Florida Continuing Education requirements through an engaging online learning experience designed for licensed real estate professionals.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <button
                  onClick={() => alert("Our 14-Hour Continuing Education course provides seamless automated state sync. Inquire with our Advisor or sign in to begin immediately.")}
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-black group-hover:underline cursor-pointer"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. A Different Approach Section */}
      <section className="py-24 px-6 bg-[#FAFAFA] border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Support image */}
          <div className="lg:col-span-5 order-last lg:order-first">
            <div className="bg-white border border-gray-150 p-3 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-transform duration-500">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={agentsCollaboratingImg}
                  alt="Upgraded Students Collaborating in Modern Environment"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Right: Pitch copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
              Our Vision
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black tracking-tight leading-tight font-display">
              A Different Approach to Licensing Education
            </h2>
            
            <p className="text-gray-800 text-sm sm:text-base font-bold font-sans">
              Required education doesn't have to feel outdated.
            </p>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-sans">
              At Upgraded, we believe licensing education should be engaging, relevant, and designed for today's professionals.
            </p>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-sans">
              Our goal is to create learning experiences that not only help professionals satisfy licensing requirements, but also continue developing the knowledge, professional judgment, and industry awareness needed throughout every stage of their careers.
            </p>

            <div className="pt-2">
              <div className="p-5 bg-white border border-gray-150 rounded-2xl flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  Every licensing hour with Upgraded integrates essential real estate compliance with advanced technology updates and high-conversion client communication templates.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Everything You Need to Know FAQ Accordion Section */}
      <section className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header block */}
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-gray-50 px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
              Everything You Need to Know
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight font-display">
              Licensing Questions
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Detailed answers about our self-paced course syllabus, devices compatibility, and official Florida DBPR hours sync.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="border-t border-gray-150">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFAQId === item.id;
              return (
                <div 
                  key={item.id}
                  className="border-b border-gray-150 py-3"
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full py-4 flex items-center justify-between gap-4 text-left font-sans font-medium text-sm sm:text-base text-gray-900 hover:text-black focus:outline-none transition-colors group cursor-pointer"
                  >
                    <span className="tracking-tight flex items-center gap-3">
                      <span className="text-[10px] font-mono text-gray-400 font-bold tracking-wider">
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </span>
                      {item.question}
                    </span>
                    
                    <div className="shrink-0 p-1.5 rounded-full bg-gray-50 border border-gray-200 group-hover:bg-gray-100 group-hover:border-gray-300 transition-all duration-300">
                      <ChevronDown 
                        className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-black" : ""
                        }`} 
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pl-7 pr-4 text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Already Have Access? Section */}
      <section className="py-20 px-6 bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-3xl mx-auto bg-white border border-gray-150 rounded-3xl p-8 sm:p-10 space-y-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.01)]">
          <div className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-black bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
            Brokerage Partnership Access
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight font-display">
            ALREADY HAVE ACCESS?
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Certain brokerages may provide access to selected Upgraded educational programs as part of their professional development benefits.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            If you're an active Avanti Way agent, please verify your available course access before purchasing a course. If you have questions regarding your eligibility or access, please contact your office or our support team.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenChat("I'm an active Avanti Way agent, how do I sync my licensing course credentials?")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline cursor-pointer group"
            >
              Verify My Brokerage Access
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Ready to Get Started Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-gradient-to-br from-blue-50/40 to-transparent rounded-full opacity-60 blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-gray-50 px-3.5 py-1 rounded-full border border-gray-200">
              Your Professional Upgrade
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-black tracking-tight leading-tight font-display">
              READY TO GET STARTED?
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Whether you're beginning your real estate career, maintaining your active license, or completing your first renewal requirement, Upgraded is here to support your next step.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToPrograms}
              className="w-full sm:w-auto bg-black hover:bg-neutral-900 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              Explore Courses
            </button>
          </div>

          <div className="pt-10 border-t border-gray-100 max-w-xl mx-auto space-y-2">
            <p className="text-base sm:text-lg font-bold text-black font-display tracking-tight">
              Education That Evolves With You.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Helping real estate professionals stay ahead in a changing industry.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
