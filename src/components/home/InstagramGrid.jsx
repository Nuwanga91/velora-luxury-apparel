import React from 'react';
import { instagramPosts } from '../../data/reviews';
import { Instagram, Heart } from 'lucide-react';

export const InstagramGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Instagram className="w-4 h-4" /> Social Atelier
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-noir-950 font-normal">
            As Styled By Our Global Community
          </h2>
          <p className="text-xs text-gray-500 font-light mt-2">
            Tag <strong className="text-noir-900">#VeloraCouture</strong> or <strong className="text-noir-900">@veloraofficial</strong> to be featured on our curated digital gallery.
          </p>
        </div>

        {/* 6-Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={post.image}
                alt="Velora Instagram community styling"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-noir-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
                <Instagram className="w-6 h-6 text-gold mb-1.5" />
                <span className="text-xs font-semibold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current text-red-400" /> {post.likes}
                </span>
                <span className="text-[10px] text-gray-300 uppercase tracking-widest mt-2 border border-white/30 px-2 py-0.5 rounded-full">
                  {post.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-noir-900 hover:text-gold transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @veloraofficial on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
