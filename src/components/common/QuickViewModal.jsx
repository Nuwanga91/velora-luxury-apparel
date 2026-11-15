import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Star, Heart, Check, ArrowRight } from 'lucide-react';

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice,
    navigateTo,
    setSizeGuideOpen
  } = useShop();

  if (!quickViewProduct) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(quickViewProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(quickViewProduct.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlist.includes(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigateTo('product', id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-noir-900 flex items-center justify-center shadow-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="md:w-1/2 bg-velora-100 relative flex flex-col justify-between overflow-hidden">
          <div className="h-72 sm:h-96 md:h-full relative">
            <img
              src={quickViewProduct.images[selectedImage] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {quickViewProduct.isNewArrival && (
              <span className="absolute top-4 left-4 bg-noir-900 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                New Arrival
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-lg w-max mx-auto shadow-sm">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-12 h-14 rounded overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-noir-900 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Customization & Order */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-velora-600 uppercase tracking-widest mb-1 font-medium">
              <span>{quickViewProduct.subcategory}</span>
              <span className="text-gray-400">SKU: {quickViewProduct.sku}</span>
            </div>

            <h3 className="font-serif text-2xl text-noir-950 font-normal mb-1">
              {quickViewProduct.name}
            </h3>
            <p className="text-xs text-gray-500 mb-3">{quickViewProduct.subtitle}</p>

            {/* Ratings & Price */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-noir-900">{quickViewProduct.rating}</span>
                <span className="text-xs text-gray-400">({quickViewProduct.reviewCount})</span>
              </div>

              <div className="flex items-baseline gap-2">
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
                <span className="text-xl font-serif font-medium text-noir-950">
                  {formatPrice(quickViewProduct.price)}
                </span>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-gray-600 font-medium">Color:</span>
                <span className="font-semibold text-noir-900">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {quickViewProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color);
                      if (color.imageIndex !== undefined && quickViewProduct.images[color.imageIndex]) {
                        setSelectedImage(color.imageIndex);
                      }
                    }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      selectedColor.name === color.name ? 'ring-2 ring-noir-900 ring-offset-2' : 'hover:scale-105'
                    }`}
                  >
                    <span className={`w-full h-full rounded-full ${color.bgClass}`}></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-gray-600 font-medium">Size:</span>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-gold font-medium hover:underline text-[11px]"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {quickViewProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs uppercase font-medium rounded border transition-all ${
                      selectedSize === size
                        ? 'bg-noir-900 text-white border-noir-900 font-semibold'
                        : 'border-gray-200 text-noir-800 hover:border-gray-400 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs text-gray-600 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-noir-900 font-semibold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold text-noir-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(quickViewProduct.stockCount, q + 1))}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-noir-900 font-semibold"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-emerald-700 font-medium">
                In Stock ({quickViewProduct.stockCount} left)
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-gray-100 space-y-2.5">
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 bg-noir-900 hover:bg-noir-800 text-white py-3 rounded-lg text-xs uppercase tracking-widest font-bold shadow-md transition-colors"
              >
                Add to Bag • {formatPrice(quickViewProduct.price * quantity)}
              </button>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-lg border transition-colors ${
                  isWishlisted
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-gray-200 text-noir-800 hover:bg-gray-50'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleViewFullDetails}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs uppercase tracking-wider text-velora-700 hover:text-noir-900 transition-colors font-medium"
            >
              <span>View Full Atelier Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
