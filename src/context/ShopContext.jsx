import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';
import {
  supabase,
  supabaseAuth,
  supabaseProfiles,
  supabaseOrders,
  supabaseCart,
  supabaseForms,
  isSupabaseConfigured
} from '../lib/supabase';

const ShopContext = createContext();

const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
};

const INITIAL_ORDERS = [
  {
    id: 'VEL-8821-NY',
    trackingNumber: 'VEL-8821-NY',
    carrier: 'DHL Express Luxury',
    date: '2026-11-12T14:30:00Z',
    status: 'In Transit',
    estimatedDelivery: 'November 18, 2026',
    customer: {
      name: 'Eleanor Vance',
      email: 'eleanor.vance@velora-vip.com',
      phone: '+1 (212) 555-0199',
      address: '740 Park Avenue, Apt 11B',
      city: 'New York',
      state: 'NY',
      zip: '10021',
      country: 'United States'
    },
    items: [
      {
        id: 'vel-wom-002',
        name: 'Structured Blazer',
        size: 'M',
        color: 'Midnight Charcoal',
        quantity: 1,
        price: 195,
        image: 'https://images.pexels.com/photos/10916172/pexels-photo-10916172.jpeg'
      }
    ],
    shippingMethod: 'Complimentary Express',
    subtotal: 195,
    discount: 19,
    shippingCost: 0,
    tax: 14,
    total: 190,
    paymentMethod: 'Mastercard •••• 4242',
    trackingHistory: [
      { status: 'Order Confirmed', time: 'Nov 12, 02:30 PM', location: 'Atelier Velora Online', completed: true },
      { status: 'Handcrafted & Packed', time: 'Nov 13, 10:15 AM', location: 'Firenze Hub, Italy', completed: true },
      { status: 'In Transit', time: 'Nov 14, 08:45 PM', location: 'Leipzig European Cargo Hub', completed: true },
      { status: 'Out for Delivery', time: 'Pending', location: 'New York JFK Depot', completed: false },
      { status: 'Delivered', time: 'Pending', location: '740 Park Avenue', completed: false }
    ]
  },
  {
    id: 'VEL-7419-LN',
    trackingNumber: 'VEL-7419-LN',
    carrier: 'FedEx Priority Maison',
    date: '2026-11-04T09:12:00Z',
    status: 'Delivered',
    estimatedDelivery: 'November 08, 2026',
    customer: {
      name: 'Julian Sterling',
      email: 'julian@sterling-holding.co.uk',
      phone: '+44 20 7946 0912',
      address: '14 Mayfair Square',
      city: 'London',
      state: 'Greater London',
      zip: 'W1J 8AJ',
      country: 'United Kingdom'
    },
    items: [
      {
        id: 'vel-wom-007',
        name: 'Wool Blend Wrap Coat',
        size: 'M',
        color: 'Camel Tan',
        quantity: 1,
        price: 260,
        image: 'https://images.pexels.com/photos/19169191/pexels-photo-19169191.jpeg'
      },
      {
        id: 'vel-wom-011',
        name: 'Leather Handbag',
        size: 'One Size',
        color: 'Cognac Saddle',
        quantity: 1,
        price: 320,
        image: 'https://images.pexels.com/photos/32888397/pexels-photo-32888397.jpeg'
      }
    ],
    shippingMethod: 'White-Glove Courier',
    subtotal: 580,
    discount: 0,
    shippingCost: 25,
    tax: 46,
    total: 651,
    paymentMethod: 'Apple Pay (Amex)',
    trackingHistory: [
      { status: 'Order Confirmed', time: 'Nov 04, 09:12 AM', location: 'Atelier Velora Online', completed: true },
      { status: 'Handcrafted & Packed', time: 'Nov 05, 11:00 AM', location: 'Firenze Atelier, Italy', completed: true },
      { status: 'In Transit', time: 'Nov 06, 04:30 PM', location: 'Paris Charles de Gaulle Hub', completed: true },
      { status: 'Out for Delivery', time: 'Nov 08, 08:20 AM', location: 'London Mayfair Courier Van', completed: true },
      { status: 'Delivered', time: 'Nov 08, 01:15 PM', location: 'Delivered to Concierge, Mayfair', completed: true }
    ]
  }
];

