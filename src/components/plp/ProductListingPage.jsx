import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  Grid3X3, 
  LayoutGrid, 
  ChevronDown, 
  Star, 
  Heart, 
  Eye, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

export const ProductListingPage = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    setQuickViewProduct,
    navigateTo
  } = useShop();

  // Filters State
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [priceRange, setPriceRange] = useState(1500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high, rating, newest
  const [gridCols, setGridCols] = useState(3); // 2, 3, or 4

  // Extract unique colors & sizes
  const allColors = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.colors?.forEach((c) => set.add(c.name)));
    return Array.from(set);
  }, [products]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory === 'women' && p.category !== 'women' && !p.tags?.includes('Women')) return false;
        if (selectedCategory === 'accessories' && p.category !== 'accessories' && !p.tags?.includes('Accessories') && p.subcategory !== 'Bags & Leather') return false;
        if (selectedCategory === 'men' && p.category !== 'men' && !p.tags?.includes('Men')) return false;
        if (selectedCategory === 'new-arrivals' && !p.isNewArrival) return false;

        // Color filter
        if (selectedColor !== 'all') {
          const hasColor = p.colors?.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
          if (!hasColor) return false;
        }

        // Size filter
        if (selectedSize !== 'all') {
          const hasSize = p.sizes?.includes(selectedSize);
          if (!hasSize) return false;
        }

        // Price filter
        if (p.price > priceRange) return false;

        // In-Stock only
        if (inStockOnly && (!p.inStock || p.stockCount <= 0)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // featured
      });
  }, [products, selectedCategory, selectedColor, selectedSize, priceRange, inStockOnly, sortBy]);

  const clearAllFilters = () => {
    setSelectedColor('all');
    setSelectedSize('all');
    setPriceRange(1500);
    setInStockOnly(false);
  };

  const hasActiveFilters = selectedColor !== 'all' || selectedSize !== 'all' || priceRange < 1500 || inStockOnly;

  // Category Title & Description Helper
  const getCategoryInfo = () => {
    switch (selectedCategory) {
      case 'women':
        return {
          title: 'Women’s Haute Couture & Tailoring',
          desc: '11 exquisite creations from our runway: architectural blazers, wool-blend wrap coats, liquid velvet slip gowns, pleated midi skirts, and Italian calfskin handbags.'
        };
      case 'new-arrivals':
        return {
          title: 'New Arrivals A/W 2026',
          desc: 'Freshly unveiled creations from our Florence and Paris ateliers. Limited production quantities and rare seasonal silhouettes.'
        };
      case 'accessories':
        return {
          title: 'Artisanal Leather Goods',
          desc: 'Full-grain vegetable-tanned calfskin handbags engineered with minimalist architecture and brushed brass hardware.'
        };
      case 'men':
        return {
          title: 'Men’s Sartorial & Essential Collection',
          desc: '15 signature heavyweight combed tees, athletic cuts, and modern streetwear basics engineered with luxury craftsmanship.'
        };
      default:
        return {
          title: 'The Velora Collection',
          desc: 'Explore the complete archive of contemporary luxury apparel, outerwear, dresses, knitwear, and artisanal accessories (26 pieces).'
        };
    }
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="bg-velora-50 min-h-screen pb-24">
      
      {/* Category Banner */}
      <div className="bg-noir-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-velora-300 mb-4">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-gold capitalize">{selectedCategory.replace('-', ' ')}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight mb-3">
              {categoryInfo.title}
            </h1>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              {categoryInfo.desc}
            </p>
          </div>

          {/* Quick Category Tabs */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Catalog (26)' },
              { id: 'women', label: 'Women (11)' },
              { id: 'men', label: 'Men (15)' },
              { id: 'new-arrivals', label: 'New Arrivals' },
              { id: 'accessories', label: 'Accessories' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-gold text-noir-950 font-bold shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Top Control Bar: Total Count, Mobile Filter Trigger, Sort, Grid View */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-velora-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-noir-900 text-white px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-gold inline-block" />
              )}
            </button>

            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              Showing <strong className="text-noir-950">{filteredProducts.length}</strong> creations
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 uppercase tracking-wider hidden sm:inline-block">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 text-noir-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-noir-900 font-medium"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Grid Layout Switcher */}
            <div className="hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setGridCols(2)}
                className={`p-2 transition-colors ${gridCols === 2 ? 'bg-noir-900 text-white' : 'text-gray-500 hover:text-noir-900'}`}
                title="2-column grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 transition-colors ${gridCols === 3 ? 'bg-noir-900 text-white' : 'text-gray-500 hover:text-noir-900'}`}
                title="3-column grid"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 py-4">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Active:</span>
            {selectedColor !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs text-noir-900 font-medium">
                Color: {selectedColor}
                <button onClick={() => setSelectedColor('all')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSize !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs text-noir-900 font-medium">
                Size: {selectedSize}
                <button onClick={() => setSelectedSize('all')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceRange < 1500 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs text-noir-900 font-medium">
                Under {formatPrice(priceRange)}
                <button onClick={() => setPriceRange(1500)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs text-noir-900 font-medium">
                In Stock Only
                <button onClick={() => setInStockOnly(false)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-red-600 hover:underline uppercase tracking-wider font-semibold ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block space-y-8 pr-4">
            
            {/* Color Swatches */}
            <div className="border-b border-velora-200 pb-6">
              <h4 className="text-xs uppercase tracking-widest font-bold text-noir-900 mb-3">
                Color Palette
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedColor('all')}
                  className={`px-3 py-1 text-xs rounded-full border transition-all ${
                    selectedColor === 'all'
                      ? 'bg-noir-900 text-white border-noir-900 font-semibold'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  All Colors
                </button>
                {allColors.map((colorName) => (
                  <button
                    key={colorName}
                    onClick={() => setSelectedColor(colorName)}
                    className={`px-3 py-1 text-xs rounded-full border transition-all ${
                      selectedColor === colorName
                        ? 'bg-noir-900 text-white border-noir-900 font-semibold'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {colorName}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="border-b border-velora-200 pb-6">
              <h4 className="text-xs uppercase tracking-widest font-bold text-noir-900 mb-3">
                Garment Size
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`py-2 text-xs uppercase font-medium rounded border transition-all ${
                    selectedSize === 'all'
                      ? 'bg-noir-900 text-white border-noir-900 font-semibold'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  All
                </button>
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs uppercase font-medium rounded border transition-all ${
                      selectedSize === size
                        ? 'bg-noir-900 text-white border-noir-900 font-semibold'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="border-b border-velora-200 pb-6">
              <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold text-noir-900 mb-2">
                <span>Maximum Price</span>
                <span className="text-gold font-serif text-sm font-semibold">
                  {formatPrice(priceRange)}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="1500"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-noir-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>{formatPrice(200)}</span>
                <span>{formatPrice(1500)}+</span>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-noir-900">
                In Atelier Stock Only
              </span>
              <button
                type="button"
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  inStockOnly ? 'bg-noir-900' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    inStockOnly ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <h3 className="font-serif text-2xl text-noir-900 font-normal mb-2">
                  No creations match your current filters
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Try adjusting your color, size, or price parameters to discover available pieces.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-noir-900 text-white px-6 py-3 rounded-lg text-xs uppercase tracking-widest font-semibold hover:bg-noir-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridCols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  const discountPercent = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : null;

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image Frame */}
                      <div
                        className="relative aspect-[3/4] bg-velora-100 overflow-hidden cursor-pointer"
                        onClick={() => navigateTo('product', product.id)}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        />
                        <img
                          src={product.images[1] || product.images[0]}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
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

                        {/* Hover Overlay Controls */}
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

                      {/* Info */}
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
                            className="font-serif text-base font-normal text-noir-950 hover:text-gold transition-colors cursor-pointer line-clamp-1 mb-1"
                          >
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 font-light line-clamp-1 mb-3">
                            {product.subtitle}
                          </p>
                        </div>

                        {/* Price & Colors */}
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
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-noir-950/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between z-50 animate-slide-in-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="font-serif text-xl font-medium text-noir-950">
                  Filter Catalog
                </span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-gray-400 hover:text-noir-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-6 overflow-y-auto max-h-[70vh]">
                {/* Max Price */}
                <div>
                  <div className="flex justify-between items-center text-xs uppercase font-bold text-noir-900 mb-2">
                    <span>Max Price</span>
                    <span className="text-gold font-serif">{formatPrice(priceRange)}</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="1500"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-noir-900"
                  />
                </div>

                {/* Colors */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-noir-900 mb-2">Color</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSelectedColor('all')}
                      className={`px-2.5 py-1 text-xs rounded-full border ${selectedColor === 'all' ? 'bg-noir-900 text-white' : 'bg-gray-100 text-gray-800'}`}
                    >
                      All
                    </button>
                    {allColors.slice(0, 6).map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-2.5 py-1 text-xs rounded-full border ${selectedColor === c ? 'bg-noir-900 text-white' : 'bg-gray-100 text-gray-800'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-noir-900 mb-2">Size</h4>
                  <div className="grid grid-cols-3 gap-1.5">
                    {allSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-1.5 text-xs rounded border ${selectedSize === s ? 'bg-noir-900 text-white' : 'bg-gray-100 text-gray-800'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-noir-900 text-white py-3 rounded-lg text-xs uppercase tracking-widest font-bold"
              >
                Apply & View ({filteredProducts.length}) Pieces
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full py-2 text-xs text-gray-500 hover:text-noir-900 uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
