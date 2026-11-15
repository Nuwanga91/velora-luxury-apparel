import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Tag, 
  Sparkles 
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingThreshold,
    isFreeShipping,
    shippingCost,
    discountAmount,
    cartTotal,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-noir-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-in-right">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-noir-900" />
              <h2 className="font-serif text-xl font-medium text-noir-950">
                Your Shopping Bag
              </h2>
              <span className="text-xs bg-velora-100 text-noir-800 px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-noir-900 transition-colors rounded-full hover:bg-gray-100"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3.5 bg-velora-50 border-b border-velora-200">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-noir-900">
                <Truck className="w-4 h-4 text-gold" />
                {isFreeShipping ? (
                  <span className="text-emerald-800 font-semibold">
                    You've unlocked Complimentary Worldwide Express!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-noir-950">{formatPrice(amountNeededForFreeShipping)}</strong> for Free Express
                  </span>
                )}
              </span>
              <span className="text-gray-500 font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gold h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-velora-100 flex items-center justify-center text-velora-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-noir-900 font-normal mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6 font-light">
                  Explore our curated Autumn / Winter couture pieces crafted from fine cashmere and silks.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop', 'new-arrivals');
                  }}
                  className="bg-noir-900 text-white px-6 py-3 rounded-lg text-xs uppercase tracking-widest font-semibold hover:bg-noir-800 transition-colors shadow-md"
                >
                  Discover New Arrivals
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-26 object-cover rounded-lg bg-gray-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-noir-900 leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                        <span>Size: <strong className="text-noir-800">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-noir-800">{item.selectedColor.name}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-xs text-gray-600 hover:text-noir-900"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-noir-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs text-gray-600 hover:text-noir-900"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-serif font-medium text-noir-950">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {cart.length > 0 && (
            <div className="p-6 bg-velora-50 border-t border-gray-200 space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-gold/15 border border-gold/40 px-3 py-2 rounded-lg text-xs text-gold-dark font-medium">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.description})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-gray-500 hover:text-red-500 ml-2"
                      title="Remove coupon"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo Code (e.g. VELORA10)"
                      className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-noir-900 placeholder-gray-400 uppercase tracking-wider focus:outline-none focus:border-noir-900"
                    />
                    <button
                      type="submit"
                      className="bg-noir-900 text-white px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-noir-800 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-noir-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Atelier VIP Courtesy</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Delivery</span>
                  <span className="font-medium text-noir-900">
                    {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-serif font-semibold text-noir-950 pt-2 border-t border-gray-200">
                  <span>Estimated Total</span>
                  <span className="text-base">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-noir-900 hover:bg-noir-800 text-white py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>Encrypted Atelier Checkout & 30-Day Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
