import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Sparkles, ArrowRight, Scissors, Feather, Compass, HeartHandshake, MapPin } from 'lucide-react';

export const BrandStoryPage = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-velora-50 min-h-screen pb-24">
      
      {/* Editorial Hero */}
      <div className="relative min-h-[70vh] bg-noir-950 text-white flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop"
          alt="Velora Florence Atelier"
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold block">
            Maison de Haute Couture • Est. 2018
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight">
            The Architecture of Quiet Luxury
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Crafted along the river Arno in Florence and designed in Paris. Where mathematical proportion meets unadulterated Italian natural fibers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        
        {/* Founders Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-noir-900">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                alt="Creative Director"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-100 hidden sm:block">
              <span className="font-serif text-base font-semibold text-noir-950 block">
                Elena Rossi
              </span>
              <span className="text-[11px] text-gold-dark uppercase tracking-widest font-bold">
                Co-Founder & Creative Director
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold font-bold block">
              The Manifesto
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-noir-950 font-normal leading-tight">
              "We Reject the Ephemeral. We Build for Decades."
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
              In an era dominated by hyper-accelerated micro-trends and synthetic fabrics, Velora operates on an antithetical philosophy: <strong>intentional permanence</strong>.
            </p>
            <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
              Every pattern we cut begins with raw geometry and human posture. A coat should not overpower the wearer; it should envelop them with an aura of composed elegance, moving effortlessly between boardrooms in Manhattan and galas in Saint-Germain.
            </p>
            <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
              We eliminated the traditional seasonal calendar to focus on small, obsessive editions. If a garment cannot be cherished twenty years from today, it does not leave our atelier.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Sustainable Craft */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-2">
              Provenance & Ethics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-noir-950 font-normal">
              The Four Atelier Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:shadow-luxury transition-all">
              <div className="w-12 h-12 rounded-xl bg-velora-100 flex items-center justify-center text-gold-dark">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-noir-950">
                100% Virgin Natural Fibers
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Zero polyester, acrylic, or synthetic micro-plastics. Only Grade-A Mongolian cashmere, Biella virgin wool, and 22-momme Mulberry silk.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:shadow-luxury transition-all">
              <div className="w-12 h-12 rounded-xl bg-velora-100 flex items-center justify-center text-gold-dark">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-noir-950">
                Architectural Half-Canvas
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Our tailoring utilizes authentic horsehair floating chest canvas that molds organically to the client’s chest contours over time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:shadow-luxury transition-all">
              <div className="w-12 h-12 rounded-xl bg-velora-100 flex items-center justify-center text-gold-dark">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-noir-950">
                Master Artisan Living Wages
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Every seamstress, pattern cutter, and presser in our Florence and Paris workshops earns more than 2x national living wage benchmarks.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:shadow-luxury transition-all">
              <div className="w-12 h-12 rounded-xl bg-velora-100 flex items-center justify-center text-gold-dark">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-noir-950">
                Carbon-Neutral Express
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                100% of global air and ground freight emissions are audited and counterbalanced through gold-standard reforestation partnerships.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="bg-noir-900 text-white rounded-3xl p-8 sm:p-14 mb-28 border border-white/10 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
              Historical Milestones
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal">
              Chronicles of the House
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="border-t border-gold/40 pt-6 space-y-2">
              <span className="font-serif text-2xl font-bold text-gold">2018</span>
              <h4 className="text-xs uppercase font-bold text-white tracking-wider">Firenze Atelier Founded</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Commenced operation with three master tailors along the Arno, specializing in single-breasted cashmere overcoats.
              </p>
            </div>

            <div className="border-t border-gold/40 pt-6 space-y-2">
              <span className="font-serif text-2xl font-bold text-gold">2021</span>
              <h4 className="text-xs uppercase font-bold text-white tracking-wider">Mulberry Silk Archive</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Unveiled our signature 22-momme bias-cut slip gowns in Lyon, receiving editorial accolades in Vogue and Harper’s Bazaar.
              </p>
            </div>

            <div className="border-t border-gold/40 pt-6 space-y-2">
              <span className="font-serif text-2xl font-bold text-gold">2023</span>
              <h4 className="text-xs uppercase font-bold text-white tracking-wider">Fifth Avenue & Paris</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Opened flagship salons on Fifth Avenue, New York, and Rue du Faubourg Saint-Honoré, Paris.
              </p>
            </div>

            <div className="border-t border-gold/40 pt-6 space-y-2">
              <span className="font-serif text-2xl font-bold text-gold">2026</span>
              <h4 className="text-xs uppercase font-bold text-white tracking-wider">Global Digital Atelier</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Full worldwide launch of real-time consignment dispatch with white-glove doorstep concierge.
              </p>
            </div>
          </div>
        </div>

        {/* Boutiques Callout */}
        <div className="text-center bg-white rounded-3xl p-10 sm:p-16 border border-gray-100 shadow-luxury">
          <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-2">
            Experience the Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-noir-950 font-normal mb-4">
            Visit an Atelier Salon
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light max-w-lg mx-auto mb-8">
            Schedule a private appointment with our sartorial directors in New York, London, Paris, or Milan.
          </p>

          <button
            onClick={() => navigateTo('shop', 'all')}
            className="bg-noir-950 hover:bg-noir-900 text-white px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2 shadow-xl transition-all"
          >
            <span>Explore Current Creations</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </button>
        </div>
      </div>
    </div>
  );
};
