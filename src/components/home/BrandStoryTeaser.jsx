import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Scissors, Feather, HeartHandshake } from 'lucide-react';

export const BrandStoryTeaser = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-24 bg-velora-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Visual Atelier Montage */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop"
                alt="Velora Artisan Hands at Work"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping small accent card */}
            <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-noir-900 text-white p-6 rounded-2xl shadow-2xl max-w-xs border border-white/10 hidden sm:block">
              <span className="text-gold font-serif text-3xl font-light block mb-1">
                Atelier Firenze
              </span>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Hand-cut pattern mastercraft rooted in 120-year-old Tuscan textile traditions.
              </p>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
              The Velora Ethos
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-noir-950 font-normal leading-[1.15]">
              Couture Without Pretense.<br />
              <span className="italic">Substance</span> in Every Thread.
            </h2>

            <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
              Velora was conceived with an uncompromising conviction: luxury apparel should not whisper in vanity, but speak in the weight of its cashmere, the fluidity of its silks, and the integrity of its makers.
            </p>

            <p className="text-sm text-gray-600 font-light leading-relaxed">
              We partner directly with historic mills across Biella, Como, and Lyon, bypassing middlemen to channel pure value into handcrafted construction and lifelong resilience.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-velora-200">
              <div className="space-y-1.5">
                <Scissors className="w-5 h-5 text-gold" />
                <h4 className="text-xs uppercase tracking-wider font-bold text-noir-900">
                  Precision Cut
                </h4>
                <p className="text-xs text-gray-500 font-light">
                  Hand-draped silhouettes crafted to endure.
                </p>
              </div>

              <div className="space-y-1.5">
                <Feather className="w-5 h-5 text-gold" />
                <h4 className="text-xs uppercase tracking-wider font-bold text-noir-900">
                  Virgin Fibers
                </h4>
                <p className="text-xs text-gray-500 font-light">
                  Zero synthetic polymers or blended fillers.
                </p>
              </div>

              <div className="space-y-1.5">
                <HeartHandshake className="w-5 h-5 text-gold" />
                <h4 className="text-xs uppercase tracking-wider font-bold text-noir-900">
                  Ethical Craft
                </h4>
                <p className="text-xs text-gray-500 font-light">
                  Fair living artisan wages guaranteed.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => navigateTo('story')}
                className="inline-flex items-center gap-2 bg-noir-900 hover:bg-noir-800 text-white px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
              >
                <span>Read The Full Brand Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
