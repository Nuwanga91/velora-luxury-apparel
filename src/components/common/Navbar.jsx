import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Shield, 
  Truck, 
  ChevronDown,
  ArrowRight
} from 'lucide-react';

export const Navbar = () => {
  const {
    navigateTo,
    currentPage,
    selectedCategory,
    cartItemCount,
    wishlist,
    user,
    currency,
    setCurrency,
    currencies,
    setIsCartOpen,
    products
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  // Filtered search results
  const searchResults = searchTerm.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 4);

  const handleSearchSelect = (productId) => {
    setSearchModalOpen(false);
    setSearchTerm('');
    navigateTo('product', productId);
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-noir-900 text-velora-200 text-xs py-2 px-4 border-b border-white/10 tracking-widest uppercase font-light">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold font-normal">
              <Truck className="w-3.5 h-3.5" /> Complimentary Worldwide Express Over $250
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">Code: <strong className="text-white">VELORA10</strong> for 10% Off</span>
          </div>

          <div className="flex-1 sm:hidden text-center text-[11px] text-velora-100">
            Complimentary Worldwide Express • Code: <strong className="text-white">VELORA10</strong>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Quick Track Order Link */}
            <button
              onClick={() => navigateTo('tracking')}
              className="hover:text-gold transition-colors hidden md:inline-block"
            >
              Track Order
            </button>

            {/* Admin Quick Access */}
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1 text-gold/90 hover:text-gold transition-colors font-medium"
              title="Admin Back-Office"
            >
              <Shield className="w-3 h-3" /> Back-Office
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-white hover:text-gold transition-colors px-1 py-0.5"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-24 bg-noir-800 border border-white/10 rounded shadow-xl py-1 z-50 animate-fade-in"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {Object.keys(currencies).map((currKey) => (
                    <button
                      key={currKey}
                      onClick={() => {
                        setCurrency(currKey);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1 text-xs transition-colors ${
                        currency === currKey ? 'text-gold font-medium bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {currencies[currKey].label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-velora-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-noir-900 hover:text-gold transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Left Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs uppercase tracking-widest font-medium text-noir-800">
            <button
              onClick={() => navigateTo('shop', 'women')}
              className={`hover:text-gold transition-colors py-2 relative ${
                currentPage === 'shop' && selectedCategory === 'women' ? 'text-noir-950 font-bold border-b-2 border-noir-900' : ''
              }`}
            >
              Women
            </button>
            <button
              onClick={() => navigateTo('shop', 'men')}
              className={`hover:text-gold transition-colors py-2 relative ${
                currentPage === 'shop' && selectedCategory === 'men' ? 'text-noir-950 font-bold border-b-2 border-noir-900' : ''
              }`}
            >
              Men
            </button>
            <button
              onClick={() => navigateTo('shop', 'new-arrivals')}
              className={`hover:text-gold transition-colors py-2 relative flex items-center gap-1 ${
                currentPage === 'shop' && selectedCategory === 'new-arrivals' ? 'text-noir-950 font-bold border-b-2 border-noir-900' : ''
              }`}
            >
              <span>New Arrivals</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block"></span>
            </button>
            <button
              onClick={() => navigateTo('shop', 'accessories')}
              className={`hover:text-gold transition-colors py-2 relative ${
                currentPage === 'shop' && selectedCategory === 'accessories' ? 'text-noir-950 font-bold border-b-2 border-noir-900' : ''
              }`}
            >
              Accessories
            </button>
            <button
              onClick={() => navigateTo('shop', 'all')}
              className={`hover:text-gold transition-colors py-2 relative ${
                currentPage === 'shop' && selectedCategory === 'all' ? 'text-noir-950 font-bold border-b-2 border-noir-900' : ''
              }`}
            >
              All
            </button>
            <button
              onClick={() => navigateTo('story')}
              className={`hover:text-gold transition-colors py-2 relative ${
                currentPage === 'story' ? 'text-noir-950 font-bold border-b-2 border-noir-900' : ''
              }`}
            >
              Brand Story
            </button>
          </nav>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo('home')}>
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-noir-950 font-medium">
              VELORA
            </span>
            <span className="text-[9px] tracking-[0.35em] text-velora-600 uppercase font-light -mt-1">
              Haute Couture
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-noir-900">
            {/* Search Icon */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-1.5 hover:text-gold transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('account')}
              className="p-1.5 hover:text-gold transition-colors relative"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-noir-900 text-white text-[10px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Profile */}
            <button
              onClick={() => navigateTo('account')}
              className="p-1.5 hover:text-gold transition-colors hidden sm:flex items-center gap-2"
              aria-label="User account"
            >
              <User className="w-5 h-5" />
              {user && (
                <span className="text-xs uppercase tracking-wider font-medium text-noir-800 max-w-[90px] truncate hidden xl:inline-block">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 hover:text-gold transition-colors relative flex items-center gap-1.5 group"
              aria-label="Shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-gold text-noir-950 text-[10px] flex items-center justify-center font-bold shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline-block text-xs uppercase tracking-widest font-medium ml-1">
                Bag
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal Overlay */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-noir-950/70 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fade-in">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-noir-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-xs uppercase tracking-widest text-velora-600 block mb-2 font-medium">
              Explore Velora Atelier
            </span>

            <div className="relative flex items-center border-b-2 border-noir-900 pb-2 mb-6">
              <Search className="w-6 h-6 text-noir-900 mr-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search structured blazers, wrap coats, slip dresses, skirts..."
                className="w-full text-lg sm:text-xl font-serif text-noir-900 placeholder-gray-400 focus:outline-none bg-transparent"
                autoFocus
              />
            </div>

            {/* Quick Suggested Keywords */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-gray-500 uppercase tracking-wider mr-2">Trending:</span>
              {['Structured Blazer', 'Wool Blend Wrap Coat', 'Urban Edge Classic Tee', 'Alpha Fit Premium', 'Velvet Slip Dress', 'Leather Handbag'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="text-xs px-3 py-1 bg-velora-100 hover:bg-noir-900 hover:text-white rounded-full transition-colors text-noir-800"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Live Search Results */}
            {searchResults.length > 0 ? (
              <div className="space-y-3 divide-y divide-gray-100">
                <span className="text-xs text-gray-400 uppercase tracking-widest block font-medium">
                  Matching Pieces ({searchResults.length})
                </span>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSearchSelect(product.id)}
                    className="flex items-center gap-4 pt-3 cursor-pointer group hover:bg-velora-50 p-2 rounded-lg transition-colors"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-18 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-noir-900 group-hover:text-gold transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500">{product.subtitle}</p>
                      <span className="text-xs font-semibold text-noir-950 mt-1 block">
                        ${product.price}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-noir-900 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            ) : searchTerm.trim() !== '' ? (
              <p className="text-sm text-gray-500 text-center py-6">
                No matching couture creations found for "{searchTerm}".
              </p>
            ) : null}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-noir-950/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between z-50 animate-slide-in-right">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <div className="flex flex-col">
                  <span className="font-serif text-xl tracking-[0.2em] font-medium text-noir-900">
                    VELORA
                  </span>
                  <span className="text-[8px] tracking-[0.3em] text-velora-600 uppercase">
                    Haute Couture
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-gray-500 hover:text-noir-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4 text-sm uppercase tracking-widest font-medium text-noir-900">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('shop', 'women');
                  }}
                  className={`block w-full text-left py-2 hover:text-gold transition-colors ${
                    currentPage === 'shop' && selectedCategory === 'women' ? 'text-gold font-bold' : ''
                  }`}
                >
                  Women’s Collection (12 Pieces)
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('shop', 'men');
                  }}
                  className={`block w-full text-left py-2 hover:text-gold transition-colors ${
                    currentPage === 'shop' && selectedCategory === 'men' ? 'text-gold font-bold' : ''
                  }`}
                >
                  Men’s Collection (15 Pieces)
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('shop', 'new-arrivals');
                  }}
                  className="flex items-center justify-between w-full text-left py-2 hover:text-gold transition-colors"
                >
                  <span>New Arrivals</span>
                  <span className="text-[10px] bg-gold text-noir-900 px-2 py-0.5 rounded-full font-bold">A/W 26</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('shop', 'accessories');
                  }}
                  className="block w-full text-left py-2 hover:text-gold transition-colors"
                >
                  Leather Goods & Accessories
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('shop', 'all');
                  }}
                  className="block w-full text-left py-2 hover:text-gold transition-colors"
                >
                  All Creations (26 Pieces)
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('story');
                  }}
                  className="block w-full text-left py-2 hover:text-gold transition-colors"
                >
                  The Brand Story
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('tracking');
                  }}
                  className="block w-full text-left py-2 hover:text-gold transition-colors"
                >
                  Track Order
                </button>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('account');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-noir-900 text-white rounded text-xs uppercase tracking-widest font-semibold"
              >
                <User className="w-4 h-4" /> My Account
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('admin');
                }}
                className="w-full flex items-center justify-center gap-2 py-2 border border-gold text-noir-900 rounded text-xs uppercase tracking-widest font-medium"
              >
                <Shield className="w-4 h-4 text-gold" /> Admin Back-Office
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
