import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroBanner = () => {
  const { navigateTo } = useShop();

  return (
    <div className="relative min-h-[85vh] lg:min-h-[90vh] bg-noir-950 flex items-center overflow-hidden">
      {/* Background Editorial Image with Enhanced High-Contrast Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/36730602/pexels-photo-36730602.jpeg"
          alt="Velora Autumn Winter Haute Couture"
          className="w-full h-full object-cover object-center opacity-60 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multi-layer gradient scrim for maximum text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-noir-950/95 via-noir-950/80 to-noir-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/40 to-noir-950/70" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="max-w-2xl text-white space-y-6">
          
          {/* Badge with high-contrast glass pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noir-900/90 backdrop-blur-md border border-gold/40 text-gold text-xs uppercase tracking-widest font-semibold shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Autumn / Winter 2026 Haute Couture</span>
          </div>

          {/* Heading with deep shadow and high contrast */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            Quiet Luxury.<br />
            <span className="italic font-light text-gold-light">Timeless</span> Architecture.
          </h1>

          {/* Subtitle with bright white text and subtle shadow */}
          <p className="text-base sm:text-lg text-white/95 font-normal leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Pure Mongolian cashmere, Biella virgin wools, and Lyon silks tailored with artisanal precision. Designed for an enduring legacy beyond transient seasons.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigateTo('shop', 'women')}
              className="bg-gold hover:bg-gold-light text-noir-950 px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 shadow-2xl"
            >
              <span>Explore Women</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('shop', 'men')}
              className="bg-noir-900/80 hover:bg-noir-800 text-white backdrop-blur-md border border-white/40 px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 shadow-xl"
            >
              <span>Discover Men</span>
            </button>
          </div>

          {/* Editorial Highlights Box with Glassmorphism for High Readability */}
          <div className="pt-6">
            <div className="grid grid-cols-3 gap-6 bg-noir-900/80 backdrop-blur-md p-5 rounded-2xl border border-white/15 max-w-lg shadow-2xl">
              <div>
                <span className="font-serif text-2xl text-gold font-bold block drop-shadow-sm">100%</span>
                <span className="text-[11px] text-gray-200 uppercase tracking-widest font-medium">Traceable Fibers</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-white font-bold block drop-shadow-sm">Firenze</span>
                <span className="text-[11px] text-gray-200 uppercase tracking-widest font-medium">Italian Ateliers</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-white font-bold block drop-shadow-sm">Zero</span>
                <span className="text-[11px] text-gray-200 uppercase tracking-widest font-medium">Synthetic Waste</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
