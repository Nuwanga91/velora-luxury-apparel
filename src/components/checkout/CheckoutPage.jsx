import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Lock, 
  ArrowLeft, 
  Check, 
  Sparkles,
  ShoppingBag,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage = () => {
  const {
    cart,
    cartSubtotal,
    freeShippingThreshold,
    isFreeShipping,
    shippingCost: baseShippingCost,
    discountAmount,
    estimatedTax,
    cartTotal,
    appliedCoupon,
    formatPrice,
    placeOrder,
    navigateTo,
    user,
    addToast
  } = useShop();

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-velora-50 p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-velora-100 flex items-center justify-center text-noir-900 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl text-noir-950 font-normal mb-2">
          Your shopping bag is empty
        </h2>
        <p className="text-xs text-gray-500 max-w-sm mb-6">
          Please select your desired couture pieces before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('shop', 'all')}
          className="bg-noir-950 text-white px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  // Form State
  const [formData, setFormData] = useState({
    email: user?.email || 'eleanor.vance@velora-vip.com',
    firstName: user?.name ? user.name.split(' ')[0] : 'Eleanor',
    lastName: user?.name ? user.name.split(' ')[1] || 'Vance' : 'Vance',
    phone: user?.phone || '+1 (212) 555-0199',
    address: user?.address || '740 Park Avenue, Apt 11B',
    city: user?.city || 'New York',
    state: user?.state || 'NY',
    zip: user?.zip || '10021',
    country: user?.country || 'United States',
    shippingMethod: 'standard', // standard, express, white-glove
    paymentMethod: 'card', // card, paypal, applepay, cod
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '883',
    cardName: 'ELEANOR VANCE',
    saveInfo: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Auto-fill Demo Data helper
  const handleAutoFillDemo = () => {
    setFormData({
      email: 'eleanor.vance@velora-vip.com',
      firstName: 'Eleanor',
      lastName: 'Vance',
      phone: '+1 (212) 555-0199',
      address: '740 Park Avenue, Apt 11B',
      city: 'New York',
      state: 'NY',
      zip: '10021',
      country: 'United States',
      shippingMethod: 'express',
      paymentMethod: 'card',
      cardNumber: '4242 •••• •••• 4242',
      cardExpiry: '12/28',
      cardCvc: '883',
      cardName: 'ELEANOR VANCE',
      saveInfo: true
    });
    addToast('VIP Client credentials auto-filled.', 'info');
  };

  // Shipping cost calculator
  const calculatedShipping = () => {
    if (formData.shippingMethod === 'white-glove') return 60;
    if (formData.shippingMethod === 'express') return isFreeShipping ? 0 : 25;
    return isFreeShipping ? 0 : 15;
  };

  const currentShipping = calculatedShipping();
  const finalOrderTotal = Math.max(0, cartSubtotal - discountAmount + currentShipping + estimatedTax);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Trigger festive confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      placeOrder({
        ...formData,
        shippingCost: currentShipping,
        finalTotal: finalOrderTotal
      });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="bg-velora-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-velora-200">
          <button
            onClick={() => navigateTo('shop', 'all')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-noir-800 hover:text-gold font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Boutique</span>
          </button>

          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl tracking-[0.25em] text-noir-950 font-medium">
              VELORA
            </span>
            <span className="text-[9px] tracking-[0.3em] text-gold uppercase font-semibold">
              Secure Atelier Checkout
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">256-Bit SSL • Supabase Secure Cloud</span>
          </div>
        </div>

        {/* Demo Fast-fill banner */}
        <div className="bg-white rounded-xl p-4 mb-8 border border-gold/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-gold shrink-0" />
            <p className="text-xs text-noir-900 font-medium">
              <strong>Testing the checkout experience?</strong> Click to auto-fill sample VIP client and payment credentials with 1 click.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="bg-velora-100 hover:bg-gold hover:text-noir-950 text-noir-900 px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-bold transition-colors whitespace-nowrap"
          >
            Auto-Fill VIP Data
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Contact Information */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl text-noir-950 font-normal mb-4">
                1. Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Email Address (For Consignment Tracking & Invoices)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Phone Number (For Courier Delivery Notification)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl text-noir-950 font-normal mb-4">
                2. Shipping Address
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="740 Park Avenue, Apt 11B"
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                      State / Region
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 focus:outline-none focus:border-noir-950 font-medium"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                    <option value="Japan">Japan</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl text-noir-950 font-normal mb-4">
                3. Delivery Method
              </h3>
              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.shippingMethod === 'standard'
                      ? 'border-noir-950 bg-velora-50 ring-1 ring-noir-950'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleInputChange}
                      className="accent-noir-950"
                    />
                    <div>
                      <div className="text-xs uppercase font-bold text-noir-950">
                        Complimentary Standard Courier (3-5 Days)
                      </div>
                      <div className="text-xs text-gray-500 font-light">
                        Dispatched with signature on delivery
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-noir-950">
                    {isFreeShipping ? 'Complimentary' : formatPrice(15)}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.shippingMethod === 'express'
                      ? 'border-noir-950 bg-velora-50 ring-1 ring-noir-950'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleInputChange}
                      className="accent-noir-950"
                    />
                    <div>
                      <div className="text-xs uppercase font-bold text-noir-950">
                        Priority Maison Express (1-2 Days)
                      </div>
                      <div className="text-xs text-gray-500 font-light">
                        Guaranteed air freight via DHL Express
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-noir-950">
                    {isFreeShipping ? 'Complimentary' : formatPrice(25)}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.shippingMethod === 'white-glove'
                      ? 'border-noir-950 bg-velora-50 ring-1 ring-noir-950'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="white-glove"
                      checked={formData.shippingMethod === 'white-glove'}
                      onChange={handleInputChange}
                      className="accent-noir-950"
                    />
                    <div>
                      <div className="text-xs uppercase font-bold text-noir-950">
                        White-Glove Atelier Hand Delivery
                      </div>
                      <div className="text-xs text-gray-500 font-light">
                        Dedicated concierge hand-delivery with unboxing & hanging
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-noir-950">
                    {formatPrice(60)}
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Gateway */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl text-noir-950 font-normal">
                  4. Payment Method
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
                    Stripe Live Integrated
                  </span>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                  className={`py-3 rounded-xl border text-xs uppercase font-bold flex flex-col items-center gap-1 transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-noir-950 bg-noir-950 text-white'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'paypal' }))}
                  className={`py-3 rounded-xl border text-xs uppercase font-bold flex flex-col items-center gap-1 transition-all ${
                    formData.paymentMethod === 'paypal'
                      ? 'border-noir-950 bg-noir-950 text-white'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-serif italic font-black text-sm">PayPal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'applepay' }))}
                  className={`py-3 rounded-xl border text-xs uppercase font-bold flex flex-col items-center gap-1 transition-all ${
                    formData.paymentMethod === 'applepay'
                      ? 'border-noir-950 bg-noir-950 text-white'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>Apple Pay</span>
                </button>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-4">
                  {/* Card mockup */}
                  <div className="bg-gradient-to-r from-noir-950 via-noir-900 to-velora-950 text-white p-5 rounded-2xl shadow-xl relative overflow-hidden border border-white/10 mb-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-serif tracking-[0.2em] text-sm text-gold">VELORA PRIVILEGE</span>
                      <span className="text-xs uppercase font-bold tracking-widest text-gray-300">Mastercard</span>
                    </div>
                    <div className="font-mono text-base tracking-[0.2em] mb-4 text-gray-200">
                      {formData.cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex justify-between items-end text-[11px] text-gray-300 uppercase tracking-widest font-mono">
                      <div>
                        <span className="text-[9px] text-gray-400 block font-sans">Cardholder</span>
                        <span>{formData.cardName || 'ELEANOR VANCE'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-400 block font-sans">Expires</span>
                        <span>{formData.cardExpiry || '12/28'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 font-mono focus:outline-none focus:border-noir-950"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                        Expiry Date (MM/YY)
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="12/28"
                        className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 font-mono focus:outline-none focus:border-noir-950"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                        CVC Security Code
                      </label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="883"
                        className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 font-mono focus:outline-none focus:border-noir-950"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="ELEANOR VANCE"
                      className="w-full bg-velora-50 border border-gray-300 rounded-lg p-3 text-xs text-noir-900 uppercase focus:outline-none focus:border-noir-950"
                      required
                    />
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'paypal' && (
                <div className="p-6 bg-velora-50 rounded-xl text-center border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">
                    You will be securely routed to PayPal Express to finalize your atelier commission.
                  </p>
                  <span className="text-xs font-semibold text-noir-900">
                    PayPal Sandbox Simulator Ready
                  </span>
                </div>
              )}

              {formData.paymentMethod === 'applepay' && (
                <div className="p-6 bg-velora-50 rounded-xl text-center border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">
                    Biometric Apple Pay authentication is activated for this session.
                  </p>
                  <span className="text-xs font-semibold text-noir-900">
                    Touch ID / Face ID Simulator Ready
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 sticky top-28 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-serif text-xl text-noir-950 font-normal">
                  Order Summary
                </h3>
                <span className="text-xs bg-velora-100 text-noir-900 px-2.5 py-1 rounded-full font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded-lg bg-gray-100 shrink-0"
                    />
                    <div className="flex-1 text-xs">
                      <h4 className="font-semibold text-noir-950 line-clamp-1">{item.product.name}</h4>
                      <p className="text-gray-500 mt-0.5">
                        Qty: <strong>{item.quantity}</strong> • Size: {item.selectedSize}
                      </p>
                      <p className="text-gray-500">
                        Color: {item.selectedColor.name}
                      </p>
                      <span className="font-serif font-bold text-noir-950 mt-1 block">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-noir-950">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>VIP Code ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Courier Delivery</span>
                  <span className="font-semibold text-noir-950">
                    {currentShipping === 0 ? 'Complimentary' : formatPrice(currentShipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Atelier Tax (8%)</span>
                  <span className="font-semibold text-noir-950">{formatPrice(estimatedTax)}</span>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-noir-950 pt-3 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-lg text-gold-dark">{formatPrice(finalOrderTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-noir-950 hover:bg-noir-900 text-white py-4 rounded-xl text-xs uppercase tracking-widest font-bold shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Order with Maison...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-gold" />
                    <span>Authorize Commission • {formatPrice(finalOrderTotal)}</span>
                  </>
                )}
              </button>

              <div className="space-y-2 text-[11px] text-gray-500 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  <span>30-Day White-Glove Returns with Complimentary Pickup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold shrink-0" />
                  <span>Real-time tracking notifications via SMS and email</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
