import React, { useEffect } from "react";
import { motion } from "motion/react";
import { 
  FileText, 
  Shield, 
  UserCheck, 
  Receipt, 
  Accessibility, 
  Cookie,
  ArrowLeft,
  Calendar,
  Building,
  Mail
} from "lucide-react";

export type PolicyKey = "terms" | "privacy" | "student" | "refund" | "accessibility" | "cookie";

interface PolicyViewProps {
  initialPolicy: PolicyKey;
  onBack: () => void;
}

export default function PolicyView({ initialPolicy, onBack }: PolicyViewProps) {
  const [activePolicy, setActivePolicy] = React.useState<PolicyKey>(initialPolicy);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePolicy]);

  const policies = [
    {
      id: "terms" as PolicyKey,
      label: "Terms & Conditions",
      icon: FileText,
      updated: "July 2026",
    },
    {
      id: "privacy" as PolicyKey,
      label: "Privacy Policy",
      icon: Shield,
      updated: "July 2026",
    },
    {
      id: "student" as PolicyKey,
      label: "Student Policies",
      icon: UserCheck,
      updated: "July 2026",
    },
    {
      id: "refund" as PolicyKey,
      label: "Course Purchase & Refund Policy",
      icon: Receipt,
      updated: "July 2026",
    },
    {
      id: "accessibility" as PolicyKey,
      label: "Accessibility Statement",
      icon: Accessibility,
      updated: "July 2026",
    },
    {
      id: "cookie" as PolicyKey,
      label: "Cookie Policy",
      icon: Cookie,
      updated: "July 2026",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50/50 flex flex-col pt-24 pb-28 font-sans">
      <div className="max-w-6xl mx-auto w-full px-6">
        
        {/* Back Button */}
        <div className="mb-10 text-left">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* Header Title */}
        <div className="text-left border-b border-gray-150 pb-10 mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black font-display">
            Legal & <span className="italic font-extrabold text-neutral-800">Policies</span>
          </h1>
          <p className="text-gray-500 text-sm mt-3 max-w-2xl">
            Please review our institutional guidelines, licensing compliance mandates, privacy practices, and student terms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 bg-white border border-gray-150 rounded-2xl p-4 space-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 px-3 py-1 block mb-2">
              Documents
            </span>
            <div className="space-y-1">
              {policies.map((p) => {
                const Icon = p.icon;
                const isActive = activePolicy === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePolicy(p.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all text-left cursor-pointer ${
                      isActive 
                        ? "bg-black text-white" 
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1 truncate">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Policy Document Content */}
          <div className="lg:col-span-8 bg-white border border-gray-150 rounded-2xl p-6 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left">
            
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-gray-400 font-bold uppercase border-b border-gray-100 pb-6 mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Effective: July 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>Upgraded Real Estate Academy LLC</span>
              </div>
            </div>

            {/* Document Content */}
            <div className="prose prose-sm prose-neutral max-w-none">
              {activePolicy === "terms" && (
                <div className="space-y-6 font-sans">
                  <h2 className="text-xl font-bold text-black font-display tracking-tight border-b border-gray-100 pb-2">
                    Terms & Conditions
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Welcome to Upgraded Real Estate Academy LLC (“Company,” “we,” “our,” or “us”). By accessing or purchasing from www.upgradedreacademy.com, you agree to the following Terms & Conditions.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">1. USE OF OUR SERVICES</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        By using our website and purchasing our courses, you confirm that:
                      </p>
                      <ul className="list-disc list-inside pl-4 text-xs text-gray-500 space-y-1">
                        <li>You are at least 18 years old</li>
                        <li>You will provide accurate and complete information</li>
                        <li>You will use the course for personal, non-commercial purposes only</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">2. COURSE ACCESS</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Upon successful payment:
                      </p>
                      <ul className="list-disc list-inside pl-4 text-xs text-gray-500 space-y-1">
                        <li>You will receive access to the purchased course</li>
                        <li>Access is granted for your individual use only</li>
                        <li>Sharing login credentials or distributing course content is strictly prohibited</li>
                      </ul>
                      <p className="text-xs text-gray-500 leading-relaxed mt-2">
                        We reserve the right to revoke access without refund if misuse or abuse is detected.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">3. EDUCATIONAL PURPOSE ONLY</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Our courses are designed for educational purposes. We do not guarantee:
                      </p>
                      <ul className="list-disc list-inside pl-4 text-xs text-gray-500 space-y-1">
                        <li>Passing any licensing exams</li>
                        <li>Approval by regulatory agencies outside stated jurisdictions</li>
                        <li>Specific financial or career outcomes</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">4. REGULATORY REPORTING</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        For applicable courses, we may report your course completion to regulatory agencies such as the Florida DBPR. It is your responsibility to:
                      </p>
                      <ul className="list-disc list-inside pl-4 text-xs text-gray-500 space-y-1">
                        <li>Provide accurate license information</li>
                        <li>Complete all course requirements</li>
                      </ul>
                      <p className="text-xs text-gray-500 leading-relaxed mt-2">
                        We are not responsible for delays caused by incorrect or incomplete information provided by the user.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">5. PAYMENTS</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        All payments are processed securely through third-party providers such as Stripe. By purchasing, you agree to:
                      </p>
                      <ul className="list-disc list-inside pl-4 text-xs text-gray-500 space-y-1">
                        <li>Pay the full amount displayed at checkout</li>
                        <li>Use a valid payment method</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">6. INTELLECTUAL PROPERTY</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        All course materials, content, videos, and resources are the property of Upgraded Real Estate Academy LLC. You may not:
                      </p>
                      <ul className="list-disc list-inside pl-4 text-xs text-gray-500 space-y-1">
                        <li>Copy, reproduce, or distribute content</li>
                        <li>Resell or share materials</li>
                        <li>Use content for commercial purposes</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">7. ACCOUNT TERMINATION</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We reserve the right to suspend or terminate access or remove users who violate these Terms.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">8. LIMITATION OF LIABILITY</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        To the fullest extent permitted by law, we are not liable for any indirect or consequential damages, or loss of income, business, or opportunities.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">9. CHANGES TO TERMS</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We may update these Terms at any time. Continued use of our services constitutes acceptance of the updated Terms.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activePolicy === "privacy" && (
                <div className="space-y-6 font-sans">
                  <h2 className="text-xl font-bold text-black font-display tracking-tight border-b border-gray-100 pb-2">
                    Privacy Policy
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Upgraded Real Estate Academy LLC (“Company,” “we,” “our,” or “us”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at www.upgradedreacademy.com and purchase our courses.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">1. INFORMATION WE COLLECT</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We may collect personal information that you voluntarily provide when you register for a course, make a purchase, subscribe to emails or communications, or contact us for support. This may include:
                      </p>
                      <ul className="list-disc list-inside pl-4 text-xs text-gray-500 space-y-1">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Billing information (processed securely via third-party providers)</li>
                        <li>Real estate license information (if required for course reporting or compliance)</li>
                      </ul>
                      <p className="text-xs text-gray-500 leading-relaxed mt-2">
                        We may also collect limited non-personal data automatically, such as IP address, browser type, device information, and website usage data.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">2. HOW WE USE YOUR INFORMATION</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We use your information to:
                      </p>
                      <ul className="list-disc list-inside pl-4 text-xs text-gray-500 space-y-1">
                        <li>Process and deliver your course purchases</li>
                        <li>Provide access to our educational platform</li>
                        <li>Report course completions to regulatory bodies (such as the Florida DBPR, when applicable)</li>
                        <li>Send important updates (course access, deadlines, renewal reminders)</li>
                        <li>Send marketing communications (you may opt out at any time)</li>
                        <li>Improve our services and user experience</li>
                        <li>Comply with legal and regulatory requirements</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">3. PAYMENT PROCESSING</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        All payments are securely processed through third-party providers such as Stripe. We do not store your full credit card information. Payment providers handle your financial data in accordance with their own privacy and security policies.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">4. HOW WE SHARE INFORMATION</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We do not sell your personal information. We may share your information with trusted third parties only when necessary to operate our business, including payment processors, CRM and marketing platforms, course hosting platforms, and government or regulatory agencies (such as DBPR) when required.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">5. DATA SECURITY</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We implement reasonable technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">6. YOUR RIGHTS</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Depending on your location, you may have the right to access the personal data we hold about you, request corrections or deletion, or opt out of marketing communications. To exercise your rights, please contact us at:
                      </p>
                      <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 inline-flex items-center gap-2 text-xs font-semibold text-black mt-1">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        <span>adriana@upgradedreacademy.com</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">7. COOKIES & TRACKING</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Our website may use cookies and similar technologies to improve user experience, analyze website traffic, and support marketing and advertising efforts. You can control cookie settings through your browser.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">8. INTERNATIONAL USERS</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        If you access our services from outside the United States, please note that your information may be transferred to and processed in the United States.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">9. THIRD-PARTY LINKS</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">10. CHILDREN’S PRIVACY</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal data from children.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">11. CHANGES TO THIS POLICY</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised “Last Updated” date.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activePolicy === "student" && (
                <div className="space-y-6 font-sans">
                  <h2 className="text-xl font-bold text-black font-display tracking-tight border-b border-gray-100 pb-2">
                    Student Policies
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Welcome to Upgraded Real Estate Academy. Our goal is to provide a modern, professional, and engaging online learning experience. These Student Policies are designed to ensure a consistent, secure, and high-quality educational environment for all students.
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">1. Enrollment</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Students are responsible for selecting the course that best matches their licensing status, educational requirements, or professional development goals. If you're unsure which program is right for you, our team is happy to assist you before enrollment.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">2. Course Access</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Access to Licensing Education programs is provided for the period specified on the individual course page. Professional Development programs include lifetime access, unless otherwise stated. Course access is granted exclusively to the enrolled student and may not be transferred, shared, or resold.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">3. Student Accounts</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Students are responsible for maintaining the confidentiality of their login credentials. Each account is intended for individual use only. Sharing account access with another individual is prohibited and may result in suspension or termination of access without refund.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">4. Course Completion</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Students enrolled in Florida Licensing Education programs are responsible for completing all required coursework, quizzes, examinations, and any additional completion requirements established by the Florida Department of Business and Professional Regulation (DBPR). Completion requirements may vary by program.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">5. Reporting of Course Completion</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        For DBPR-approved Licensing Education courses, successful course completion will be reported in accordance with applicable Florida requirements. Students are responsible for providing accurate licensing information during enrollment.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">6. Certificates</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Where applicable, certificates of completion will be made available after all course requirements have been successfully completed.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">7. Academic Integrity</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Students are expected to complete all coursework honestly and independently. Any attempt to misrepresent course completion, share examination content, impersonate another student, or otherwise violate academic integrity standards may result in removal from the course without refund and, when applicable, reporting to the appropriate regulatory authority.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">8. Copyright & Intellectual Property</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        All course materials, videos, presentations, downloads, assessments, graphics, educational resources, and website content are the intellectual property of Upgraded Real Estate Academy unless otherwise noted. No content may be copied, reproduced, distributed, recorded, modified, republished, shared, sold, or used for commercial purposes without prior written permission.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">9. Artificial Intelligence</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Innovation is part of our educational philosophy. Upgraded Real Estate Academy may incorporate artificial intelligence (AI) technologies to enhance the learning experience, improve educational resources, personalize student experiences, support student services, and assist in the development of course content.
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed mt-2">
                        All educational materials are reviewed by our team to help ensure accuracy, relevance, and instructional quality. Students remain responsible for understanding and mastering all course material, regardless of the technologies used in its development or delivery.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">10. Course Updates</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Education should evolve alongside the industry. As part of our commitment to continuous improvement, Upgraded Real Estate Academy may update, expand, improve, or replace course content, learning materials, videos, downloadable resources, assessments, and educational features at any time.
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed mt-2">
                        These updates are intended to enhance the student experience and reflect changes in industry practices, technology, educational standards, and applicable regulatory requirements. Whenever possible, updates will be made available to students according to the access period associated with their enrolled program.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">11. Technical Requirements</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Students are responsible for maintaining a reliable internet connection and a compatible device capable of accessing our online learning platform. While we strive to provide uninterrupted access, occasional maintenance, updates, or technical improvements may temporarily affect platform availability.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">12. Communication</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        By enrolling, students agree to receive important communications related to their courses, account, technical support, compliance updates, educational announcements, and other service-related notifications. Marketing communications are optional and may be managed through your communication preferences.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">13. Student Support</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We're committed to providing timely, professional, and responsive support throughout your learning experience. For assistance, please contact:
                      </p>
                      <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 inline-flex items-center gap-2 text-xs font-semibold text-black mt-1">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        <span>adriana@upgradedreacademy.com</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">14. Policy Updates</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        These Student Policies may be updated periodically to reflect improvements to our educational programs, operational processes, technology, or applicable regulatory requirements. The most current version will always be available on our website.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activePolicy === "refund" && (
                <div className="space-y-6 font-sans">
                  <h2 className="text-xl font-bold text-black font-display tracking-tight border-b border-gray-100 pb-2">
                    Course Purchase & Refund Policy
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Thank you for choosing Upgraded Real Estate Academy. Our educational programs are delivered entirely online and provide immediate access to digital course materials upon enrollment. To ensure you select the program that best fits your licensing status or professional goals, we encourage you to review the course description and eligibility requirements carefully before completing your purchase.
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    If you have any questions before enrolling, our team is happy to assist you.
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">1. Course Purchases</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Once enrollment has been completed and access to a course has been granted, enrollment fees are non-refundable and non-transferable. Please review the course description, eligibility requirements, pricing, and program details before completing your purchase.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">2. Choosing the Right Course</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Students are responsible for selecting the course appropriate for their individual licensing status or professional development goals. If you're unsure which program is right for you, we encourage you to contact our team before enrolling. We're happy to help you make the right choice.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">3. Duplicate Purchases</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        If you accidentally purchase the same course more than once, please contact us within seven (7) calendar days of the duplicate purchase. Verified duplicate purchases may be eligible for a refund or course credit at Upgraded Real Estate Academy's sole discretion.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">4. Technical Support</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        If you experience difficulty accessing your course or learning platform, please contact our support team. We're committed to resolving technical issues promptly to ensure you receive full access to your educational program. Technical issues that can be reasonably resolved do not constitute grounds for a refund.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">5. Questions?</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        If you have questions regarding this policy, please contact our team before completing your enrollment:
                      </p>
                      <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 inline-flex items-center gap-2 text-xs font-semibold text-black mt-1">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        <span>adriana@upgradedreacademy.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePolicy === "accessibility" && (
                <div className="space-y-6 font-sans">
                  <h2 className="text-xl font-bold text-black font-display tracking-tight border-b border-gray-100 pb-2">
                    Accessibility Statement
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Upgraded Real Estate Academy is committed to providing an inclusive and accessible online learning experience for all users.
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We continually work to improve the accessibility and usability of our website and educational platform by following recognized accessibility best practices whenever possible.
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    If you experience difficulty accessing any part of our website or course materials, please contact us so we can assist you and work toward providing an appropriate solution.
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We welcome feedback regarding the accessibility of our website and educational programs.
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-black font-display">Contact</h3>
                    <p className="text-xs text-gray-500">Email:</p>
                    <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 inline-flex items-center gap-2 text-xs font-semibold text-black">
                      <Mail className="w-4 h-4 text-emerald-600" />
                      <span>adriana@upgradedreacademy.com</span>
                    </div>
                  </div>
                </div>
              )}

              {activePolicy === "cookie" && (
                <div className="space-y-6 font-sans">
                  <h2 className="text-xl font-bold text-black font-display tracking-tight border-b border-gray-100 pb-2">
                    Cookie Policy
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Upgraded Real Estate Academy uses cookies and similar technologies to improve your browsing experience, analyze website traffic, and better understand how visitors interact with our website.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">Cookies may be used to:</h3>
                      <ul className="list-disc list-inside pl-4 text-xs text-gray-500 space-y-1">
                        <li>Remember your preferences.</li>
                        <li>Improve website performance.</li>
                        <li>Measure website usage and analytics.</li>
                        <li>Support security and website functionality.</li>
                        <li>Deliver relevant marketing and advertising when applicable.</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-black font-display">Our website may use third-party services, including:</h3>
                      <ul className="list-disc list-inside pl-4 text-xs text-gray-500 space-y-1">
                        <li>Google Analytics</li>
                        <li>Meta Pixel</li>
                        <li>Other analytics and marketing technologies as our platform evolves.</li>
                      </ul>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed">
                      You can control or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of some areas of the website.
                    </p>

                    <p className="text-xs text-gray-500 leading-relaxed font-medium text-black">
                      By continuing to use this website, you consent to the use of cookies as described in this policy.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <h3 className="text-sm font-bold text-black font-display">Contact</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        If you have questions regarding this Cookie Policy, please contact:
                      </p>
                      <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 inline-flex items-center gap-2 text-xs font-semibold text-black mt-1">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        <span>adriana@upgradedreacademy.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
