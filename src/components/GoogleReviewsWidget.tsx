import React, { useState, useEffect } from "react";
import { Star, CheckCircle, Search, MessageSquare, ArrowRight, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Review {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  avatarColor: string;
  verified: boolean;
  category: "all" | "licensing" | "tech";
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Sarah Jenkins",
    role: "Licensed Broker / Owner",
    location: "Miami, FL",
    rating: 5,
    date: "2 days ago",
    text: "Upgraded completely redefined how I view continuing education. The AI marketing modules helped me double my listing conversions within 30 days of completing the course.",
    avatarColor: "bg-blue-500",
    verified: true,
    category: "tech",
  },
  {
    id: "rev-2",
    name: "Michael Chang",
    role: "Realtor-Associate",
    location: "Orlando, FL",
    rating: 5,
    date: "1 week ago",
    text: "DBPR licensing education is usually incredibly dry, but Upgraded's platform is highly engaging. The bite-sized curriculum and modern interface made renewing my license painless.",
    avatarColor: "bg-emerald-500",
    verified: true,
    category: "licensing",
  },
  {
    id: "rev-3",
    name: "David Rodriguez",
    role: "Newly Licensed Sales Associate",
    location: "Tampa, FL",
    rating: 5,
    date: "2 weeks ago",
    text: "Passed my Florida pre-license state exam on the very first try! The interactive practice modes and AI Career Advisor prepared me perfectly. Unbelievably high quality.",
    avatarColor: "bg-purple-500",
    verified: true,
    category: "licensing",
  },
  {
    id: "rev-4",
    name: "Amanda Ross",
    role: "Luxury Estate Agent",
    location: "Naples, FL",
    rating: 5,
    date: "3 weeks ago",
    text: "Finally, a platform built for high-performance modern agents. The focus on leveraging cutting-edge AI tools and social frameworks is lightyears ahead of traditional schools.",
    avatarColor: "bg-amber-500",
    verified: true,
    category: "tech",
  },
];

export default function GoogleReviewsWidget() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [filter, setFilter] = useState<"all" | "licensing" | "tech">("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Form State
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newCategory, setNewCategory] = useState<"licensing" | "tech">("licensing");
  const [newText, setNewText] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Load persisted reviews
  useEffect(() => {
    const saved = localStorage.getItem("upgraded_google_reviews");
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading reviews from localStorage", e);
      }
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newText) return;

    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: newName,
      role: newRole || "Real Estate Professional",
      location: newLocation || "Florida",
      rating: newRating,
      date: "Just now",
      text: newText,
      avatarColor: randomColor,
      verified: true,
      category: newCategory,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("upgraded_google_reviews", JSON.stringify(updated));

    // Reset Form
    setNewName("");
    setNewRole("");
    setNewLocation("");
    setNewRating(5);
    setNewText("");
    setIsFormOpen(false);
  };

  const filteredReviews = reviews.filter(r => filter === "all" || r.category === filter);

  // Calculate stats
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const totalRatingCount = reviews.length;

  return (
    <section className="bg-[#FAFAFA] py-24 px-6 border-t border-gray-150 relative">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Widget Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Live Google Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight font-display">
              Verified Student Success
            </h2>
            <p className="text-gray-500 text-sm max-w-xl">
              Real stories from real estate professionals in Florida who transformed their practice, updated their compliance, and mastered modern digital toolkits.
            </p>
          </div>

          {/* Google overall summary card */}
          <div className="bg-white border border-gray-150 p-5 rounded-2xl flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)] shrink-0 self-start md:self-end">
            <div className="flex flex-col items-center justify-center border-r border-gray-100 pr-4">
              <span className="text-3xl font-black text-black tracking-tighter leading-none font-display">
                {averageRating}
              </span>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-gray-400 font-mono mt-1 uppercase font-semibold">
                {totalRatingCount} Reviews
              </span>
            </div>
            
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-1.5">
                {/* Clean inline SVG for Google 'G' logo */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider font-sans">
                  Google Rating
                </span>
              </div>
              <p className="text-[10px] text-gray-400 max-w-[140px] leading-snug">
                Verified 5-star customer feedback score in Florida.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar & Submit Review Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-150">
          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all duration-300 cursor-pointer ${
                filter === "all" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
              }`}
            >
              All Feedback
            </button>
            <button
              onClick={() => setFilter("licensing")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all duration-300 cursor-pointer ${
                filter === "licensing" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
              }`}
            >
              Licensing
            </button>
            <button
              onClick={() => setFilter("tech")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all duration-300 cursor-pointer ${
                filter === "tech" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
              }`}
            >
              AI & Tech Modules
            </button>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 px-5 py-2 bg-black hover:bg-neutral-900 text-white font-semibold text-xs rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-gray-300" />
            Write a Review
          </button>
        </div>

        {/* Form Expand Area */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSubmitReview} className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 space-y-4 shadow-inner text-left">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-black font-display">Share Your Upgraded Experience</h3>
                  <p className="text-xs text-gray-500">Provide real-world feedback on your licensing or continuing education progress.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">Role / Specialty</label>
                    <input
                      type="text"
                      placeholder="e.g. Realtor / Broker"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Miami, FL"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">Rating</label>
                    <div className="flex gap-1.5 py-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 transition-all duration-150 ${
                              (hoverRating !== null ? star <= hoverRating : star <= newRating)
                                ? "fill-amber-400 text-amber-400 scale-110"
                                : "text-gray-200 hover:text-amber-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">Course Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as "licensing" | "tech")}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    >
                      <option value="licensing">Florida Licensing & CE</option>
                      <option value="tech">Professional Dev / AI Modules</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">Review Text</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe how your curriculum or practice has upgraded..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-black hover:bg-neutral-900 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-gray-150 rounded-2xl p-6 space-y-4 hover:border-black/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] transition-all duration-500 flex flex-col justify-between text-left relative"
              >
                <div className="space-y-3">
                  {/* Google Icon and Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span className="text-[10px] font-mono text-gray-400">{review.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-50 mt-auto">
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-sans ${review.avatarColor}`}>
                    {review.name.charAt(0)}
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-gray-900 font-sans">{review.name}</span>
                      {review.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50/50" />
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium font-sans">
                      {review.role} • <span className="text-gray-400 font-mono font-normal">{review.location}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
