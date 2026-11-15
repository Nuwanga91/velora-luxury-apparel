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
      className="relative min-h-[85vh] lg:min-h-[92vh] bg-noir-950 flex items-center overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Smooth Crossfade */}
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
              className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                index === currentSlide ? 'scale-105 opacity-60' : 'scale-100 opacity-0'
              }`}
            />
          </div>
        ))}

        {/* Multi-layer gradient scrim for maximum text legibility & contrast */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-noir-950/95 via-noir-950/80 to-noir-950/30" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-noir-950 via-noir-950/40 to-noir-950/70" />
        <div className="absolute inset-0 z-20 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-8 text-white space-y-6">
            {/* Animated Badge with high-contrast glass pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noir-900/90 backdrop-blur-md border border-gold/40 text-gold text-xs uppercase tracking-widest font-semibold shadow-lg transition-all">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{active.badge}</span>
            </div>

            {/* Heading with deep shadow and high contrast */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              {active.titlePrefix}<br />
              <span className="italic font-light text-gold-light">{active.titleItalic}</span> {active.titleSuffix}
            </h1>

            {/* Subtitle with bright white text and subtle shadow */}
            <p className="text-base sm:text-lg text-white/95 font-normal leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              {active.subtitle}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigateTo('shop', active.primaryCta.category)}
                className="bg-gold hover:bg-gold-light text-noir-950 px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 shadow-2xl"
              >
                <span>{active.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('shop', active.secondaryCta.category)}
                className="bg-noir-900/80 hover:bg-noir-800 text-white backdrop-blur-md border border-white/40 px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 shadow-xl"
              >
                <span>{active.secondaryCta.label}</span>
              </button>
            </div>

            {/* Editorial Highlights Box with Glassmorphism */}
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

          {/* Right Column: Editorial Visual Thumbnails (Desktop Interactive Lookbook) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col items-end space-y-4">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">
              Featured Editorial Looks
            </span>
            <div className="space-y-3 w-64">
              {HERO_SLIDES.map((slide, index) => (
                <div
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`group flex items-center gap-3 p-2 rounded-xl border cursor-pointer transition-all ${
                    index === currentSlide
                      ? 'bg-noir-900/90 border-gold shadow-lg ring-1 ring-gold/40'
                      : 'bg-noir-900/40 border-white/10 hover:border-white/30 hover:bg-noir-900/70'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.caption}
                    className="w-14 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div className="overflow-hidden">
                    <span className={`text-[10px] uppercase tracking-wider font-bold block ${
                      index === currentSlide ? 'text-gold' : 'text-gray-300'
                    }`}>
                      {slide.caption}
                    </span>
                    <span className="text-xs text-white/80 font-serif line-clamp-1">
                      {slide.titlePrefix} {slide.titleItalic}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Manual Slide Controls */}
      <div className="absolute bottom-6 left-4 sm:left-8 z-30 flex items-center gap-4">
        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-noir-900/80 hover:bg-gold hover:text-noir-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-noir-900/80 hover:bg-gold hover:text-noir-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="flex items-center gap-2 ml-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide
                  ? 'w-8 bg-gold'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <span className="text-[11px] font-mono text-gray-400 tracking-wider hidden sm:inline-block ml-2">
          0{currentSlide + 1} / 0{HERO_SLIDES.length}
        </span>
      </div>
    </div>
  );
};
