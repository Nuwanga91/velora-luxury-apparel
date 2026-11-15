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
  Sparkles
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
        
        {/* Header & Search Bar */}
        <div className="bg-noir-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block mb-2">
            Velora Concierge Dispatch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal mb-3">
            Track Consignment Status
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-lg mb-8">
            Enter your Velora consignment reference or look up existing active deliveries below.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputTrackId}
                onChange={(e) => setInputTrackId(e.target.value)}
                placeholder="Enter Consignment ID (e.g. VEL-8821-NY)"
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-400 uppercase tracking-widest focus:outline-none focus:border-gold"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gold hover:bg-gold-light text-noir-950 px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-colors whitespace-nowrap shadow-md"
            >
              Track Status
            </button>
          </form>

          {/* Quick Demo Links */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-gray-400">
            <span>Demo Consignments:</span>
            {orders.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setInputTrackId(o.id);
                  setSearchedOrder(o);
                  setActiveTrackingId(o.id);
                }}
                className={`underline hover:text-white transition-colors ${
                  searchedOrder?.id === o.id ? 'text-gold font-bold' : ''
                }`}
              >
                {o.id} ({o.status})
              </button>
            ))}
          </div>
        </div>

        {searchedOrder && (
          <>
            {/* Live Progress Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-luxury border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4 mb-8">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">
                    Consignment Identifier
                  </span>
                  <h2 className="font-mono text-2xl font-bold text-noir-950">
                    {searchedOrder.id}
                  </h2>
                  <span className="text-xs text-gray-500 font-light mt-0.5 block">
                    Dispatched on {new Date(searchedOrder.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">
                    Current Milestone
                  </span>
                  <div className="inline-flex items-center gap-2 bg-gold/15 text-gold-dark border border-gold/40 px-3.5 py-1 rounded-full text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    <span>{searchedOrder.status}</span>
                  </div>
                  <span className="text-xs text-gray-500 block mt-1 font-light">
                    Expected Arrival: <strong className="text-noir-950 font-semibold">{searchedOrder.estimatedDelivery}</strong>
                  </span>
                </div>
              </div>

              {/* Visual Milestone Timeline */}
              <div className="py-6">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
                  <div
                    className="hidden md:block absolute top-1/2 left-0 h-1 bg-noir-950 -translate-y-1/2 z-0 transition-all duration-700"
                    style={{
                      width: `${Math.max(0, (currentStatusIndex / (steps.length - 1)) * 100)}%`
                    }}
                  />

                  {/* Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                    {steps.map((step, idx) => {
                      const isPast = idx <= currentStatusIndex;
                      const isCurrent = idx === currentStatusIndex;

                      return (
                        <div key={idx} className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-2">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                              isCurrent
                                ? 'bg-gold text-noir-950 border-gold ring-4 ring-gold/30 shadow-md font-bold'
                                : isPast
                                ? 'bg-noir-950 text-white border-noir-950'
                                : 'bg-white text-gray-400 border-gray-300'
                            }`}
                          >
                            {isPast && !isCurrent ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <span className="text-xs">{idx + 1}</span>
                            )}
                          </div>

                          <div>
                            <h4 className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-gold-dark font-extrabold' : isPast ? 'text-noir-950' : 'text-gray-400'}`}>
                              {step.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 font-light mt-0.5 max-w-[150px]">
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
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h3 className="text-xs uppercase tracking-widest font-bold text-noir-950 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" /> Consignment Movement Log
                </h3>

                <div className="space-y-3">
                  {searchedOrder.trackingHistory.map((event, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl text-xs border ${
                        event.completed
                          ? 'bg-velora-50 border-velora-200 text-noir-950'
                          : 'bg-white border-dashed border-gray-200 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-4 h-4 shrink-0 ${event.completed ? 'text-gold' : 'text-gray-300'}`} />
                        <div>
                          <span className="font-semibold block">{event.status}</span>
                          <span className="text-[11px] text-gray-500">{event.location}</span>
                        </div>
                      </div>
                      <span className="font-mono text-gray-500 mt-1 sm:mt-0 font-medium">
                        {event.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Consignment Details & Items Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Courier & Destination */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                <h3 className="font-serif text-lg text-noir-950 font-normal">
                  Courier Specifications
                </h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-wider">Carrier:</span>
                    <strong className="text-noir-950">{searchedOrder.carrier}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-wider">Service:</span>
                    <strong className="text-noir-950">{searchedOrder.shippingMethod}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-wider">Recipient:</span>
                    <strong className="text-noir-950">{searchedOrder.customer.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-wider">Destination:</span>
                    <strong className="text-noir-950 text-right">
                      {searchedOrder.customer.address}, {searchedOrder.customer.city}
                    </strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gold-dark font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Signature Required at Delivery
                  </span>
                </div>
              </div>

              {/* Enclosed Garments */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                <h3 className="font-serif text-lg text-noir-950 font-normal">
                  Enclosed Garments ({searchedOrder.items.length})
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {searchedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-16 object-cover rounded-md bg-gray-100 shrink-0"
                      />
                      <div className="flex-1 text-xs">
                        <h4 className="font-semibold text-noir-950 line-clamp-1">{item.name}</h4>
                        <p className="text-gray-500">Size: {item.size} • Color: {item.color}</p>
                        <span className="font-serif font-bold text-noir-900 block mt-0.5">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                  <span className="text-gray-500">Total Valuation:</span>
                  <span className="font-serif text-base font-bold text-noir-950">
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
