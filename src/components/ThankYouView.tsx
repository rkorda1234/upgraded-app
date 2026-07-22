import React, { useEffect } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  ExternalLink, 
  BookOpen, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  GraduationCap,
  Home
} from "lucide-react";

interface ThankYouViewProps {
  onBackToHome: () => void;
  onExploreCourses: () => void;
}

export default function ThankYouView({ onBackToHome, onExploreCourses }: ThankYouViewProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] pt-24 pb-28 text-left font-sans antialiased">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        
        {/* Top Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-150 rounded-3xl p-8 sm:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)] space-y-8 relative overflow-hidden text-center sm:text-left"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none" />

          {/* Success Icon Badge */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Payment & Enrollment Confirmed
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-black font-display tracking-tight leading-tight">
                Thank You For Your Order!
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Welcome to Upgraded Real Estate Academy. Your enrollment has been successfully processed and your student account is ready.
              </p>
            </div>
          </div>

          {/* PRIMARY STUDENT LOGIN PORTAL CTA BOX */}
          <div className="bg-black text-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl relative z-10 border border-neutral-800">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                Immediate Access
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display">
                Access Your HighLevel Student Portal
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Click below to log in to your learning dashboard and begin your course modules right away.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://learn.upgradedreacademy.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 px-8 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Go To Student Portal Login</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <span className="text-xs font-mono text-gray-400">
                learn.upgradedreacademy.com/login
              </span>
            </div>
          </div>

          {/* NEXT STEPS LIST */}
          <div className="space-y-6 pt-4 border-t border-gray-100 relative z-10">
            <h3 className="text-lg font-bold text-black font-display tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              What Happens Next?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-black text-white text-xs font-mono font-bold flex items-center justify-center">
                  1
                </div>
                <h4 className="text-xs font-bold text-black font-display">Check Your Email</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  An automated email from Upgraded Real Estate Academy has been sent to your inbox with your login credentials and receipt details.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-black text-white text-xs font-mono font-bold flex items-center justify-center">
                  2
                </div>
                <h4 className="text-xs font-bold text-black font-display">Log In & Learn</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Log in at <strong className="text-black">learn.upgradedreacademy.com/login</strong> on any desktop, tablet, or mobile device to start learning.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-black text-white text-xs font-mono font-bold flex items-center justify-center">
                  3
                </div>
                <h4 className="text-xs font-bold text-black font-display">Self-Paced Progress</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your progress is saved automatically. You have 1 full year of access to complete your course modules and assessments.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-black text-white text-xs font-mono font-bold flex items-center justify-center">
                  4
                </div>
                <h4 className="text-xs font-bold text-black font-display">Automated DBPR Reporting</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  For Florida licensing education courses, course completion records will be reported directly to the Florida DBPR.
                </p>
              </div>
            </div>
          </div>

          {/* Need Help / Support Box */}
          <div className="bg-gray-50/80 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-600">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-black font-bold">Have questions or need login assistance?</p>
                <p className="text-gray-500">Our student support team is ready to assist you.</p>
              </div>
            </div>
            <a
              href="mailto:adriana@upgradedreacademy.com"
              className="bg-white border border-gray-200 text-black font-bold py-2.5 px-4 rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              adriana@upgradedreacademy.com
            </a>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </button>
            <button
              onClick={onExploreCourses}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-neutral-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Explore More Courses
            </button>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
