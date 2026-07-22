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
    id: "lic-faq-0",
    question: "Which course is right for me?",
    answer: "Whether you're earning your Florida real estate license, completing your first license renewal, maintaining your active license, or investing in your professional development, Upgraded offers learning paths designed for every stage of your career. Each course page explains who the program is intended for and any applicable eligibility requirements."
  },
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
  onExploreCourses?: (courseId?: string, category?: string) => void;
}

export default function LicensingEducationView({ onOpenChat, onExploreCourses }: LicensingEducationViewProps) {
  const [openFAQId, setOpenFAQId] = useState<string | null>(null);
  const programsRef = useRef<HTMLDivElement | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQId((prev) => (prev === id ? null : id));
  };

  const scrollToPrograms = () => {
    if (onExploreCourses) {
      onExploreCourses(undefined, "Licensing Education");
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full shadow-sm text-xs font-semibold text-emerald-600">
                <span className="font-mono tracking-widest text-[9px] uppercase">State Accredited Curriculum</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-black font-display leading-[1.05]">
              Florida Licensing <br />
              <span className="text-gray-400 italic font-light">Education</span>
            </h1>
            
            <p className="text-gray-500 font-sans text-base sm:text-lg leading-relaxed font-medium">
              Modern education for every stage of your Florida real estate career.
            </p>
            
            <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed">
              Whether you're preparing to enter the <span className="text-emerald-600 font-semibold">real estate profession</span>, completing your <span className="text-emerald-600 font-semibold">first license renewal</span>, or maintaining an <span className="text-emerald-600 font-semibold">active Florida real estate license</span>, Upgraded delivers engaging, practical educational experiences designed to support your professional development.
            </p>
            
            <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed">
              Our goal is to provide <span className="text-emerald-600 font-semibold">high-quality education</span> that combines Florida licensing requirements with a modern learning experience.
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

        </motion.div>
      </section>

      {/* 2. Our Licensing Programs Section */}
      <section ref={programsRef} className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Title block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-block mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full shadow-sm">
                State approved paths
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight leading-tight font-display">
              Our Licensing Programs
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Education designed to support <span className="text-emerald-600 font-semibold">every stage</span> of your Florida real estate career.
            </p>
          </motion.div>

          {/* Core Highlights Row */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
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
          </motion.div>

          {/* Course Details Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
            
            {/* Card 1: 63-Hour Pre-License */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}
              className="bg-white border border-gray-150 rounded-2xl p-8 flex flex-col justify-between hover:border-black transition-all duration-200 group cursor-pointer"
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-gray-700 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-colors duration-200">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded font-bold uppercase tracking-wider">
                      Coming Soon
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono font-medium">
                      Pending state approval.
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-black tracking-tight font-display group-hover:text-emerald-600 transition-colors duration-200">
                    63-Hour Florida Sales Associate Pre-License Course
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Start your real estate journey with a comprehensive Pre-License program designed to introduce the <span className="text-emerald-600 font-semibold">knowledge</span>, <span className="text-emerald-600 font-semibold">principles</span>, and <span className="text-emerald-600 font-semibold">professional practices</span> required of Florida Sales Associates.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <button
                  onClick={() => {
                    if (onExploreCourses) onExploreCourses("fl-63hr-prelicensing", "Licensing Education");
                  }}
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-black group-hover:text-emerald-600 transition-colors duration-200 cursor-pointer"
                >
                  View Course Details
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Card 2: 45-Hour Post-License */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}
              onClick={() => {
                if (onExploreCourses) onExploreCourses("fl-45hr-postlicensing", "Licensing Education");
              }}
              className="bg-white border border-gray-150 rounded-2xl p-8 flex flex-col justify-between hover:border-black transition-all duration-200 group cursor-pointer"
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-gray-700 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-colors duration-200">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" />
                      EN & ES
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-black tracking-tight font-display group-hover:text-emerald-600 transition-colors duration-200">
                    45-Hour Florida Post-License Course
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Complete your <span className="text-emerald-600 font-semibold">first license renewal requirement</span> through a comprehensive Post-License program designed to reinforce professional knowledge while supporting your continued development.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onExploreCourses) onExploreCourses("fl-45hr-postlicensing", "Licensing Education");
                  }}
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-black group-hover:text-emerald-600 transition-colors duration-200 cursor-pointer"
                >
                  View Course Details
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Card 3: 14-Hour Continuing Ed */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}
              onClick={() => {
                if (onExploreCourses) onExploreCourses("fl-14hr-ce", "Continuing Education");
              }}
              className="bg-white border border-gray-150 rounded-2xl p-8 flex flex-col justify-between hover:border-black transition-all duration-200 group cursor-pointer"
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-gray-700 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-colors duration-200">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" />
                      EN & ES
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-black tracking-tight font-display group-hover:text-emerald-600 transition-colors duration-200">
                    14-Hour Florida Continuing Education
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Complete your Florida Continuing Education requirements through an <span className="text-emerald-600 font-semibold">engaging online learning experience</span> designed for active real estate professionals.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onExploreCourses) onExploreCourses("fl-14hr-ce", "Continuing Education");
                  }}
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-black group-hover:text-emerald-600 transition-colors duration-200 cursor-pointer"
                >
                  View Course Details
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. A Different Approach Section */}
      <section className="py-24 px-6 bg-[#FAFAFA] border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Support image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 order-last lg:order-first"
          >
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
          </motion.div>

          {/* Right: Pitch copy */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-block mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-sm">
                Our Vision
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black tracking-tight leading-tight font-display">
              A Different Approach to Licensing Education
            </h2>
            
            <p className="text-gray-800 text-sm sm:text-base font-bold font-sans">
              Required education doesn't have to feel <span className="text-emerald-600 font-semibold">outdated</span>.
            </p>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-sans">
              At Upgraded, we believe licensing education should be <span className="text-emerald-600 font-semibold">engaging</span>, <span className="text-emerald-600 font-semibold">relevant</span>, and <span className="text-emerald-600 font-semibold">designed for today's professionals</span>.
            </p>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-sans">
              Our goal is to create <span className="text-emerald-600 font-semibold">learning experiences</span> that not only help professionals satisfy licensing requirements, but also continue developing the <span className="text-emerald-600 font-semibold">knowledge, professional judgment, and industry awareness</span> needed throughout every stage of their careers.
            </p>

            <div className="pt-2">
              <div className="p-5 bg-white border border-gray-150 rounded-2xl flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  Every licensing hour with Upgraded integrates essential real estate compliance with advanced technology updates and high-conversion client communication templates.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. Everything You Need to Know FAQ Accordion Section */}
      <section className="py-24 px-6 bg-white border-b border-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          
          {/* Header block */}
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <div className="inline-block mb-6">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-sm">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                Everything You Need to Know
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight font-display">
              Licensing Questions
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Detailed answers about our <span className="text-emerald-600 font-semibold">self-paced course syllabus</span>, <span className="text-emerald-600 font-semibold">device compatibility</span>, and <span className="text-emerald-600 font-semibold">official Florida DBPR hours sync</span>.
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

        </motion.div>
      </section>

      {/* 5. Already Have Access? Section */}
      <section className="py-20 px-6 bg-[#FAFAFA] border-b border-gray-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white border border-gray-150 rounded-3xl p-8 sm:p-10 space-y-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.01)]"
        >
          <div className="inline-block mb-6">
            <div className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Brokerage Partnership Access
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight font-display">
            ALREADY HAVE ACCESS?
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Certain brokerages may provide access to selected Upgraded educational programs as part of their <span className="text-emerald-600 font-semibold">professional development benefits</span>.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            If you're an active <span className="text-black font-semibold underline decoration-emerald-400 decoration-2">Avanti Way</span> agent, please verify your available course access before purchasing a course. If you have questions regarding your eligibility or access, please contact your office or our support team.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenChat("I'm an active Avanti Way agent, how do I sync my licensing course credentials?")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:text-emerald-600 transition-colors cursor-pointer group"
            >
              Verify My Brokerage Access
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* 6. Ready to Get Started Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-gradient-to-br from-blue-50/40 to-transparent rounded-full opacity-60 blur-3xl pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-10 relative z-10"
        >
          <div className="space-y-4">
            <div className="inline-block mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 shadow-sm">
                Your Professional Upgrade
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold text-black tracking-tight leading-tight font-display">
              READY TO GET STARTED?
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Whether you're beginning your <span className="text-emerald-600 font-semibold">real estate career</span>, maintaining your <span className="text-emerald-600 font-semibold">active license</span>, or completing your <span className="text-emerald-600 font-semibold">first renewal requirement</span>, Upgraded is here to support your next step.
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
        </motion.div>
      </section>

    </div>
  );
}
