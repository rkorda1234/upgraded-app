export interface FAQItem {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  headline: string;
  category: "Continuing Education" | "Licensing Education" | "Professional Development" | "Brokers";
  hours: string;
  price: string;
  originalPrice?: string;
  isLive: boolean;
  checkoutUrl?: string;
  badge?: string;
  dbprApproved?: boolean;
  accessPeriod: string;
  language: string;
  description: string;
  whoIsThisFor: string[];
  whatYouWillLearn: string[];
  features: string[];
  faqs: FAQItem[];
}

export const COURSES: Course[] = [
  {
    id: "fl-14hr-ce",
    slug: "14-hour-florida-continuing-education",
    title: "14-Hours Continuing Education in Florida Real Estate",
    headline: "Fulfill your mandatory Florida DBPR 14-hour license renewal requirement 100% online, fast, and stress-free.",
    category: "Continuing Education",
    hours: "14 Hours",
    price: "$49",
    originalPrice: "$79",
    isLive: true,
    checkoutUrl: "https://link.fastpaydirect.com/payment-link/6a5fde69a655fa0b802a5767",
    badge: "DBPR Approved",
    dbprApproved: true,
    accessPeriod: "1 Year Full Access",
    language: "English (Spanish assistance available)",
    description: 
      "The official Florida Department of Business and Professional Regulation (DBPR) approved 14-Hour Continuing Education course for Real Estate Sales Associates and Brokers. Designed for maximum convenience, this self-paced course covers all state-mandated subjects including 3 hours of Core Law, 3 hours of Business Ethics, and 8 hours of Specialty Real Estate Topics. Complete your renewal requirements on your desktop or mobile device with automated credit submission to the DBPR portal.",
    whoIsThisFor: [
      "Florida Real Estate Sales Associates preparing for their upcoming license renewal cycle.",
      "Active or Inactive Florida Real Estate Brokers seeking required core law, ethics, and specialty credits.",
      "Busy real estate professionals looking for a 100% self-paced, mobile-optimized online course.",
      "Agents who want automated, guaranteed completion reporting submitted directly to the Florida DBPR."
    ],
    whatYouWillLearn: [
      "Florida Core Law Updates: Navigate recent statutory changes, FREC rules, and legal compliance requirements.",
      "Professional Ethics & Standards: Understand key ethical duties, fair housing compliance, and risk mitigation.",
      "Real Estate Specialty Topics: Master modern contract negotiations, disclosures, property management, and listing strategies.",
      "License Maintenance Best Practices: Keep your license active and avoid costly DBPR renewal penalties or lapses."
    ],
    features: [
      "100% Online & Self-Paced — Learn anytime, anywhere on phone, tablet, or desktop",
      "Automated DBPR Reporting — Completion credits reported directly to state regulatory portal",
      "No Final Exam Proctoring — Flexible chapter quizzes with instant feedback",
      "Official Digital Certificate — Download your DBPR completion certificate immediately",
      "Instant HighLevel Student Access — Immediate login setup upon checkout"
    ],
    faqs: [
      {
        question: "How are my 14 hours reported to the Florida DBPR?",
        answer: "Upon completing all modules and quizzes, Upgraded Real Estate Academy automatically submits your completion records directly to the Florida DBPR portal electronically. You will also receive an official digital Certificate of Completion for your records."
      },
      {
        question: "Is there a timed proctored exam for 14-hour CE?",
        answer: "No! Florida 14-Hour Continuing Education does not require a proctored exam. You can progress through the reading modules and chapter quizzes at your own pace."
      },
      {
        question: "How long do I have access to the course?",
        answer: "You receive 1 full year (365 days) of access from the date of purchase, giving you ample time to complete your coursework and review materials whenever needed."
      },
      {
        question: "What happens after I complete payment at checkout?",
        answer: "You will be redirected directly to your HighLevel Student Portal where you can create your password and start learning immediately. An email confirmation with your portal access link is also sent instantly."
      }
    ]
  },
  {
    id: "fl-63hr-prelicensing",
    slug: "63-hour-florida-pre-licensing",
    title: "63-Hour Florida Real Estate Sales Associate Pre-Licensing",
    headline: "Your official foundational pathway to passing the state exam and launching a high-earning Florida real estate career.",
    category: "Licensing Education",
    hours: "63 Hours",
    price: "$249",
    originalPrice: "$299",
    isLive: false,
    badge: "Coming Soon",
    dbprApproved: true,
    accessPeriod: "1 Year Full Access",
    language: "English & Spanish",
    description:
      "The comprehensive 63-Hour Pre-Licensing course mandated by the Florida Real Estate Commission (FREC I) for aspiring real estate agents. Master Florida real estate law, principles and practices, math calculations, closing statements, and real estate contracts in an engaging, modern digital environment designed to help you pass the state licensing exam on your first attempt.",
    whoIsThisFor: [
      "Individuals aspiring to become licensed Florida Real Estate Sales Associates.",
      "Career switchers and entrepreneurs seeking flexible online real estate education.",
      "Students who want high-yield state exam preparation integrated into their core licensing curriculum."
    ],
    whatYouWillLearn: [
      "Florida Real Estate License Law, FREC rules, and statutory disclosures.",
      "Real estate ownership, titles, deeds, legal descriptions, and escrow management.",
      "Real estate finance, mortgage markets, appraisals, and closing statement mathematics.",
      "Proven test-taking strategies and simulated practice exams modeled after Pearson VUE."
    ],
    features: [
      "DBPR FREC I Compliant Curriculum",
      "Integrated State Exam Prep & Practice Question Bank",
      "Interactive Real Estate Math Practice Modules",
      "Mobile-Friendly Digital Dashboard & Downloadable Study Guides"
    ],
    faqs: [
      {
        question: "When will this course be available for enrollment?",
        answer: "Enrollment for the 63-Hour Pre-Licensing course is opening very soon. Click 'Notify Me' or contact our team to be added to the early-access priority list."
      },
      {
        question: "Does this course satisfy FREC I requirements?",
        answer: "Yes, once live, this course fulfills the 63-hour educational prerequisite required by FREC to sit for the Florida Real Estate Sales Associate state exam."
      }
    ]
  },
  {
    id: "fl-45hr-postlicensing",
    slug: "45-hour-florida-post-licensing",
    title: "45-Hour Florida Post-Licensing for Sales Associates",
    headline: "Fulfill your mandatory first-renewal post-license requirement with real-world business building strategies.",
    category: "Licensing Education",
    hours: "45 Hours",
    price: "$189",
    originalPrice: "$229",
    isLive: false,
    badge: "Coming Soon",
    dbprApproved: true,
    accessPeriod: "1 Year Full Access",
    language: "English",
    description:
      "Mandatory for all newly licensed Florida Real Estate Sales Associates prior to their first license expiration date. This course goes beyond theory to equip new agents with practical lead generation, listing presentations, buyer representation, contract drafting, and business management skills while maintaining 100% DBPR compliance.",
    whoIsThisFor: [
      "Newly licensed Florida Real Estate Sales Associates facing their first 18-24 month license renewal.",
      "Agents looking to turn compliance education into actual closed transactions and active listings."
    ],
    whatYouWillLearn: [
      "Building a predictable real estate sales pipeline and database.",
      "Mastering FAR/BAR contracts, addenda, and escrow procedures.",
      "Conducting comparative market analyses (CMA) and winning listing appointments.",
      "Navigating fair housing, risk management, and DBPR compliance rules."
    ],
    features: [
      "100% Online FREC Compliant Post-Licensing",
      "Real-world transaction templates & listing scripts",
      "Automated DBPR completion reporting upon course completion",
      "Flexible self-paced reading & assessment structure"
    ],
    faqs: [
      {
        question: "What happens if I miss my 45-hour post-licensing deadline?",
        answer: "Under Florida law, failure to complete the 45-hour post-licensing requirement before your first expiration date causes your sales associate license to become null and void. Enrolling early ensures you avoid any disruption to your business."
      }
    ]
  },
  {
    id: "fl-72hr-broker",
    slug: "72-hour-florida-broker-pre-licensing",
    title: "72-Hour Florida Real Estate Broker Pre-Licensing",
    headline: "Step into brokerage leadership, manage sales teams, and elevate your real estate career to the broker level.",
    category: "Brokers",
    hours: "72 Hours",
    price: "$349",
    originalPrice: "$399",
    isLive: false,
    badge: "Coming Soon",
    dbprApproved: true,
    accessPeriod: "1 Year Full Access",
    language: "English",
    description:
      "The official FREC II 72-Hour Broker Pre-Licensing course designed for experienced Florida sales associates looking to open their own brokerage or become a broker associate. Covers brokerage operations, escrow account management, office management, real estate investment analysis, and advanced Florida law.",
    whoIsThisFor: [
      "Licensed Florida Sales Associates with at least 24 months of active experience within the past 5 years.",
      "Agents wanting to establish an independent brokerage or take on managing broker roles."
    ],
    whatYouWillLearn: [
      "Brokerage formation, operational management, and escrow accounting requirements.",
      "Advanced real estate investment valuation, commercial fundamentals, and valuation formulas.",
      "Recruiting, agent supervision, commission structures, and risk reduction.",
      "Comprehensive preparation for the Florida Broker State Examination."
    ],
    features: [
      "FREC II DBPR Approved Broker Curriculum",
      "Escrow Accounting & Audit Preparation Spreadsheets",
      "Brokerage Policy & Procedures Manual Templates",
      "Comprehensive Broker State Exam Review"
    ],
    faqs: [
      {
        question: "What are the prerequisites to take the Broker Pre-Licensing course?",
        answer: "You must hold an active Florida sales associate license for at least 24 months during the preceding 5 years under one or more active brokers before applying for a broker license."
      }
    ]
  },
  {
    id: "re-ai-marketing-mastery",
    slug: "real-estate-ai-marketing-mastery",
    title: "Real Estate Marketing & AI Automation Mastery",
    headline: "Leverage cutting-edge AI tools, automated social systems, and video marketing to scale listing appointments.",
    category: "Professional Development",
    hours: "Self-Paced",
    price: "$199",
    originalPrice: "$299",
    isLive: false,
    badge: "New Blueprint",
    dbprApproved: false,
    accessPeriod: "Lifetime Access",
    language: "English",
    description:
      "A non-licensing practical blueprint created for modern real estate agents who want to dominate their local market using artificial intelligence, automated CRM workflows, short-form video content, and targeted listing campaigns. Learn how to write hyper-converting property descriptions, create instant AI video walkthroughs, and automate lead follow-ups.",
    whoIsThisFor: [
      "Active real estate agents wanting a competitive technology edge in marketing & lead generation.",
      "Brokers & team leaders wanting to equip their agents with modern AI tools and systems."
    ],
    whatYouWillLearn: [
      "Prompt engineering for real estate: MLS remarks, email sequences, and listing brochures.",
      "Creating hyper-local video scripts and automated social media calendars with AI.",
      "Setting up high-converting lead capture funnels and HighLevel CRM automation workflows.",
      "Paid ad strategies for Facebook, Instagram, and Google Local Services."
    ],
    features: [
      "Lifetime Access to All Future AI Blueprint Updates",
      "20+ Copy-and-Paste Real Estate AI Prompts & Templates",
      "Step-by-Step HighLevel Automation Funnel Setup Guides",
      "Downloadable Social Media Content Planner"
    ],
    faqs: [
      {
        question: "Does this course offer DBPR continuing education credits?",
        answer: "No, this is a specialized Professional Development Masterclass focused exclusively on marketing, technology, and business growth. It does not count toward state license renewal credits."
      }
    ]
  }
];
