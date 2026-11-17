import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Plus, ArrowRight, Sparkles, Check } from 'lucide-react';

export const LookbookSection = () => {
  const { navigateTo, addToCart, formatPrice } = useShop();

  const [activeHotspot, setActiveHotspot] = useState(1);

  const lookbookItems = [
    {
      id: 1,
      x: '32%',
      y: '56%',
      productId: 'vel-wom-002',
      title: 'Structured Blazer',
      price: 195,
      image: 'https://images.pexels.com/photos/13215302/pexels-photo-13215302.jpeg'
    },
    {
      id: 2,
      x: '48%',
      y: '50%',
      productId: 'vel-wom-003',
      title: 'Pleated Midi Skirt',
      price: 115,
      image: 'https://images.pexels.com/photos/38830349/pexels-photo-38830349.jpeg'
    },
    {
      id: 3,
      x: '64%',
      y: '45%',
      productId: 'vel-wom-011',
      title: 'Leather Handbag',
      price: 320,
      image: 'https://images.pexels.com/photos/32888397/pexels-photo-32888397.jpeg'
    }
  ];

  const activeItem = lookbookItems.find((item) => item.id === activeHotspot);

  return (
    <section className="py-24 bg-noir-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Editorial
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
            Shop The Atelier Runway Look
          </h2>
          <p className="text-sm text-gray-400 font-light mt-3">
            Click on any highlighted marker to inspect the composition, drape, and acquire individual runway garments.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Interactive Hotspot Image */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[16/11] bg-noir-900 border border-white/10 shadow-2xl">
            <img
              src="https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg"
              alt="Velora Lookbook Model"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-noir-950/20" />

            {/* Hotspot Markers */}
            {lookbookItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveHotspot(item.id)}
                style={{ left: item.x, top: item.y }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-20 ${
                  activeHotspot === item.id
                    ? 'bg-gold text-noir-950 ring-4 ring-gold/40 scale-125'
                    : 'bg-noir-950/80 backdrop-blur-md text-white border border-white/30 hover:scale-110'
                }`}
                aria-label={`Inspect ${item.title}`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-current" />
              </button>
            ))}

            {/* Mobile / Inline Popover on Image */}
            {activeItem && (
              <div
                style={{
                  left: activeItem.x,
                  top: `calc(${activeItem.y} + 45px)`
                }}
                className="absolute transform -translate-x-1/2 z-30 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md text-noir-950 p-2.5 rounded-xl shadow-2xl border border-white max-w-xs animate-fade-in"
              >
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-12 h-14 object-cover rounded-md"
                />
                <div className="text-left">
                  <h4 className="text-xs font-semibold line-clamp-1">{activeItem.title}</h4>
                  <span className="text-xs text-gold-dark font-serif font-bold">
                    {formatPrice(activeItem.price)}
                  </span>
                  <button
                    onClick={() => navigateTo('product', activeItem.productId)}
                    className="block text-[10px] uppercase tracking-wider text-velora-700 hover:text-noir-900 font-bold mt-1"
                  >
                    View Piece →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Selected Piece Showcase */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
            {activeItem && (
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">
                  Selected Runway Piece
                </span>
                <h3 className="font-serif text-2xl font-normal text-white mb-2">
                  {activeItem.title}
                </h3>
                <div className="text-2xl font-serif text-gold mb-4">
                  {formatPrice(activeItem.price)}
                </div>

                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-noir-900">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 text-xs text-gray-300 mb-6 font-light">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold" />
                    <span>Pure natural Italian fibers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold" />
                    <span>Complimentary express global courier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold" />
                    <span>Tailored in small sustainable batches</span>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('product', activeItem.productId)}
                  className="w-full bg-gold hover:bg-gold-light text-noir-950 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <span>Inspect & Acquire Piece</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
