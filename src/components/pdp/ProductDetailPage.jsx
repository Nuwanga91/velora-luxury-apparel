import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  Package, 
  Ruler, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  MessageSquare,
  Maximize2,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const ProductDetailPage = () => {
  const {
    products,
    selectedProductId,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    setSizeGuideOpen,
    navigateTo,
    setIsCartOpen,
    addToast
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard' });
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('details'); // details, material, care, shipping
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState([
    {
      author: 'Lady Sophia Pembroke',
      rating: 5,
      date: '4 days ago',
      verified: true,
      comment: 'The architectural silhouette and the hand-feel of the fabric are unmatched. Truly haute couture caliber.'
    },
    {
      author: 'Marcus C.',
      rating: 5,
      date: '2 weeks ago',
      verified: true,
      comment: 'Exceeded every expectation. Arrived in an embossed archival box with custom garment bag and cedar block.'
    }
  ]);

  // Sync state when product changes
  useEffect(() => {
    setActiveImageIdx(0);
    setIsLightboxOpen(false);
    setLightboxZoomed(false);
    setSelectedColor(product.colors[0] || { name: 'Standard' });
    setSelectedSize(product.sizes[0] || 'Standard');
    setQuantity(1);
  }, [product.id]);

  // Lock body scroll and handle keyboard navigation when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) {
      setLightboxZoomed(false);
      return;
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight' && product.images.length > 1) {
        setActiveImageIdx((prev) => (prev + 1) % product.images.length);
        setLightboxZoomed(false);
      } else if (e.key === 'ArrowLeft' && product.images.length > 1) {
        setActiveImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
        setLightboxZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen, product.images.length]);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('checkout');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      addToast('Please enter your name and review', 'error');
      return;
    }
    const newRev = {
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      verified: true,
      comment: newReviewComment
    };
    setLocalReviews([newRev, ...localReviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setReviewFormOpen(false);
    addToast('Your review has been verified and published.', 'success');
  };

  // Related products
  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isBestseller))
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Breadcrumbs */}
      <div className="bg-velora-50 border-b border-velora-200 py-3.5 px-4 sm:px-6 lg:px-8 text-xs text-gray-500 uppercase tracking-widest font-medium">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button onClick={() => navigateTo('home')} className="hover:text-noir-900 transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('shop', product.category)} className="hover:text-noir-900 transition-colors capitalize">
            {product.category}
          </button>
          <span>/</span>
          <span className="text-noir-950 font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Vertical Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-18 h-24 md:w-20 md:h-28 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIdx === idx ? 'border-noir-950 scale-102 shadow-sm' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="flex-1 relative aspect-[3/4] rounded-2xl overflow-hidden bg-velora-100 shadow-luxury group cursor-zoom-in"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsLightboxOpen(true);
                }
              }}
              title="Click to view full image"
            >
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {product.isNewArrival && (
                <div className="absolute top-4 left-4 bg-noir-900 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded shadow-md pointer-events-none">
                  New Arrival
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md z-10 ${
                  isWishlisted ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-white/80 backdrop-blur-md text-noir-900 hover:bg-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Click to Expand Floating Badge */}
              <div className="absolute bottom-4 right-4 bg-noir-950/85 hover:bg-noir-950 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all shadow-lg border border-white/20 group-hover:scale-105 pointer-events-none">
                <Maximize2 className="w-3.5 h-3.5 text-gold" />
                <span>Full Image</span>
              </div>
            </div>
          </div>

          {/* Right Column: Buying Controls (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-velora-600 uppercase tracking-widest font-semibold mb-2">
                <span>{product.subcategory}</span>
                <span className="text-gray-400">SKU: {product.sku}</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-serif text-3xl sm:text-4xl text-noir-950 font-normal leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 font-light mb-4">{product.subtitle}</p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                <div className="flex items-baseline gap-3">
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-noir-950">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-noir-900">{product.rating}</span>
                  <a href="#reviews" className="text-xs text-gray-500 hover:underline">
                    ({product.reviewCount + localReviews.length} reviews)
                  </a>
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider mb-2">
                  <span className="font-bold text-noir-900">Color Variant:</span>
                  <span className="text-velora-700 font-semibold">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color);
                        if (color.imageIndex !== undefined && product.images[color.imageIndex]) {
                          setActiveImageIdx(color.imageIndex);
                        }
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        selectedColor.name === color.name ? 'ring-2 ring-noir-950 ring-offset-2 scale-110' : 'hover:scale-105'
                      }`}
                      title={color.name}
                    >
                      <span className={`w-full h-full rounded-full ${color.bgClass}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider mb-2">
                  <span className="font-bold text-noir-900">Size:</span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-gold-dark hover:underline font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Size & Fit Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs uppercase font-semibold rounded-lg border transition-all ${
                        selectedSize === size
                          ? 'bg-noir-950 text-white border-noir-950 shadow-sm'
                          : 'bg-white text-noir-900 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scarcity Alert */}
              {product.stockCount <= 6 && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-xl text-xs font-medium mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Limited Atelier Batch: Only <strong>{product.stockCount} pieces remaining</strong>.</span>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag */}
              <div className="space-y-3 mb-8">
                <div className="flex gap-3">
                  <div className="flex items-center border border-gray-300 rounded-xl px-2">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-noir-900 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-noir-950">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-noir-900 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-noir-950 hover:bg-noir-900 text-white py-4 rounded-xl text-xs uppercase tracking-widest font-bold shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gold hover:bg-gold-light text-noir-950 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-md"
                >
                  Instant Express Checkout
                </button>
              </div>

              {/* Delivery Estimates */}
              <div className="bg-velora-50 rounded-xl p-4 border border-velora-200 text-xs text-gray-700 space-y-2 mb-8">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>
                    Complimentary express dispatch by <strong>Wednesday, Nov 18</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>30-Day White-Glove Atelier Returns & Exchanges</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>Delivered in Archival Velora Box with Wooden Hanger</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200 divide-y divide-gray-200">
              
              {/* Details & Tailoring */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'details' ? '' : 'details')}
                  className="w-full py-4 flex items-center justify-between text-xs uppercase tracking-wider font-bold text-noir-950 hover:text-gold transition-colors text-left"
                >
                  <span>Architectural Details & Fit</span>
                  {activeAccordion === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'details' && (
                  <div className="pb-4 text-xs text-gray-600 font-light leading-relaxed space-y-2 animate-fade-in">
                    <p>{product.description}</p>
                    <p><strong>Fit Guide:</strong> {product.fit}</p>
                  </div>
                )}
              </div>

              {/* Material & Provenance */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'material' ? '' : 'material')}
                  className="w-full py-4 flex items-center justify-between text-xs uppercase tracking-wider font-bold text-noir-950 hover:text-gold transition-colors text-left"
                >
                  <span>Materials & Provenance</span>
                  {activeAccordion === 'material' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'material' && (
                  <div className="pb-4 text-xs text-gray-600 font-light leading-relaxed animate-fade-in">
                    <p>{product.material}</p>
                    <p className="mt-2 text-emerald-800 font-medium">
                      ✓ Sourced exclusively from certified non-mulesed organic farms and historic Italian mills.
                    </p>
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'care' ? '' : 'care')}
                  className="w-full py-4 flex items-center justify-between text-xs uppercase tracking-wider font-bold text-noir-950 hover:text-gold transition-colors text-left"
                >
                  <span>Garment Care & Longevity</span>
                  {activeAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'care' && (
                  <div className="pb-4 text-xs text-gray-600 font-light leading-relaxed animate-fade-in">
                    <p>{product.care}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div id="reviews" className="mt-24 pt-16 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                Atelier Feedback
              </span>
              <h2 className="font-serif text-3xl text-noir-950 font-normal">
                Verified Client Reviews
              </h2>
            </div>
            <button
              onClick={() => setReviewFormOpen(!reviewFormOpen)}
              className="bg-noir-900 text-white px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-noir-800 transition-colors w-max"
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Write a Review
            </button>
          </div>

          {/* Interactive Review Form */}
          {reviewFormOpen && (
            <form onSubmit={handleAddReview} className="bg-velora-50 p-6 rounded-2xl border border-velora-200 mb-10 max-w-xl animate-fade-in">
              <h4 className="text-xs uppercase tracking-widest font-bold text-noir-950 mb-4">
                Share Your Experience with {product.name}
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Charlotte H."
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-noir-900 focus:outline-none focus:border-noir-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Star Rating</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-noir-900 focus:outline-none"
                  >
                    <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                    <option value="4">★★★★☆ (4 Stars - Highly Pleased)</option>
                    <option value="3">★★★☆☆ (3 Stars - Average)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Your Comments on Fabric, Fit, and Finish</label>
                  <textarea
                    rows="3"
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Describe how the garment drapes and feels..."
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-noir-900 focus:outline-none focus:border-noir-900"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-gold text-noir-950 px-5 py-2 rounded-lg text-xs uppercase tracking-wider font-bold"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFormOpen(false)}
                    className="text-gray-500 px-3 py-2 text-xs uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localReviews.map((rev, i) => (
              <div key={i} className="bg-velora-50/70 p-6 rounded-2xl border border-velora-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-gold">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">{rev.date}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed mb-4 font-light">
                  "{rev.comment}"
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-noir-950">
                  <span>{rev.author}</span>
                  {rev.verified && (
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-normal">
                      Verified Client
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete The Look Carousel */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gray-200">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                Atelier Recommendations
              </span>
              <h2 className="font-serif text-3xl text-noir-950 font-normal">
                Harmonious Pairings
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigateTo('product', item.id)}
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-luxury transition-all"
                >
                  <div className="aspect-[3/4] bg-velora-100 overflow-hidden relative">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">
                      {item.subcategory}
                    </span>
                    <h4 className="font-serif text-base text-noir-950 group-hover:text-gold transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                    <span className="text-xs font-semibold text-noir-900 mt-2 block">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen High-Resolution Product Image Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col justify-between bg-noir-950/95 backdrop-blur-2xl animate-fade-in text-white select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Header Bar */}
          <div 
            className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-noir-950/70 backdrop-blur-md z-30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-gold font-bold">
                Velora Gallery
              </span>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <span className="text-sm font-serif font-normal text-white truncate max-w-xs sm:max-w-md">
                {product.name}
              </span>
              <span className="text-xs text-gray-300 bg-white/10 px-2.5 py-0.5 rounded-full font-mono">
                {activeImageIdx + 1} / {product.images.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom toggle button */}
              <button
                onClick={() => setLightboxZoomed((prev) => !prev)}
                className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-all text-xs flex items-center gap-1.5 border border-white/10"
                title={lightboxZoomed ? "Reset Zoom" : "Zoom 150%"}
              >
                {lightboxZoomed ? (
                  <>
                    <ZoomOut className="w-4 h-4 text-gold" />
                    <span className="hidden sm:inline">Fit Screen</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-4 h-4 text-gold" />
                    <span className="hidden sm:inline">Zoom 150%</span>
                  </>
                )}
              </button>

              {/* Direct Open High-Res Link */}
              <a
                href={product.images[activeImageIdx] || product.images[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-all text-xs flex items-center gap-1.5 border border-white/10"
                title="Open original high-res photo in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Original</span>
              </a>

              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all flex items-center gap-1 border border-white/20 hover:scale-105"
                aria-label="Close full view"
              >
                <X className="w-4 h-4" />
                <span className="text-xs hidden sm:inline uppercase tracking-wider font-semibold">ESC</span>
              </button>
            </div>
          </div>

          {/* Central Stage with Previous / Next Navigation */}
          <div 
            className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsLightboxOpen(false);
              }
            }}
          >
            {/* Previous Arrow */}
            {product.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
                  setLightboxZoomed(false);
                }}
                className="absolute left-3 sm:left-8 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-noir-950/70 hover:bg-noir-900 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-2xl backdrop-blur-md"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Stage Image with Zoom Capability */}
            <div 
              className={`relative max-h-[82vh] max-w-[90vw] transition-transform duration-300 ease-out cursor-pointer flex items-center justify-center ${
                lightboxZoomed ? 'scale-150 overflow-auto cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxZoomed((prev) => !prev);
              }}
              title={lightboxZoomed ? "Click to reset zoom" : "Click to zoom 150%"}
            >
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="max-h-[78vh] max-w-[85vw] object-contain rounded-xl shadow-2xl select-none"
              />
            </div>

            {/* Next Arrow */}
            {product.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx((prev) => (prev + 1) % product.images.length);
                  setLightboxZoomed(false);
                }}
                className="absolute right-3 sm:right-8 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-noir-950/70 hover:bg-noir-900 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-2xl backdrop-blur-md"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {product.images.length > 1 && (
            <div 
              className="px-6 py-4 border-t border-white/10 bg-noir-950/70 backdrop-blur-md flex items-center justify-center gap-3 z-30 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setLightboxZoomed(false);
                  }}
                  className={`w-14 h-18 sm:w-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIdx === idx 
                      ? 'border-gold scale-105 shadow-luxury ring-2 ring-gold/40' 
                      : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/60'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
