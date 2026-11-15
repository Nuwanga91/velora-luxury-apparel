import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Tag, 
  X, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const FullCartPage = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    freeShippingThreshold,
    isFreeShipping,
    shippingCost,
    discountAmount,
    estimatedTax,
    cartTotal,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="bg-velora-50 min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-velora-100 flex items-center justify-center text-noir-900 mb-4 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-widest text-gold font-bold mb-1">
          Atelier Bag
        </span>
        <h2 className="font-serif text-3xl text-noir-950 font-normal mb-2">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-gray-500 max-w-sm mb-8 font-light">
          Your wardrobe awaits. Discover timeless tailoring and pure cashmere coats from our newest seasonal collections.
        </p>
        <button
          onClick={() => navigateTo('shop', 'all')}
          className="bg-noir-950 hover:bg-noir-900 text-white px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-lg transition-all"
        >
          Explore Creations
        </button>
      </div>
    );
  }

  return (
    <div className="bg-velora-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-velora-200 gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-noir-950 font-normal">
              Your Shopping Bag
            </h1>
            <p className="text-xs text-gray-500 font-light mt-1">
              Review your selected haute couture pieces before proceeding to secure checkout.
            </p>
          </div>
          <button
            onClick={() => navigateTo('shop', 'all')}
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-noir-900 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Free Shipping Alert */}
        <div className="bg-white rounded-2xl p-5 mb-8 border border-velora-200 shadow-sm">
          <div className="flex items-center justify-between text-xs mb-2 font-medium">
            <span className="flex items-center gap-2 text-noir-950">
              <Truck className="w-4 h-4 text-gold" />
              {isFreeShipping ? (
                <span className="text-emerald-800 font-bold">
                  You have unlocked Complimentary Worldwide Express Courier!
                </span>
              ) : (
                <span>
                  Add <strong className="text-noir-950">{formatPrice(amountNeeded)}</strong> more to unlock Complimentary Express Shipping.
                </span>
              )}
            </span>
            <span className="text-gray-400 font-bold">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gold h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Table (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                Items ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
              <button
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-red-600 transition-colors"
              >
                Clear Bag
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-32 object-cover rounded-xl bg-gray-100 shrink-0 cursor-pointer"
                    onClick={() => navigateTo('product', item.product.id)}
                  />

                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                      {item.product.subcategory}
                    </span>
                    <h3
                      onClick={() => navigateTo('product', item.product.id)}
                      className="font-serif text-lg font-medium text-noir-950 hover:text-gold transition-colors cursor-pointer"
                    >
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                      <span>Size: <strong className="text-noir-900">{item.selectedSize}</strong></span>
                      <span>Color: <strong className="text-noir-900">{item.selectedColor.name}</strong></span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono block">SKU: {item.product.sku}</span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-noir-900 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-noir-950">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-noir-900 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <span className="font-serif text-base font-bold text-noir-950 block">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-gray-400">
                          {formatPrice(item.price)} each
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                      title="Remove piece"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 sticky top-28">
              <h3 className="font-serif text-xl text-noir-950 font-normal pb-4 border-b border-gray-100">
                Order Breakdown
              </h3>

              {/* Promo Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-gold/15 border border-gold/40 px-3.5 py-2.5 rounded-xl text-xs text-gold-dark font-medium">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      Code <strong>{appliedCoupon.code}</strong> applied
                    </span>
                    <button onClick={removeCoupon} className="hover:text-red-500">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo Code (e.g. VELORA10)"
                      className="flex-1 bg-velora-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-noir-900 uppercase tracking-wider focus:outline-none focus:border-noir-950"
                    />
                    <button
                      type="submit"
                      className="bg-noir-950 text-white px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-noir-900 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 text-xs text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-noir-950">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>VIP Privilege Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Courier Delivery</span>
                  <span className="font-semibold text-noir-950">
                    {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Atelier Tax (8%)</span>
                  <span className="font-semibold text-noir-950">{formatPrice(estimatedTax)}</span>
                </div>

                <div className="flex justify-between text-lg font-serif font-bold text-noir-950 pt-4 border-t border-gray-200">
                  <span>Estimated Total</span>
                  <span className="text-gold-dark">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('checkout')}
                className="w-full bg-noir-950 hover:bg-noir-900 text-white py-4 rounded-xl text-xs uppercase tracking-widest font-bold shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

              <div className="text-[11px] text-gray-500 space-y-1.5 pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold shrink-0" />
                  <span>30-Day White-Glove Returns & Exchanges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
