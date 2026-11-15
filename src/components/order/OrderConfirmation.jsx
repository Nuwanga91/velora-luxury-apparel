import React, { useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, Truck, Printer, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderConfirmation = () => {
  const { latestOrder, navigateTo, formatPrice } = useShop();

  useEffect(() => {
    // Fire confetti bursts
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 }
    });
  }, []);

  if (!latestOrder) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl text-noir-900 mb-2">No Recent Order Found</h2>
        <button
          onClick={() => navigateTo('home')}
          className="bg-noir-900 text-white px-6 py-2.5 rounded-lg text-xs uppercase tracking-widest font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-velora-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-luxury border border-gray-100 text-center relative overflow-hidden mb-8">
          <div className="w-16 h-16 rounded-full bg-gold/15 text-gold-dark flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block mb-2">
            Order Confirmed & Authorized
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-noir-950 font-normal mb-3">
            Thank You, {latestOrder.customer.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-light max-w-lg mx-auto mb-6 leading-relaxed">
            Your haute couture commission has been received by our Florence atelier. We are preparing your pieces with bespoke artisanal packaging and white-glove inspection.
          </p>

          {/* Reference Box */}
          <div className="bg-velora-50 rounded-2xl p-5 border border-velora-200 inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-12 text-left mb-8">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-medium">
                Tracking Number
              </span>
              <span className="font-mono text-base font-bold text-noir-950">
                {latestOrder.id}
              </span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-medium">
                Courier Carrier
              </span>
              <span className="text-sm font-semibold text-noir-900">
                {latestOrder.carrier}
              </span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-medium">
                Estimated Delivery
              </span>
              <span className="text-sm font-semibold text-emerald-800">
                {latestOrder.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('tracking', latestOrder.id)}
              className="w-full sm:w-auto bg-noir-950 hover:bg-noir-900 text-white px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Truck className="w-4 h-4 text-gold" />
              <span>Track Consignment Live</span>
            </button>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto border border-gray-300 hover:border-noir-900 text-noir-900 px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice Receipt</span>
            </button>
          </div>
        </div>

        {/* Detailed Breakdown Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
          <h3 className="font-serif text-xl text-noir-950 font-normal border-b border-gray-100 pb-4">
            Commission Summary
          </h3>

          <div className="space-y-4">
            {latestOrder.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded-lg bg-gray-100 shrink-0"
                />
                <div className="flex-1 text-xs">
                  <h4 className="font-semibold text-noir-950">{item.name}</h4>
                  <p className="text-gray-500 mt-1">
                    Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                  </p>
                  <span className="font-serif font-bold text-noir-900 mt-1 block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-noir-950">{formatPrice(latestOrder.subtotal)}</span>
            </div>
            {latestOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>VIP Courtesy Discount</span>
                <span>-{formatPrice(latestOrder.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Courier Delivery</span>
              <span className="font-semibold text-noir-950">
                {latestOrder.shippingCost === 0 ? 'Complimentary' : formatPrice(latestOrder.shippingCost)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Atelier Tax</span>
              <span className="font-semibold text-noir-950">{formatPrice(latestOrder.tax)}</span>
            </div>
            <div className="flex justify-between text-base font-serif font-bold text-noir-950 pt-3 border-t border-gray-200">
              <span>Total Paid</span>
              <span className="text-gold-dark">{formatPrice(latestOrder.total)}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row justify-between text-xs text-gray-500 gap-4">
            <div>
              <strong className="text-noir-950 block mb-0.5">Shipping Destination:</strong>
              <p>{latestOrder.customer.address}, {latestOrder.customer.city}, {latestOrder.customer.state} {latestOrder.customer.zip}</p>
            </div>
            <div>
              <strong className="text-noir-950 block mb-0.5">Payment Method:</strong>
              <p>{latestOrder.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
