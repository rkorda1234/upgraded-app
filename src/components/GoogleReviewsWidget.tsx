import React, { useEffect } from "react";

export default function GoogleReviewsWidget() {
  // Load the external GoHighLevel / ReputationHub script to handle iframe resizing/behavior
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://reputationhub.site/reputation/assets/review-widget.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://reputationhub.site/reputation/assets/review-widget.js";
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="reviews" className="bg-[#FAFAFA] py-20 px-6 border-t border-gray-150 relative">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live Client Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight font-display">
            Verified Student Success
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed font-sans">
            Real stories from real estate professionals who transformed their practice, updated their compliance, and mastered modern digital toolkits with our programs.
          </p>
        </div>

        {/* GoHighLevel Review Widget Iframe Container */}
        <div className="bg-white border border-gray-150 rounded-2xl p-4 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] min-h-[450px]">
          <iframe 
            className="lc_reviews_widget w-full" 
            src="https://reputationhub.site/reputation/widgets/review_widget/f9BI6PkMYA8EmsOEt8AU" 
            frameBorder="0" 
            scrolling="no" 
            style={{ minWidth: "100%", width: "100%", border: "none" }}
            title="Google Reviews"
          />
        </div>

      </div>
    </section>
  );
}
