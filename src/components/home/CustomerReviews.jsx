import React, { useState } from 'react';
import { pressQuotes, customerReviews } from '../../data/reviews';
import { Star, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const CustomerReviews = () => {
  const [activePressIdx, setActivePressIdx] = useState(0);

  const nextPress = () => {
    setActivePressIdx((prev) => (prev + 1) % pressQuotes.length);
  };

  const prevPress = () => {
    setActivePressIdx((prev) => (prev - 1 + pressQuotes.length) % pressQuotes.length);
  };

  const currentQuote = pressQuotes[activePressIdx];

  return (
    <section className="py-24 bg-velora-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Press Quotes Carousel */}
        <div className="bg-noir-900 text-white rounded-3xl p-8 sm:p-14 mb-20 relative shadow-2xl border border-white/10">
          <Quote className="w-12 h-12 text-gold/30 absolute top-8 left-8 hidden sm:block" />
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block">
              {currentQuote.publication}
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light italic leading-snug">
              "{currentQuote.quote}"
            </blockquote>
            <cite className="text-xs text-gray-400 uppercase tracking-widest block not-italic pt-2">
              — {currentQuote.author}
            </cite>
          </div>

          {/* Press Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevPress}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {pressQuotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePressIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activePressIdx === i ? 'bg-gold w-6' : 'bg-white/30'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextPress}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
              aria-label="Next quote"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Client Reviews Section */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-velora-600 font-semibold block mb-2">
              Verified Patron Reviews
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-noir-950 font-normal">
              Words From Our Discerning Clientele
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-noir-900">
                4.9 / 5.0 Average Satisfaction Rating
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-luxury transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-gold">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">{rev.date}</span>
                  </div>

                  <h4 className="text-sm font-semibold text-noir-900 mb-2 leading-snug">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs text-gray-600 font-light leading-relaxed mb-6">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-noir-950 truncate">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <CheckCircle className="w-3 h-3 text-gold shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400 block truncate">
                      {rev.location}
                    </span>
                    <span className="text-[10px] text-velora-600 font-medium block truncate">
                      Purchased {rev.productName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
