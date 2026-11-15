import { createClient } from '@supabase/supabase-js';

// Configuration from Vite Environment or Direct Fallbacks
const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jbxhauwahewvfoklgxjg.supabase.co';
// Sanitize URL in case user supplied rest/v1 suffix
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_9_2vuUepdOKXIlwOW9bDaA_wsMJuqZy';

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && !supabaseAnonKey.includes('placeholder'));
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// ==========================================
// AUTHENTICATION HELPERS
// ==========================================

export const supabaseAuth = {
  // Sign Up new user & initialize profile
  signUp: async ({ email, password, fullName, phone, address, city, state, zip, country }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || '',
            address: address || '',
            city: city || '',
            state: state || '',
            zip: zip || '',
            country: country || 'United States',
            tier: 'Velora Atelier Club Member',
            role: 'customer'
          }
        }
      });

      if (error) throw error;

      // Ensure profile row exists in public.profiles table
      if (data?.user) {
        await supabaseProfiles.upsertProfile({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
          phone: phone || '',
          address: address || '',
          city: city || '',
          state: state || '',
          zip: zip || '',
          country: country || 'United States',
          tier: 'Velora Atelier Club Member',
          role: 'customer'
        }).catch((err) => {
          console.warn('Initial profile upsert warning (trigger may have handled):', err.message);
        });
      }

      return { user: data.user, session: data.session, error: null };
    } catch (err) {
      console.error('Supabase Sign Up Error:', err);
      return { user: null, session: null, error: err };
    }
  },

  // Sign In with email & password
  signIn: async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { user: data.user, session: data.session, error: null };
    } catch (err) {
      console.error('Supabase Sign In Error:', err);
      return { user: null, session: null, error: err };
    }
  },

  // Sign Out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (err) {
      console.error('Supabase Sign Out Error:', err);
      return { error: err };
    }
  },

  // Get current active session
  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { session: data.session, error: null };
    } catch (err) {
      return { session: null, error: err };
    }
  },

  // Listen to auth state transitions
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// ==========================================
// USER PROFILE HELPERS
// ==========================================

export const supabaseProfiles = {
  // Fetch user profile
  getProfile: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { profile: data, error: null };
    } catch (err) {
      return { profile: null, error: err };
    }
  },

  // Update profile details
  updateProfile: async (userId, updates) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { profile: data, error: null };
    } catch (err) {
      console.error('Supabase Profile Update Error:', err);
      return { profile: null, error: err };
    }
  },

  // Upsert profile
  upsertProfile: async (profileData) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' })
        .select()
        .single();

      if (error) throw error;
      return { profile: data, error: null };
    } catch (err) {
      return { profile: null, error: err };
    }
  }
};

// ==========================================
// ORDERS & CHECKOUT HELPERS
// ==========================================