export const ShopProvider = ({ children }) => {
  // Navigation / Views
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTrackingId, setActiveTrackingId] = useState('VEL-8821-NY');

  // Currency
  const [currency, setCurrency] = useState('USD');

  // Products
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('velora_products_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          Array.isArray(parsed) && 
          parsed.length >= 27 && 
          parsed.some(p => p.id === 'vel-wom-012') &&
          parsed.some(p => p.id?.startsWith('vel-men'))
        ) {
          return parsed;
        }
      }
      localStorage.removeItem('velora_products');
      localStorage.removeItem('velora_products_v2');
      localStorage.removeItem('velora_products_v3');
      localStorage.removeItem('velora_products_v4');
      localStorage.removeItem('velora_products_v5');
      localStorage.removeItem('velora_products_v6');
      localStorage.setItem('velora_products_v7', JSON.stringify(initialProducts));
    } catch (e) {}
    return initialProducts;
  });

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('velora_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('velora_wishlist_v5');
    return saved ? JSON.parse(saved) : ['vel-wom-002', 'vel-wom-007'];
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('velora_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // User
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('velora_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-vip-01',
      name: 'Eleanor Vance',
      email: 'eleanor.vance@velora-vip.com',
      role: 'customer',
      tier: 'Velora Atelier Club Member',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      phone: '+1 (212) 555-0199',
      address: '740 Park Avenue, Apt 11B',
      city: 'New York',
      state: 'NY',
      zip: '10021',
      country: 'United States'
    };
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Persist storage
  useEffect(() => {
    localStorage.setItem('velora_products_v6', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('velora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('velora_wishlist_v5', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('velora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('velora_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('velora_user');
    }
  }, [user]);

  // Synchronize active Supabase user session & cloud cart on load
  const loadSupabaseUserData = async (authUser) => {
    if (!authUser) return;
    try {
      // 1. Fetch Profile
      const { profile } = await supabaseProfiles.getProfile(authUser.id);
      const meta = authUser.user_metadata || {};
      
      const loadedUser = {
        id: authUser.id,
        name: profile?.full_name || meta.full_name || meta.name || authUser.email.split('@')[0],
        email: authUser.email,
        role: profile?.role || meta.role || 'customer',
        tier: profile?.tier || meta.tier || 'Velora Atelier Club Member',
        avatar: profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        phone: profile?.phone || meta.phone || '',
        address: profile?.address || meta.address || '',
        city: profile?.city || meta.city || '',
        state: profile?.state || meta.state || '',
        zip: profile?.zip || meta.zip || '',
        country: profile?.country || meta.country || 'United States'
      };

      setUser(loadedUser);

      // 2. Fetch User Orders from Supabase
      const { orders: remoteOrders } = await supabaseOrders.getUserOrders(authUser.id, authUser.email);
      if (remoteOrders && remoteOrders.length > 0) {
        setOrders(remoteOrders);
      }

      // 3. Fetch User Cloud Cart
      const { items: cloudCartItems } = await supabaseCart.getUserCart(authUser.id);
      if (cloudCartItems && cloudCartItems.length > 0) {
        // Reconstruct cart items matching products
        const reconstructed = cloudCartItems.map((ci) => {
          const matchedProd = products.find((p) => p.id === ci.product_id) || {
            id: ci.product_id,
            name: ci.product_name,
            price: Number(ci.price),
            images: [ci.product_image]
          };
          return {
            id: `${ci.product_id}-${ci.selected_size}-${ci.selected_color?.name || 'std'}`,
            product: matchedProd,
            selectedSize: ci.selected_size,
            selectedColor: ci.selected_color,
            quantity: ci.quantity,
            price: Number(ci.price)
          };
        });
        setCart(reconstructed);
      }
    } catch (err) {
      console.warn('Error loading Supabase user data:', err.message);
    }
  };

  // Initial Supabase Session Check & Listener
  useEffect(() => {
    supabaseAuth.getSession().then(({ session }) => {
      if (session?.user) {
        loadSupabaseUserData(session.user);
      }
    });

    const { data: authListener } = supabaseAuth.onAuthStateChange(async (event, session) => {
      if (session?.user && event === 'SIGNED_IN') {
        loadSupabaseUserData(session.user);
      } else if (event === 'SIGNED_OUT') {
        // clear Supabase-specific state
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Synchronize cart to Supabase cloud whenever cart changes and user has a real Supabase UUID
  useEffect(() => {
    if (user?.id && !user.id.startsWith('usr-')) {
      supabaseCart.syncCart(user.id, cart);
    }
  }, [cart, user?.id]);

  // Toast Helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Price Formatter
  const formatPrice = (usdAmount) => {
    if (usdAmount === null || usdAmount === undefined) return '';
    const config = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = Math.round(usdAmount * config.rate);
    return `${config.symbol}${converted.toLocaleString()}`;
  };

  // Navigation Helper
  const navigateTo = (page, param = null) => {
    if (page === 'product' && param) {
      setSelectedProductId(param);
    }
    if (page === 'shop' && param) {
      setSelectedCategory(param);
    }
    if (page === 'tracking' && param) {
      setActiveTrackingId(param);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Management
  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    const colorObj = typeof selectedColor === 'object' ? selectedColor : (product.colors?.[0] || { name: 'Standard' });
    const sizeStr = selectedSize || product.sizes?.[0] || 'Standard';

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === sizeStr && item.selectedColor.name === colorObj.name
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: `${product.id}-${sizeStr}-${colorObj.name}`,
            product,
            selectedSize: sizeStr,
            selectedColor: colorObj,
            quantity,
            price: product.price
          }
        ];
      }
    });

    addToast(`Added "${product.name}" (${sizeStr}) to your bag.`, 'success');
  };

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
    addToast('Item removed from your shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 250;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || appliedCoupon?.freeShipping;
  const shippingCost = cart.length === 0 ? 0 : isFreeShipping ? 0 : 25;
  const discountAmount = appliedCoupon ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100) : 0;
  const estimatedTax = Math.round((cartSubtotal - discountAmount) * 0.08);
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost + estimatedTax);

  // Coupon handling
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'VELORA10') {
      setAppliedCoupon({ code: 'VELORA10', discountPercent: 10, freeShipping: false, description: '10% VIP Atelier Courtesy' });
      addToast('VIP code VELORA10 applied: 10% Off.', 'success');
      return true;
    } else if (cleanCode === 'VIP20') {
      setAppliedCoupon({ code: 'VIP20', discountPercent: 20, freeShipping: false, description: '20% Exclusive Haute Couture Member' });
      addToast('Code VIP20 applied: 20% Off.', 'success');
      return true;
    } else if (cleanCode === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', discountPercent: 0, freeShipping: true, description: 'Complimentary Worldwide Express' });
      addToast('Code FREESHIP applied: Free Express Shipping.', 'success');
      return true;
    } else {
      addToast('Invalid promotion code. Try "VELORA10" or "FREESHIP".', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon code removed.', 'info');
  };

  // Wishlist Management
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from your saved items.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to your private wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  // Auth Management (Supabase-first with demo bypass)
  const login = async (email, password, role = 'customer') => {
    setIsAuthLoading(true);
    try {
      // 1. Attempt real Supabase sign-in
      const { user: authUser, error } = await supabaseAuth.signIn({ email, password });

      if (!error && authUser) {
        await loadSupabaseUserData(authUser);
        addToast(`Welcome back! Signed in securely via Supabase.`, 'success');
        navigateTo('account');
        return { success: true };
      }

      // 2. Demo Instant Logins Support
      if (email === 'director@velora-couture.com' || role === 'admin') {
        const adminUser = {
          id: 'usr-admin-01',
          name: 'Alexandre Laurent',
          email: email || 'director@velora-couture.com',
          role: 'admin',
          tier: 'Maison Managing Director',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
        };
        setUser(adminUser);
        addToast('Signed in to Maison Velora Back-Office as Managing Director (Demo).', 'success');
        navigateTo('admin');
        return { success: true };
      }

      if (email === 'eleanor.vance@velora-vip.com') {
        const customerUser = {
          id: 'usr-vip-01',
          name: 'Eleanor Vance',
          email: 'eleanor.vance@velora-vip.com',
          role: 'customer',
          tier: 'Velora Atelier Club Member',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          phone: '+1 (212) 555-0199',
          address: '740 Park Avenue, Apt 11B',
          city: 'New York',
          state: 'NY',
          zip: '10021',
          country: 'United States'
        };
        setUser(customerUser);
        addToast('Welcome back, Eleanor (Instant VIP Demo).', 'success');
        navigateTo('account');
        return { success: true };
      }

      // If failed and not demo
      addToast(error?.message || 'Authentication failed. Please verify your credentials.', 'error');
      return { success: false, error };
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = async () => {
    setIsAuthLoading(true);
    try {
      await supabaseAuth.signOut();
    } catch (e) {}
    setUser(null);
    setCart([]);
    setIsAuthLoading(false);
    addToast('You have signed out of your Velora account.', 'info');
    navigateTo('home');
  };

  const register = async (data) => {
    setIsAuthLoading(true);
    try {
      // 1. Attempt Supabase sign up
      const { user: newUser, error } = await supabaseAuth.signUp({
        email: data.email,
        password: data.password || 'VeloraPass2026!',
        fullName: data.name,
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zip: data.zip || '',
        country: data.country || 'United States'
      });

      if (error) {
        addToast(error.message, 'error');
        return { success: false, error };
      }

      const createdUser = {
        id: newUser ? newUser.id : 'usr-' + Date.now(),
        name: data.name,
        email: data.email,
        role: 'customer',
        tier: 'Velora Atelier Club Member',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zip: data.zip || '',
        country: data.country || 'United States'
      };

      setUser(createdUser);
      addToast('Profile created in Supabase! Welcome to Velora Atelier Society.', 'success');
      navigateTo('account');
      return { success: true, user: createdUser };
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Update Profile details in Supabase
  const updateUserProfile = async (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);

    if (user.id && !user.id.startsWith('usr-')) {
      await supabaseProfiles.updateProfile(user.id, {
        full_name: updates.name || user.name,
        phone: updates.phone ?? user.phone,
        address: updates.address ?? user.address,
        city: updates.city ?? user.city,
        state: updates.state ?? user.state,
        zip: updates.zip ?? user.zip,
        country: updates.country ?? user.country
      });
    }

    addToast('Atelier profile updated in Supabase.', 'success');
  };

  // Checkout & Place Order (Stored in Supabase)
  const placeOrder = (checkoutData) => {
    const orderNum = `VEL-${Math.floor(1000 + Math.random() * 9000)}-${checkoutData.country === 'United Kingdom' ? 'LN' : 'NY'}`;
    const newOrder = {
      id: orderNum,
      userId: user?.id && !user.id.startsWith('usr-') ? user.id : null,
      trackingNumber: orderNum,
      carrier: checkoutData.shippingMethod === 'express' ? 'FedEx Priority Maison' : 'DHL Express Luxury',
      date: new Date().toISOString(),
      status: 'Order Confirmed',
      estimatedDelivery: 'November 22, 2026',
      customer: {
        name: `${checkoutData.firstName} ${checkoutData.lastName}`,
        email: checkoutData.email,
        phone: checkoutData.phone,
        address: checkoutData.address,
        city: checkoutData.city,
        state: checkoutData.state,
        zip: checkoutData.zip,
        country: checkoutData.country
      },
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        size: item.selectedSize,
        color: item.selectedColor.name,
        quantity: item.quantity,
        price: item.price,
        image: item.product.images[0]
      })),
      shippingMethod: checkoutData.shippingMethod === 'express' ? 'Priority Express 1-2 Days' : 'Complimentary Standard 3-5 Days',
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingCost: shippingCost,
      tax: estimatedTax,
      total: cartTotal,
      paymentMethod: checkoutData.paymentMethod === 'card' 
        ? `Visa •••• ${checkoutData.cardNumber?.slice(-4) || '8832'}` 
        : checkoutData.paymentMethod === 'paypal' ? 'PayPal Express' : 'Apple Pay',
      trackingHistory: [
        { status: 'Order Confirmed', time: 'Just Now', location: 'Atelier Velora Online', completed: true },
        { status: 'Handcrafted & Packed', time: 'Pending', location: 'Florence Atelier, Italy', completed: false },
        { status: 'In Transit', time: 'Pending', location: 'Regional Distribution Center', completed: false },
        { status: 'Out for Delivery', time: 'Pending', location: `${checkoutData.city} Hub`, completed: false },
        { status: 'Delivered', time: 'Pending', location: checkoutData.address, completed: false }
      ]
    };

    // 1. Local update
    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);

    // 2. Persist to Supabase Orders & Order Items
    supabaseOrders.createOrder(newOrder, newOrder.items).then(({ error }) => {
      if (error) {
        console.warn('Note: Supabase orders table sync:', error.message);
      } else {
        console.log('Order successfully synced to Supabase:', newOrder.id);
      }
    });

    // 3. Clear cloud cart in Supabase
    if (user?.id && !user.id.startsWith('usr-')) {
      supabaseCart.clearCart(user.id);
    }

    clearCart();
    setAppliedCoupon(null);
    setActiveTrackingId(orderNum);
    navigateTo('confirmation');
    return newOrder;
  };

  // Admin Order Management
  const updateOrderStatus = (orderId, newStatus) => {
    let updatedHistory = null;

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        
        const historyOrder = ['Order Confirmed', 'Handcrafted & Packed', 'In Transit', 'Out for Delivery', 'Delivered'];
        const targetIndex = historyOrder.indexOf(newStatus);

        updatedHistory = order.trackingHistory.map((step, idx) => {
          const stepIndex = historyOrder.indexOf(step.status);
          const isCompleted = stepIndex <= targetIndex;
          return {
            ...step,
            completed: isCompleted,
            time: isCompleted && step.time === 'Pending' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : step.time
          };
        });

        return {
          ...order,
          status: newStatus,
          trackingHistory: updatedHistory
        };
      })
    );

    // Sync status update to Supabase
    supabaseOrders.updateOrderStatus(orderId, newStatus, updatedHistory);

    addToast(`Order ${orderId} updated to: ${newStatus}`, 'success');
  };

  // Admin Product Management
  const addProduct = (newProductData) => {
    const id = `vel-${newProductData.category[0]}-${Date.now().toString().slice(-4)}`;
    const product = {
      ...newProductData,
      id,
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      sku: `VEL-${newProductData.category.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-3)}`
    };
    setProducts((prev) => [product, ...prev]);
    addToast(`Product "${product.name}" added to catalog.`, 'success');
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    addToast('Product removed from catalog.', 'info');
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    addToast('Product details updated.', 'success');
  };

  // Website Forms / Newsletter
  const subscribeNewsletter = async (email) => {
    return await supabaseForms.subscribeNewsletter(email);
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        activeTrackingId,
        setActiveTrackingId,
        currency,
        setCurrency,
        currencies: CURRENCIES,
        formatPrice,
        products,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartItemCount,
        freeShippingThreshold,
        isFreeShipping,
        shippingCost,
        discountAmount,
        estimatedTax,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        user,
        login,
        logout,
        register,
        updateUserProfile,
        isAuthLoading,
        supabaseConnected: isSupabaseConfigured(),
        orders,
        placeOrder,
        latestOrder,
        updateOrderStatus,
        addProduct,
        deleteProduct,
        updateProduct,
        subscribeNewsletter,
        navigateTo,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        sizeGuideOpen,
        setSizeGuideOpen,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
