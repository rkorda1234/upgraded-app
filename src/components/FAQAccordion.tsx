import React, { useState } from "react";
import { ChevronDown, HelpCircle, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Are Upgraded's licensing courses officially DBPR approved?",
    answer: (
      <span>
        Yes, absolutely. All of our Florida real estate pre-licensing, post-licensing, and continuing education (CE) courses are fully accredited and compliant with the <strong>Florida Department of Business and Professional Regulation (DBPR)</strong>. Upon course completion, we report your hours directly to the state within 24 hours.
      </span>
    ),
  },
  {
    id: "faq-2",
    question: "How do the AI and Advanced Marketing modules work?",
    answer: (
      <span>
        Traditional real estate schools only teach you to pass a test. Upgraded bridges theory with elite practice. While fulfilling your required academic hours, you concurrently unlock specialized, highly practical modules that teach you how to write copy with custom AI agents, run automated social campaigns, and double listing conversions.
      </span>
    ),
  },
  {
    id: "faq-3",
    question: "Is there an offline or classroom option?",
    answer: (
      <span>
        Upgraded is designed from the ground up as a cloud-native, digital platform. Our interactive, bite-sized curriculum is 100% online, self-paced, and fully responsive across all desktop, tablet, and mobile devices. This allows high-performing agents to learn seamlessly during active listing hours or on the go.
      </span>
    ),
  },
  {
    id: "faq-4",
    question: "How long do I have access to my Upgraded materials?",
    answer: (
      <span>
        You have continuous, unlimited access to your specific course syllabus, custom resources, and progress dashboard for up to one full year. Additionally, the integrated <strong>AI Career Advisor</strong> remains available in your console even after course completion to assist with real-world scenarios.
      </span>
    ),
  },
  {
    id: "faq-5",
    question: "How is my course completion reported to the DBPR?",
    answer: (
      <span>
        Everything is completely automated. As soon as you pass your end-of-course exam or complete your continuing education hours, our platform files your transcript with the DBPR. You will receive an immediate confirmation email with your certificate of completion for your personal files.
      </span>
    ),
  },
];

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-white py-24 px-6 border-t border-gray-150 relative">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Text */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
            Curriculum & Platform Help
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm">
            Answers to key questions about Florida DBPR certifications, real estate licensing tracks, and our advanced AI-driven professional development.
          </p>
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="border-t border-gray-150">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id}
                className="border-b border-gray-150 py-3"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-4 flex items-center justify-between gap-4 text-left font-sans font-medium text-sm sm:text-base text-gray-900 hover:text-black focus:outline-none transition-colors group cursor-pointer"
                >
                  <span className="tracking-tight flex items-center gap-3">
                    <span className="text-[10px] font-mono text-gray-400 font-bold tracking-wider">
                      0{index + 1}
                    </span>
                    {item.question}
                  </span>
                  
                  {/* Icon rotation */}
                  <div className="shrink-0 p-1.5 rounded-full bg-gray-50 border border-gray-200 group-hover:bg-gray-100 group-hover:border-gray-300 transition-all duration-300">
                    <ChevronDown 
                      className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-black" : ""
                      }`} 
                    />
                  </div>
                </button>

                {/* Smooth motion slide down */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pl-7 pr-4 text-xs sm:text-sm text-gray-500 leading-relaxed space-y-3 font-sans">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Call to Action Footer */}
        <div className="pt-6 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-gray-50 border border-gray-150 rounded-2xl p-4 sm:p-5 max-w-lg mx-auto">
            <span className="text-xs text-gray-500 font-medium">
              Have a custom licensing situation or technical query?
            </span>
            <button
              onClick={() => {
                const chatInput = document.querySelector('input[placeholder*="Ask your Real Estate Career Advisor"]') as HTMLInputElement;
                if (chatInput) {
                  chatInput.focus();
                  chatInput.value = "Hey! I have a question about Florida DBPR licensing requirements...";
                } else {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline cursor-pointer group"
            >
              Ask our AI Advisor
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
