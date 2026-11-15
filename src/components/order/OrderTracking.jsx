import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  Search, 
  Truck, 
  PackageCheck, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Phone, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const OrderTracking = () => {
  const { orders, activeTrackingId, setActiveTrackingId, formatPrice, navigateTo } = useShop();

  const [inputTrackId, setInputTrackId] = useState(activeTrackingId || 'VEL-8821-NY');
  const [searchedOrder, setSearchedOrder] = useState(() => {
    return orders.find((o) => o.id === (activeTrackingId || 'VEL-8821-NY')) || orders[0];
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find(
      (o) => o.id.toLowerCase() === inputTrackId.trim().toLowerCase()
    );
    if (found) {
      setSearchedOrder(found);
      setActiveTrackingId(found.id);
    } else {
      alert(`No consignment found with tracking number "${inputTrackId}". Available demo numbers: VEL-8821-NY, VEL-7419-LN`);
    }
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Commission received & verified by atelier' },
    { title: 'Handcrafted & Packed', desc: 'Garments steamed, folded & wax sealed' },
    { title: 'In Transit', desc: 'Dispatched via international express cargo' },
    { title: 'Out for Delivery', desc: 'On courier vehicle for final white-glove arrival' },
    { title: 'Delivered', desc: 'Received & signed at destination' },
  ];

  const currentStatusIndex = searchedOrder
    ? steps.findIndex((s) => s.title === searchedOrder.status)
    : 2;

  return (
    <div className="bg-velora-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header & High-Contrast Search Bar */}
        <div className="bg-[#08080A] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20" style={{ backgroundColor: '#08080A' }}>
          <span className="text-xs uppercase tracking-[0.25em] text-gold-light font-bold block mb-2">
            Velora Concierge Dispatch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal mb-3 text-white">
            Track Consignment Status
          </h1>
          <p className="text-sm sm:text-base text-gray-200 font-normal max-w-xl mb-8 leading-relaxed">
            Enter your Velora consignment reference or select an active delivery below to view live milestone updates.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-300 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputTrackId}
                onChange={(e) => setInputTrackId(e.target.value)}
                placeholder="Enter Consignment ID (e.g. VEL-8821-NY)"
                className="w-full bg-[#141418] border-2 border-white/30 rounded-xl pl-12 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-400 font-semibold uppercase tracking-widest focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gold hover:bg-gold-light text-noir-950 px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-extrabold transition-all whitespace-nowrap shadow-xl transform hover:-translate-y-0.5"
            >
              Track Status
            </button>
          </form>

          {/* Quick Demo Links with High-Visibility Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6 text-xs text-gray-200">
            <span className="font-semibold text-white">Active Consignments:</span>
            {orders.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setInputTrackId(o.id);
                  setSearchedOrder(o);
                  setActiveTrackingId(o.id);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  searchedOrder?.id === o.id
                    ? 'bg-gold text-noir-950 border-gold shadow-md font-bold'
                    : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white'
                }`}
              >
                {o.id} &bull; {o.status}
              </button>
            ))}
          </div>
        </div>

        {searchedOrder && (
          <>
            {/* Live Progress Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-luxury border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4 mb-8">
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-gray-700 block mb-1">
                    Consignment Identifier
                  </span>
                  <h2 className="font-mono text-2xl sm:text-3xl font-extrabold text-noir-950">
                    {searchedOrder.id}
                  </h2>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium mt-1 block">
                    Dispatched on <strong className="text-noir-950 font-bold">{new Date(searchedOrder.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                  </span>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs uppercase tracking-widest font-bold text-gray-700 block mb-1.5">
                    Current Milestone
                  </span>
                  <div className="inline-flex items-center gap-2 bg-gold/20 text-noir-950 border-2 border-gold px-4 py-1.5 rounded-full text-xs font-extrabold shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                    <span className="uppercase tracking-wider">{searchedOrder.status}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-800 block mt-2 font-medium">
                    Expected Arrival: <strong className="text-noir-950 font-extrabold">{searchedOrder.estimatedDelivery}</strong>
                  </span>
                </div>
              </div>

              {/* Visual Milestone Timeline with Enhanced Visibility */}
              <div className="py-6">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="hidden md:block absolute top-5 left-8 right-8 h-1.5 bg-gray-200 z-0" />
                  <div
                    className="hidden md:block absolute top-5 left-8 h-1.5 bg-[#08080A] z-0 transition-all duration-700"
                    style={{
                      width: `${Math.max(0, (currentStatusIndex / (steps.length - 1)) * 90)}%`
                    }}
                  />

                  {/* Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                    {steps.map((step, idx) => {
                      const isPast = idx <= currentStatusIndex;
                      const isCurrent = idx === currentStatusIndex;

                      return (
                        <div key={idx} className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-3">
                          <div
                            className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border-2 transition-all shadow-sm ${
                              isCurrent
                                ? 'bg-gold text-noir-950 border-gold ring-4 ring-gold/30 font-extrabold text-sm'
                                : isPast
                                ? 'bg-[#08080A] text-white border-[#08080A] font-bold'
                                : 'bg-gray-100 text-gray-700 border-gray-300 font-bold'
                            }`}
                          >
                            {isPast && !isCurrent ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <span className="text-xs font-extrabold">{idx + 1}</span>
                            )}
                          </div>

                          <div>
                            <h4 className={`text-xs font-extrabold uppercase tracking-wider ${
                              isCurrent 
                                ? 'text-noir-950 underline decoration-gold decoration-2 underline-offset-4' 
                                : isPast 
                                ? 'text-noir-950' 
                                : 'text-gray-700'
                            }`}>
                              {step.title}
                            </h4>
                            <p className="text-xs text-gray-700 font-medium mt-1 max-w-[160px] leading-snug">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Tracking History Log Table */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-sm uppercase tracking-widest font-extrabold text-noir-950 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-dark" /> Consignment Movement Log
                </h3>

                <div className="space-y-3">
                  {searchedOrder.trackingHistory.map((event, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl text-xs sm:text-sm border transition-colors ${
                        event.completed
                          ? 'bg-velora-100/70 border-velora-300 text-noir-950 shadow-sm'
                          : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-4 h-4 shrink-0 ${event.completed ? 'text-gold-dark' : 'text-gray-400'}`} />
                        <div>
                          <span className="font-extrabold text-noir-950 text-sm block">
                            {event.status}
                          </span>
                          <span className="text-xs text-gray-700 font-medium block mt-0.5">
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-xs sm:text-sm text-gray-800 mt-2 sm:mt-0 font-bold bg-white/80 px-2.5 py-1 rounded border border-gray-200">
                        {event.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Consignment Details & Items Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Courier & Destination Specifications */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
                <h3 className="font-serif text-xl text-noir-950 font-normal border-b border-gray-100 pb-3">
                  Courier Specifications
                </h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-xs uppercase tracking-wider font-bold text-gray-700">Carrier:</span>
                    <strong className="text-noir-950 font-bold">{searchedOrder.carrier}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-xs uppercase tracking-wider font-bold text-gray-700">Service:</span>
                    <strong className="text-noir-950 font-bold">{searchedOrder.shippingMethod}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-xs uppercase tracking-wider font-bold text-gray-700">Recipient:</span>
                    <strong className="text-noir-950 font-bold">{searchedOrder.customer.name}</strong>
                  </div>
                  <div className="flex justify-between items-start py-1">
                    <span className="text-xs uppercase tracking-wider font-bold text-gray-700 shrink-0 mr-4">Destination:</span>
                    <strong className="text-noir-950 font-bold text-right leading-relaxed">
                      {searchedOrder.customer.address}, {searchedOrder.customer.city}, {searchedOrder.customer.country}
                    </strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-noir-900 font-bold bg-gold/10 p-3 rounded-xl border border-gold/30">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold-dark" /> Verified White-Glove Consignment
                  </span>
                  <span className="text-gray-700 font-medium">Signature Required</span>
                </div>
              </div>

              {/* Enclosed Garments */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-serif text-xl text-noir-950 font-normal border-b border-gray-100 pb-3">
                  Enclosed Garments ({searchedOrder.items.length})
                </h3>
                <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                  {searchedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-velora-50 p-2.5 rounded-xl border border-velora-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-16 object-cover rounded-md bg-gray-100 shrink-0 border border-gray-200"
                      />
                      <div className="flex-1 text-xs sm:text-sm">
                        <h4 className="font-bold text-noir-950 line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-700 font-medium mt-0.5">
                          Size: <strong className="text-noir-950">{item.size}</strong> &bull; Color: <strong className="text-noir-950">{item.color}</strong> &bull; Qty: <strong className="text-noir-950">{item.quantity}</strong>
                        </p>
                        <span className="font-serif font-extrabold text-noir-950 block mt-1">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-xs uppercase tracking-wider font-bold text-gray-700">Total Valuation:</span>
                  <span className="font-serif text-lg sm:text-xl font-extrabold text-noir-950">
                    {formatPrice(searchedOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
