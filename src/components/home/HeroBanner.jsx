import React, { useState, useEffect, useCallback } from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/36730602/pexels-photo-36730602.jpeg',
    badge: 'Autumn / Winter 2026 Haute Couture',
    titlePrefix: 'Quiet Luxury.',
    titleItalic: 'Timeless',
    titleSuffix: 'Architecture.',
    subtitle: 'Pure Mongolian cashmere, Biella virgin wools, and Lyon silks tailored with artisanal precision. Designed for an enduring legacy beyond transient seasons.',
    primaryCta: { label: 'Explore Women', category: 'women' },
    secondaryCta: { label: 'Discover Men', category: 'men' },
    caption: 'Couture Look 01 • Firenze'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/5242796/pexels-photo-5242796.jpeg',
    badge: 'The Sartorial Edit • Runway Icons',
    titlePrefix: 'Modern Precision.',
    titleItalic: 'Sculpted',
    titleSuffix: 'Silhouettes.',
    subtitle: 'Architectural single-breasted suiting, double-faced wool wrap coats, and liquid velvet slip dresses crafted in limited ateliers.',
    primaryCta: { label: 'Shop Women’s Tailoring', category: 'women' },
    secondaryCta: { label: 'New Arrivals', category: 'new-arrivals' },
    caption: 'Couture Look 02 • Paris'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/7337007/pexels-photo-7337007.jpeg',
    badge: 'The Essential Capsule • Contemporary Edition',
    titlePrefix: 'Elevated Basics.',
    titleItalic: 'Effortless',
    titleSuffix: 'Sophistication.',
    subtitle: 'Heavyweight 240 GSM organic combed cotton essentials, sharp athletic cuts, and hand-burnished Italian calfskin accessories.',
    primaryCta: { label: 'Explore Men’s Edit', category: 'men' },
    secondaryCta: { label: 'View All Creations', category: 'all' },
    caption: 'Couture Look 03 • Milano'
  }
];

export const HeroBanner = () => {
  const { navigateTo } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-slide every 6 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const active = HERO_SLIDES[currentSlide];

  return (
    <div 
      className="relative min-h-[85vh] lg:min-h-[92vh] bg-velora-100 flex items-center overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides: 100% Bright & Clearly Visible with Zero Dark Scrims */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.badge}
              className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out opacity-100 ${
                index === currentSlide ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        ))}

        {/* Subtle, natural gradient at bottom only to keep controls grounded */}
        <div className="absolute inset-x-0 bottom-0 h-32 z-10 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Frosted Luxury Atelier Glass Card (Clear, Bright, High-End) */}
          <div className="lg:col-span-7 xl:col-span-6 bg-white/92 backdrop-blur-md p-7 sm:p-10 rounded-3xl border border-white/60 shadow-2xl text-noir-950 space-y-6 animate-fade-in">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-velora-100/80 border border-gold/40 text-gold-dark text-xs uppercase tracking-widest font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>{active.badge}</span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight text-noir-950">
              {active.titlePrefix}<br />
              <span className="italic font-light text-gold-dark">{active.titleItalic}</span> {active.titleSuffix}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-800 font-normal leading-relaxed">
              {active.subtitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigateTo('shop', active.primaryCta.category)}
                className="bg-noir-950 hover:bg-noir-900 text-white px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                <span>{active.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

              <button
                onClick={() => navigateTo('shop', active.secondaryCta.category)}
                className="bg-velora-100 hover:bg-velora-200 text-noir-950 border border-gray-300 px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 transition-all shadow-sm"
              >
                <span>{active.secondaryCta.label}</span>
              </button>
            </div>

            {/* Editorial Highlights Box */}
            <div className="pt-2 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-3 bg-velora-50 p-3.5 rounded-2xl border border-velora-200 text-center">
                <div>
                  <span className="font-serif text-xl sm:text-2xl text-gold-dark font-extrabold block">100%</span>
                  <span className="text-[10px] text-gray-700 uppercase tracking-wider font-bold">Traceable Fibers</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl text-noir-950 font-extrabold block">Firenze</span>
                  <span className="text-[10px] text-gray-700 uppercase tracking-wider font-bold">Italian Ateliers</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl text-noir-950 font-extrabold block">Zero</span>
                  <span className="text-[10px] text-gray-700 uppercase tracking-wider font-bold">Synthetic Waste</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Thumbnails (Bright Frosted Glass Lookbook) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 flex-col items-end space-y-4">
            <div className="bg-white/85 backdrop-blur-md p-4 rounded-3xl border border-white/60 shadow-xl space-y-3 w-72">
              <span className="text-[11px] uppercase tracking-widest text-gold-dark font-extrabold block px-1">
                Featured Editorial Looks
              </span>
              <div className="space-y-2.5">
                {HERO_SLIDES.map((slide, index) => (
                  <div
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`group flex items-center gap-3 p-2 rounded-xl border cursor-pointer transition-all ${
                      index === currentSlide
                        ? 'bg-white border-gold shadow-md ring-2 ring-gold/40'
                        : 'bg-white/60 border-gray-200 hover:border-gray-400 hover:bg-white'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.caption}
                      className="w-14 h-16 object-cover rounded-lg shrink-0 border border-gray-200"
                    />
                    <div className="overflow-hidden">
                      <span className={`text-[10px] uppercase tracking-wider font-extrabold block ${
                        index === currentSlide ? 'text-gold-dark' : 'text-gray-700'
                      }`}>
                        {slide.caption}
                      </span>
                      <span className="text-xs text-noir-950 font-serif font-bold line-clamp-1 mt-0.5">
                        {slide.titlePrefix} {slide.titleItalic}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Manual Slide Controls with Bright Frosted Styling */}
      <div className="absolute bottom-6 left-4 sm:left-8 z-30 flex items-center gap-4">
        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-gold text-noir-950 hover:text-noir-950 backdrop-blur-md border border-gray-200 shadow-md flex items-center justify-center transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-gold text-noir-950 hover:text-noir-950 backdrop-blur-md border border-gray-200 shadow-md flex items-center justify-center transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="flex items-center gap-2 ml-1">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all shadow-sm ${
                idx === currentSlide
                  ? 'w-8 bg-noir-950'
                  : 'w-2.5 bg-white/80 hover:bg-white border border-gray-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <span className="text-xs font-mono font-bold text-noir-950 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-gray-200 shadow-sm hidden sm:inline-block ml-1">
          0{currentSlide + 1} / 0{HERO_SLIDES.length}
        </span>
      </div>
    </div>
  );
};
