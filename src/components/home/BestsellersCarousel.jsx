import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Star, Heart, Eye, ShoppingBag, ArrowRight } from 'lucide-react';

export const BestsellersCarousel = () => {
  const {
    products,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    setQuickViewProduct,
    navigateTo
  } = useShop();

  const [activeTab, setActiveTab] = useState('all');

  // Filter products based on tab
  const filteredProducts = products.filter((p) => {
    if (activeTab === 'women') return p.category === 'women' || p.tags?.includes('Women');
    if (activeTab === 'men') return p.category === 'men' || p.tags?.includes('Men');
    if (activeTab === 'new-arrivals') return p.isNewArrival;
    if (activeTab === 'bestsellers') return p.isBestseller;
    return true;
  }).slice(0, 12);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-2">
              Haute Couture Icons
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-noir-950 font-normal">
              Most Coveted Pieces
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Pieces' },
              { id: 'women', label: 'Women’s Couture' },
              { id: 'men', label: 'Men’s Essentials' },
              { id: 'new-arrivals', label: 'New Arrivals' },
              { id: 'bestsellers', label: 'Bestsellers' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-noir-900 text-white shadow-sm'
                    : 'bg-velora-100 text-noir-700 hover:bg-velora-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const discountPercent = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null;

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-xl overflow-hidden bg-white border border-gray-100 hover:border-gray-300 hover:shadow-luxury transition-all duration-300"
              >
                {/* Image Container with secondary hover swap */}
                <div className="relative aspect-[3/4] bg-velora-100 overflow-hidden cursor-pointer" onClick={() => navigateTo('product', product.id)}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src={product.images[1] || product.images[0]}
                    alt={`${product.name} alternate view`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.isNewArrival && (
                      <span className="bg-noir-900 text-white text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">
                        New
                      </span>
                    )}
                    {discountPercent && (
                      <span className="bg-gold text-noir-950 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-sm ${
                      isWishlisted
                        ? 'bg-red-50 text-red-500 border border-red-200'
                        : 'bg-white/80 text-noir-800 hover:bg-white hover:text-noir-950'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Scarcity badge */}
                  {product.stockCount <= 5 && (
                    <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm text-[10px] text-amber-900 py-1 px-2.5 rounded text-center font-medium shadow-sm">
                      Rare: Only {product.stockCount} pieces remaining in atelier
                    </div>
                  )}

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-noir-950/80 to-transparent flex items-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="flex-1 bg-white hover:bg-gold text-noir-950 py-2 rounded text-[11px] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 transition-colors shadow"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, product.sizes[0], product.colors[0], 1);
                      }}
                      className="bg-noir-900 hover:bg-noir-800 text-white p-2 rounded transition-colors shadow"
                      title="Quick Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-gray-500 uppercase tracking-widest mb-1">
                      <span>{product.subcategory}</span>
                      <div className="flex items-center text-gold">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-noir-900 ml-1 font-semibold">{product.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => navigateTo('product', product.id)}
                      className="font-serif text-lg text-noir-950 font-normal hover:text-gold transition-colors cursor-pointer mb-1 line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-light mb-3 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price & Swatches */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-baseline gap-2">
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      <span className="font-serif text-base font-semibold text-noir-950">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {/* Color Swatch Preview */}
                    <div className="flex items-center gap-1">
                      {product.colors.map((c, i) => (
                        <span
                          key={i}
                          title={c.name}
                          className={`w-3.5 h-3.5 rounded-full border border-gray-200 ${c.bgClass}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('shop', 'all')}
            className="inline-flex items-center gap-2 border-2 border-noir-900 text-noir-900 hover:bg-noir-900 hover:text-white px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-sm"
          >
            <span>Discover Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
