import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowUpRight } from 'lucide-react';

export const CategoryShowcase = () => {
  const { navigateTo } = useShop();

  const categories = [
    {
      id: 'women',
      title: 'Women’s Tailoring & Outerwear',
      subtitle: 'Structured Blazers, Wool Blend Wrap Coats & Silk Suiting (12 Pieces)',
      image: 'https://images.pexels.com/photos/3534454/pexels-photo-3534454.jpeg',
      tag: 'Women’s Atelier',
      span: 'md:col-span-2 md:row-span-2 h-[420px] md:h-[580px]'
    },
    {
      id: 'men',
      title: 'Men’s Sartorial & Tees',
      subtitle: 'Heavyweight 240 GSM Combed Tees & Athletic Cuts (15 Pieces)',
      image: 'https://images.pexels.com/photos/11215098/pexels-photo-11215098.jpeg',
      tag: 'Men’s Collection',
      span: 'md:col-span-1 h-[270px]'
    },
    {
      id: 'new-arrivals',
      title: 'New Arrivals A/W 26',
      subtitle: 'Wool Blend Wrap Coat & Velvet Slip Dress',
      image: 'https://images.pexels.com/photos/37647057/pexels-photo-37647057.jpeg',
      tag: 'Just Released',
      span: 'md:col-span-1 h-[270px]'
    },
    {
      id: 'accessories',
      title: 'Artisanal Leather Goods',
      subtitle: 'Hand-Burnished Full-Grain Calfskin Handbags',
      image: 'https://images.pexels.com/photos/2531089/pexels-photo-2531089.jpeg',
      tag: 'Italian Leather',
      span: 'md:col-span-2 h-[280px]'
    }
  ];

  return (
    <section className="py-20 bg-velora-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-velora-600 font-semibold block mb-2">
              Curated Universes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-noir-950 font-normal">
              Explore Velora by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', 'all')}
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest font-semibold text-noir-900 hover:text-gold flex items-center gap-1.5 transition-colors"
          >
            <span>View All Creations</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', cat.id)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-noir-900 shadow-luxury transition-all duration-500 hover:shadow-luxury-lg ${cat.span}`}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-95"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-noir-950/30 to-transparent transition-opacity group-hover:from-noir-950/95" />

              {/* Top Tag Badge */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-widest font-bold bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/20">
                  {cat.tag}
                </span>
              </div>

              {/* Floating Action Button */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-gold group-hover:text-noir-950 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Bottom Captions */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-serif text-xl sm:text-2xl font-normal mb-1 group-hover:text-gold transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-300 font-light line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
