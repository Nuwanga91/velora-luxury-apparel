import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  LogOut, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Edit2,
  CheckCircle2,
  Database,
  Loader2,
  X
} from 'lucide-react';

export const AccountPage = () => {
  const {
    user,
    login,
    logout,
    register,
    updateUserProfile,
    isAuthLoading,
    supabaseConnected,
    orders,
    wishlist,
    toggleWishlist,
    products,
    formatPrice,
    addToCart,
    navigateTo,
    addToast
  } = useShop();

  const [activeTab, setActiveTab] = useState('orders'); // orders, wishlist, addresses, privileges

  // Login / Register Form State
  const [authMode, setAuthMode] = useState('login'); // login or register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('United States');

  // Edit Profile / Address Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  });

  const handleOpenEditModal = () => {
    if (user) {
      setEditFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zip: user.zip || '',
        country: user.country || 'United States'
      });
      setIsEditModalOpen(true);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateUserProfile(editFormData);
    setIsEditModalOpen(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email address', 'error');
      return;
    }
    await login(email, password, 'customer');
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast('Please fill in required fields (Name, Email, Password)', 'error');
      return;
    }
    if (password.length < 6) {
      addToast('Password must be at least 6 characters for Supabase Auth', 'error');
      return;
    }
    await register({
      name,
      email,
      password,
      phone,
      address,
      city,
      state,
      zip,
      country
    });
  };

  // Filter wishlisted products
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  // If NOT logged in: Show Luxury Auth Portal with Supabase Backend Integration
  if (!user) {
    return (
      <div className="bg-velora-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          
          {/* Brand header */}
          <div className="text-center mb-6">
            <span className="font-serif text-3xl tracking-[0.25em] text-noir-950 font-medium block">
              VELORA
            </span>
            <span className="text-[10px] tracking-[0.35em] text-gold uppercase font-semibold">
              Maison de Haute Couture
            </span>
          </div>

          {/* Supabase Live Cloud Status Badge */}
          <div className="bg-noir-900 text-white rounded-xl p-3 mb-6 flex items-center justify-between border border-white/10 shadow-sm text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-gray-200">Supabase Cloud Backend:</span>
              <strong className="text-gold font-medium">jbxhauwahewvfoklgxjg</strong>
            </div>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-emerald-300 font-semibold">
              Auth & DB Live
            </span>
          </div>

          {/* Quick Demo Logins Banner */}
          <div className="bg-white rounded-2xl p-5 border border-gold/40 shadow-sm mb-6">
            <span className="text-xs uppercase tracking-wider font-bold text-noir-950 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-gold" /> One-Click Instant VIP Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => login('eleanor.vance@velora-vip.com', 'password', 'customer')}
                className="bg-noir-900 hover:bg-noir-800 text-white p-2.5 rounded-lg text-xs font-semibold text-center transition-colors"
              >
                VIP Client (Eleanor)
              </button>
              <button
                type="button"
                onClick={() => login('director@velora-couture.com', 'password', 'admin')}
                className="bg-gold hover:bg-gold-light text-noir-950 p-2.5 rounded-lg text-xs font-bold text-center transition-colors"
              >
                Managing Director
              </button>
            </div>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl p-8 shadow-luxury border border-gray-100">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 mb-6">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 pb-3 text-xs uppercase tracking-widest font-bold transition-colors ${
                  authMode === 'login'
                    ? 'border-b-2 border-noir-950 text-noir-950'
                    : 'text-gray-400 hover:text-noir-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`flex-1 pb-3 text-xs uppercase tracking-widest font-bold transition-colors ${
                  authMode === 'register'
                    ? 'border-b-2 border-noir-950 text-noir-950'
                    : 'text-gray-400 hover:text-noir-900'
                }`}
              >
                Create Account
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor.vance@velora-vip.com"
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full bg-noir-950 hover:bg-noir-900 text-white py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {isAuthLoading && <Loader2 className="w-4 h-4 animate-spin text-gold" />}
                  <span>Sign In via Supabase</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lady Jacqueline Rossi"
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jacqueline@couture.com"
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Create Password * (min 6 characters)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                    required
                  />
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold block mb-2">
                    Shipping & Atelier Profile
                  </span>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number (e.g. +1 212 555 0199)"
                        className="w-full bg-velora-50 border border-gray-300 rounded-lg p-2.5 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street Address (e.g. 740 Park Avenue, Apt 11B)"
                        className="w-full bg-velora-50 border border-gray-300 rounded-lg p-2.5 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City (e.g. New York)"
                        className="w-full bg-velora-50 border border-gray-300 rounded-lg p-2.5 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                      />
                      <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="ZIP / Postal Code"
                        className="w-full bg-velora-50 border border-gray-300 rounded-lg p-2.5 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full bg-gold hover:bg-gold-light text-noir-950 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {isAuthLoading && <Loader2 className="w-4 h-4 animate-spin text-noir-950" />}
                  <span>Join Atelier Society & Save in Supabase</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // IF LOGGED IN: Luxury Account Dashboard
  return (
    <div className="bg-velora-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Profile Header Banner */}
        <div className="bg-noir-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gold shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {user.name}
                </h1>
                <span className="text-[10px] bg-gold text-noir-950 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  VIP
                </span>
              </div>
              <p className="text-xs text-gold font-medium mt-1">{user.tier}</p>
              <p className="text-xs text-gray-400 font-light mt-0.5">{user.email}</p>
              
              {/* Cloud Sync Status */}
              <div className="flex items-center gap-2 mt-2 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Supabase Cloud Synchronized</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenEditModal}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5 text-gold" />
              <span>Edit Profile</span>
            </button>
            {user.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className="bg-gold hover:bg-gold-light text-noir-950 px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-colors shadow"
              >
                Access Back-Office
              </button>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-2 border border-white/20 hover:border-white text-gray-300 hover:text-white px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-velora-200 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'orders', label: `Order History (${orders.length})`, icon: Package },
            { id: 'wishlist', label: `Saved Wishlist (${wishlist.length})`, icon: Heart },
            { id: 'addresses', label: 'Shipping Addresses', icon: MapPin },
            { id: 'privileges', label: 'VIP Privileges', icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-noir-950 text-white shadow-md'
                    : 'text-gray-600 hover:text-noir-950 hover:bg-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders (Stored in Supabase) */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-serif text-xl text-noir-950 font-normal mb-1">
                  No commissions on record
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Explore our Autumn / Winter collection and place your inaugural commission.
                </p>
                <button
                  onClick={() => navigateTo('shop', 'all')}
                  className="bg-noir-950 text-white px-6 py-2.5 rounded-lg text-xs uppercase tracking-widest font-bold"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-luxury transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3 mb-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-bold text-noir-950">
                          {order.id}
                        </span>
                        <span className="text-[10px] bg-gold/15 text-gold-dark border border-gold/30 px-2.5 py-0.5 rounded-full font-bold">
                          {order.status}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-light block mt-0.5">
                        Placed on {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg font-bold text-noir-950">
                        {formatPrice(order.total)}
                      </span>
                      <button
                        onClick={() => navigateTo('tracking', order.id)}
                        className="bg-noir-950 hover:bg-noir-900 text-white px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <span>Track Live</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gold" />
                      </button>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-velora-50 p-3 rounded-xl border border-velora-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-18 object-cover rounded-lg bg-gray-100 shrink-0"
                        />
                        <div className="overflow-hidden text-xs">
                          <h4 className="font-semibold text-noir-950 truncate">{item.name}</h4>
                          <span className="text-gray-500 block">Size: {item.size} • Color: {item.color}</span>
                          <span className="font-serif font-bold text-noir-900 mt-1 block">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-serif text-xl text-noir-950 font-normal mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Save pieces by clicking the heart icon on any collection item.
                </p>
                <button
                  onClick={() => navigateTo('shop', 'all')}
                  className="bg-noir-950 text-white px-6 py-2.5 rounded-lg text-xs uppercase tracking-widest font-bold"
                >
                  Discover Pieces
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-luxury transition-all flex flex-col justify-between"
                  >
                    <div className="aspect-[3/4] bg-velora-100 relative cursor-pointer" onClick={() => navigateTo('product', product.id)}>
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shadow"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">{product.subcategory}</span>
                        <h4 className="font-serif text-base font-normal text-noir-950 line-clamp-1 mb-1">{product.name}</h4>
                        <span className="font-serif font-bold text-noir-950 block">{formatPrice(product.price)}</span>
                      </div>
                      <button
                        onClick={() => addToCart(product, product.sizes[0], product.colors[0], 1)}
                        className="w-full mt-4 bg-noir-950 hover:bg-noir-900 text-white py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Shipping Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative">
              <span className="text-[10px] bg-noir-900 text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider inline-block mb-3">
                Primary Residence (Supabase Profile)
              </span>
              <h4 className="font-serif text-lg text-noir-950 font-normal mb-1">
                {user.name}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light mb-4">
                {user.address || 'No street address specified'}<br />
                {user.city && `${user.city}, `}{user.state} {user.zip}<br />
                {user.country}
              </p>
              <div className="text-xs text-gray-500 space-y-0.5 mb-4">
                <p>Phone: {user.phone || 'Not provided'}</p>
                <p>Delivery Notes: Direct white-glove courier delivery.</p>
              </div>
              <button
                type="button"
                onClick={handleOpenEditModal}
                className="text-xs text-gold-dark hover:underline font-semibold flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Residence Details
              </button>
            </div>

            <div 
              onClick={handleOpenEditModal}
              className="bg-velora-50 rounded-2xl p-6 border border-dashed border-gray-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-velora-100/50 transition-colors"
            >
              <MapPin className="w-8 h-8 text-gray-400 mb-2" />
              <h4 className="font-serif text-base text-noir-950 font-normal mb-1">
                Update Atelier Address
              </h4>
              <p className="text-xs text-gray-500 mb-4 font-light">
                Synchronize new shipping destination directly with Supabase.
              </p>
              <button
                type="button"
                className="bg-white border border-gray-300 text-noir-950 px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold hover:border-noir-900 transition-colors"
              >
                Edit Address
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: VIP Privileges */}
        {activeTab === 'privileges' && (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                Membership Tier
              </span>
              <h3 className="font-serif text-2xl text-noir-950 font-normal">
                Velora Haute Couture Atelier Society
              </h3>
              <p className="text-xs text-gray-500 font-light mt-1">
                Your bespoke status provides premier access across our flagships in New York, Paris, London, and Milan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
              <div className="space-y-1">
                <h4 className="text-xs uppercase font-bold text-noir-950">Private Appointments</h4>
                <p className="text-xs text-gray-500 font-light">
                  Complimentary 1-on-1 champagne styling sessions at any boutique.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs uppercase font-bold text-noir-950">Runway Pre-Orders</h4>
                <p className="text-xs text-gray-500 font-light">
                  Reserve limited seasonal capsules 48 hours before public release.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs uppercase font-bold text-noir-950">Atelier Garment Care</h4>
                <p className="text-xs text-gray-500 font-light">
                  Annual complimentary cashmere de-pilling and silk revitalization.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-noir-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-noir-900"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
              Supabase Profile Sync
            </span>
            <h3 className="font-serif text-2xl text-noir-950 mb-4">
              Edit Atelier Account Details
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={editFormData.city}
                    onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    value={editFormData.state}
                    onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Postal / ZIP Code
                  </label>
                  <input
                    type="text"
                    value={editFormData.zip}
                    onChange={(e) => setEditFormData({ ...editFormData, zip: e.target.value })}
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={editFormData.country}
                    onChange={(e) => setEditFormData({ ...editFormData, country: e.target.value })}
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-noir-950 hover:bg-noir-900 text-white px-6 py-2.5 rounded-lg text-xs uppercase tracking-widest font-bold shadow-md"
                >
                  Save to Supabase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
