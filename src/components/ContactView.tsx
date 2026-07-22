import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Clock, 
  ChevronDown, 
  MessageSquare, 
  ArrowRight, 
  BookOpen, 
  Laptop, 
  LifeBuoy, 
  Handshake, 
  Sparkles 
} from "lucide-react";

interface ContactViewProps {
  onExploreCourses: () => void;
}

type InquiryType = "licensing" | "professional" | "support" | "partnership" | "";

export default function ContactView({ onExploreCourses }: ContactViewProps) {
  const [inquiryType, setInquiryType] = useState<InquiryType>("");

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Ref to form for smooth scrolling when option card is clicked
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scriptId = "ghl-form-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleInquirySelect = (type: InquiryType) => {
    setInquiryType(type);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const inquiryOptions = [
    {
      id: "licensing" as InquiryType,
      title: "Licensing Education",
      desc: "Questions about Florida Pre-License, Continuing Education, or Post-License programs.",
      icon: BookOpen,
      color: "border-blue-100 hover:border-blue-500 bg-blue-50/10",
      accent: "text-blue-600 bg-blue-50",
    },
    {
      id: "professional" as InquiryType,
      title: "Professional Development",
      desc: "Questions about AI, Marketing, Business Planning, or future educational programs.",
      icon: Laptop,
      color: "border-purple-100 hover:border-purple-500 bg-purple-50/10",
      accent: "text-purple-600 bg-purple-50",
    },
    {
      id: "support" as InquiryType,
      title: "Student Support",
      desc: "Need help accessing your account, course, or learning platform? Our support team is here.",
      icon: LifeBuoy,
      color: "border-amber-100 hover:border-amber-500 bg-amber-50/10",
      accent: "text-amber-600 bg-amber-50",
    },
    {
      id: "partnership" as InquiryType,
      title: "Business Partnerships",
      desc: "Interested in bringing Upgraded to your brokerage or organization? Let's start the conversation.",
      icon: Handshake,
      color: "border-emerald-100 hover:border-emerald-500 bg-emerald-50/10",
      accent: "text-emerald-600 bg-emerald-50",
    },
  ];

  const faqs = [
    {
      q: "What is the fastest way to reach your team?",
      a: "The best way to contact us is by email. We respond to inquiries as quickly as possible during normal business hours.",
    },
    {
      q: "I need help choosing the right course.",
      a: "We're happy to help. Tell us where you are in your real estate journey, and we'll help you identify the program that best fits your needs.",
    },
    {
      q: "I need technical support.",
      a: "If you're experiencing issues accessing your course or student account, please include as much detail as possible in your message so we can assist you more efficiently.",
    },
    {
      q: "Are you available by phone?",
      a: "Support is primarily provided by email to ensure every inquiry is handled accurately and efficiently. If a phone conversation is needed, a member of our team will gladly coordinate it with you.",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-28 px-6 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Support Hub
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-black font-display leading-[1.05]">
            Let's <span className="italic font-extrabold animate-gradient-text">Connect.</span>
          </h1>

          <p className="text-gray-900 font-sans text-lg sm:text-xl font-bold leading-relaxed max-w-2xl mx-auto">
            We're here to help you take your next step.
          </p>

          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Whether you're looking for the right course, have questions about licensing education, need assistance with your enrollment, or simply want to learn more about Upgraded, our team is here to help. We look forward to hearing from you.
          </p>
        </motion.div>
      </section>

      {/* 2. HOW CAN WE HELP OPTIONS */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
              Department Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-black font-display tracking-tight">
              How Can We Help?
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Choose the option that best describes your inquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inquiryOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = inquiryType === option.id;
              return (
                <motion.div
                  key={option.id}
                  whileHover={{ y: -4 }}
                  onClick={() => handleInquirySelect(option.id)}
                  className={`border p-6 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? "border-black bg-black text-white shadow-lg" 
                      : `border-gray-150 bg-white text-black hover:shadow-md ${option.color}`
                  }`}
                >
                  <div className="space-y-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                      isSelected 
                        ? "bg-neutral-900 border-neutral-800 text-white" 
                        : "bg-gray-50 border-gray-150 text-black"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className={`text-sm font-bold font-display ${isSelected ? "text-white" : "text-black"}`}>
                        {option.title}
                      </h3>
                      <p className={`text-[11px] leading-relaxed ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                        {option.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-5 flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider mt-auto">
                    <span className={isSelected ? "text-emerald-400" : "text-gray-400 group-hover:text-black"}>
                      {isSelected ? "Selected" : "Select Option"}
                    </span>
                    <ArrowRight className={`w-3 h-3 ${isSelected ? "text-emerald-400 translate-x-1" : "text-gray-400"}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FORM & CONTACT DETAILS SPLIT */}
      <section ref={formRef} className="bg-white border-y border-gray-150 py-20 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] text-left">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <MessageSquare className="w-3 h-3" />
                  Direct Messaging
                </div>
                <h3 className="text-xl font-bold text-black font-display tracking-tight">
                  Send Us a Message
                </h3>
                <p className="text-xs text-gray-500">
                  Have a question? Complete the form below and a member of our team will get back to you as soon as possible.
                </p>
              </div>

              {/* Inquiry Category Alert if pre-selected */}
              {inquiryType && (
                <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 text-xs flex items-center justify-between">
                  <span className="text-gray-500">
                    Inquiry Department: <strong>{inquiryOptions.find(o => o.id === inquiryType)?.title}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setInquiryType("")}
                    className="text-[10px] text-gray-400 hover:text-black font-mono"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* GoHighLevel Contact Form Iframe Embed */}
              <div className="w-full min-h-[586px] overflow-hidden rounded-xl border border-gray-100 bg-white">
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/xoeHLtP5kT76IgxxgEf3"
                  style={{ width: "100%", height: "100%", minHeight: "586px", border: "none", borderRadius: "12px" }}
                  id="inline-xoeHLtP5kT76IgxxgEf3"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Contact Us"
                  data-height="586"
                  data-layout-iframe-id="inline-xoeHLtP5kT76IgxxgEf3"
                  data-form-id="xoeHLtP5kT76IgxxgEf3"
                  title="Contact Us"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact info & Hours */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Contact info card */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 space-y-6">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-bold">
                Contact Information
              </h4>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-150 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-black" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">
                      Email
                    </p>
                    <a 
                      href="mailto:adriana@upgradedreacademy.com" 
                      className="text-xs sm:text-sm font-semibold text-black hover:underline"
                    >
                      adriana@upgradedreacademy.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-gray-100 pt-5">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-150 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-black" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">
                      Business Hours
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-black leading-snug">
                      Monday – Friday <br />
                      <span className="text-gray-500 font-medium">9:00 AM – 5:00 PM (Eastern Time)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick tips card */}
            <div className="bg-neutral-50 border border-gray-150 rounded-2xl p-6 space-y-4">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold">
                Response Times
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our support desk reviews messages sequentially. We prioritize active students experiencing technical platform or exam issues. You can expect a response within a few hours on business days.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. EVERYTHING YOU NEED TO KNOW (FAQs) */}
      <section className="py-24 px-6 max-w-4xl mx-auto w-full text-left">
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-semibold text-black font-display tracking-tight">
              Everything You Need To Know
            </h2>
          </div>

          <div className="space-y-3 border-t border-gray-150 pt-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="border-b border-gray-150 pb-4 pt-2"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between py-2 text-left font-semibold text-sm text-black hover:text-emerald-600 transition-colors cursor-pointer font-display"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-gray-500 leading-relaxed pt-2 pb-1 pr-6 font-sans">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. READY TO START LEARNING BOTTOM CTA */}
      <section className="bg-black text-white py-24 px-6 border-t border-neutral-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              Enrollment Is Open
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight font-display leading-[1.1]">
              Ready to Start Learning?
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Your next opportunity could begin with a single course. Explore modern education designed to help you stay licensed, stay relevant, and stay ahead.
            </p>
          </div>

          <div>
            <button
              onClick={onExploreCourses}
              className="bg-white hover:bg-neutral-100 text-black px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2 mx-auto"
            >
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-10 border-t border-neutral-900 max-w-md mx-auto grid grid-cols-2 gap-4">
            <div className="space-y-1 text-center">
              <p className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-widest">
                Our Philosophy
              </p>
              <p className="text-xs font-bold text-neutral-300 font-display">
                Where Modern Agents Upgrade Themselves.
              </p>
            </div>
            <div className="space-y-1 text-center border-l border-neutral-900">
              <p className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-widest">
                Our Promise
              </p>
              <p className="text-xs font-bold text-neutral-300 font-display">
                Education That Evolves With You.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