export const supabaseOrders = {
  // Place an order (Insert into orders and order_items)
  createOrder: async (orderData, items) => {
    try {
      // 1. Insert Order
      const { data: orderResult, error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderData.id,
          user_id: orderData.userId || null,
          tracking_number: orderData.trackingNumber,
          carrier: orderData.carrier || 'DHL Express Luxury',
          status: orderData.status || 'Order Confirmed',
          estimated_delivery: orderData.estimatedDelivery || 'In 3-5 Business Days',
          customer_name: orderData.customer.name,
          customer_email: orderData.customer.email,
          customer_phone: orderData.customer.phone || '',
          shipping_address: orderData.customer.address,
          shipping_city: orderData.customer.city,
          shipping_state: orderData.customer.state || '',
          shipping_zip: orderData.customer.zip || '',
          shipping_country: orderData.customer.country,
          shipping_method: orderData.shippingMethod,
          subtotal: orderData.subtotal,
          discount: orderData.discount || 0,
          shipping_cost: orderData.shippingCost || 0,
          tax: orderData.tax || 0,
          total: orderData.total,
          payment_method: orderData.paymentMethod,
          tracking_history: orderData.trackingHistory || []
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Insert Order Items
      if (items && items.length > 0) {
        const orderItemsRows = items.map((item) => ({
          order_id: orderData.id,
          product_id: item.id || item.product_id,
          product_name: item.name || item.product_name,
          product_image: item.image || item.product_image || '',
          size: item.size || 'Standard',
          color: typeof item.color === 'string' ? item.color : (item.color?.name || 'Standard'),
          quantity: item.quantity,
          unit_price: item.price || item.unit_price,
          total_price: (item.price || item.unit_price) * item.quantity
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItemsRows);

        if (itemsError) throw itemsError;
      }

      return { order: orderResult, error: null };
    } catch (err) {
      console.error('Supabase Order Creation Error:', err);
      return { order: null, error: err };
    }
  },

  // Fetch orders for a user
  getUserOrders: async (userId, userEmail) => {
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.or(`user_id.eq.${userId},customer_email.eq.${userEmail}`);
      } else if (userEmail) {
        query = query.eq('customer_email', userEmail);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Format for frontend ShopContext
      const formatted = (data || []).map((o) => ({
        id: o.id,
        trackingNumber: o.tracking_number,
        carrier: o.carrier,
        date: o.created_at,
        status: o.status,
        estimatedDelivery: o.estimated_delivery,
        customer: {
          name: o.customer_name,
          email: o.customer_email,
          phone: o.customer_phone,
          address: o.shipping_address,
          city: o.shipping_city,
          state: o.shipping_state,
          zip: o.shipping_zip,
          country: o.shipping_country
        },
        items: (o.order_items || []).map((oi) => ({
          id: oi.product_id,
          name: oi.product_name,
          size: oi.size,
          color: oi.color,
          quantity: oi.quantity,
          price: Number(oi.unit_price),
          image: oi.product_image
        })),
        shippingMethod: o.shipping_method,
        subtotal: Number(o.subtotal),
        discount: Number(o.discount),
        shippingCost: Number(o.shipping_cost),
        tax: Number(o.tax),
        total: Number(o.total),
        paymentMethod: o.payment_method,
        trackingHistory: o.tracking_history || []
      }));

      return { orders: formatted, error: null };
    } catch (err) {
      console.error('Supabase Fetch User Orders Error:', err);
      return { orders: [], error: err };
    }
  },

  // Fetch all orders (Admin only)
  getAllOrders: async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formatted = (data || []).map((o) => ({
        id: o.id,
        trackingNumber: o.tracking_number,
        carrier: o.carrier,
        date: o.created_at,
        status: o.status,
        estimatedDelivery: o.estimated_delivery,
        customer: {
          name: o.customer_name,
          email: o.customer_email,
          phone: o.customer_phone,
          address: o.shipping_address,
          city: o.shipping_city,
          state: o.shipping_state,
          zip: o.shipping_zip,
          country: o.shipping_country
        },
        items: (o.order_items || []).map((oi) => ({
          id: oi.product_id,
          name: oi.product_name,
          size: oi.size,
          color: oi.color,
          quantity: oi.quantity,
          price: Number(oi.unit_price),
          image: oi.product_image
        })),
        shippingMethod: o.shipping_method,
        subtotal: Number(o.subtotal),
        discount: Number(o.discount),
        shippingCost: Number(o.shipping_cost),
        tax: Number(o.tax),
        total: Number(o.total),
        paymentMethod: o.payment_method,
        trackingHistory: o.tracking_history || []
      }));

      return { orders: formatted, error: null };
    } catch (err) {
      console.error('Supabase Fetch All Orders Error:', err);
      return { orders: [], error: err };
    }
  },

  // Update order status (Admin)
  updateOrderStatus: async (orderId, newStatus, newHistory) => {
    try {
      const updates = {
        status: newStatus,
        updated_at: new Date().toISOString()
      };
      if (newHistory) {
        updates.tracking_history = newHistory;
      }

      const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return { order: data, error: null };
    } catch (err) {
      console.error('Supabase Update Order Status Error:', err);
      return { order: null, error: err };
    }
  }
};

// ==========================================
// CLOUD CART SYNCHRONIZATION HELPERS
// ==========================================

export const supabaseCart = {
  // Fetch user's cart from Supabase
  getUserCart: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return { items: data || [], error: null };
    } catch (err) {
      return { items: [], error: err };
    }
  },

  // Synchronize entire cart to cloud
  syncCart: async (userId, localCartItems) => {
    try {
      // 1. Clear existing cloud cart
      await supabase.from('cart_items').delete().eq('user_id', userId);

      // 2. Insert current items if any
      if (localCartItems && localCartItems.length > 0) {
        const rows = localCartItems.map((item) => ({
          user_id: userId,
          product_id: item.product.id,
          product_name: item.product.name,
          product_image: item.product.images?.[0] || '',
          selected_size: item.selectedSize,
          selected_color: item.selectedColor,
          quantity: item.quantity,
          price: item.price
        }));

        const { error } = await supabase.from('cart_items').insert(rows);
        if (error) throw error;
      }

      return { success: true, error: null };
    } catch (err) {
      console.warn('Supabase Cart Sync Warning:', err.message);
      return { success: false, error: err };
    }
  },

  // Clear user cart from Supabase
  clearCart: async (userId) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err };
    }
  }
};

// ==========================================
// FORM DATA & SECURITY HELPERS
// ==========================================

export const supabaseForms = {
  // VIP Newsletter Subscription
  subscribeNewsletter: async (email, discountCode = 'VELORA10', source = 'footer') => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email.trim().toLowerCase(),
          discount_code: discountCode,
          source
        })
        .select()
        .single();

      if (error && error.code !== '23505') { // Ignore unique constraint duplicate
        throw error;
      }
      return { success: true, error: null };
    } catch (err) {
      console.warn('Newsletter Subscribe Warning:', err.message);
      return { success: false, error: err };
    }
  },

  // Contact & Bespoke Concierge Inquiry
  submitInquiry: async ({ name, email, phone, subject, message }) => {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .insert({
          name,
          email,
          phone: phone || '',
          subject: subject || 'General Couture Inquiry',
          message
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, error: null };
    } catch (err) {
      console.error('Contact Inquiry Submission Error:', err);
      return { success: false, error: err };
    }
  }
};
