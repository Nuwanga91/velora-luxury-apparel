import React from 'react';
import { Truck, RotateCcw, Package, Award } from 'lucide-react';

export const ValueProps = () => {
  const perks = [
    {
      icon: Truck,
      title: 'Complimentary Express Courier',
      desc: 'Dispatched via DHL & FedEx Express worldwide on orders over $250.'
    },
    {
      icon: RotateCcw,
      title: '30-Day White-Glove Returns',
      desc: 'Seamless prepaid concierge return pickups from your residence.'
    },
    {
      icon: Package,
      title: 'Bespoke Archival Packaging',
      desc: 'Delivered in rigid debossed garment boxes with wax-sealed ribbon.'
    },
    {
      icon: Award,
      title: 'OEKO-TEX & GOTS Certified',
      desc: '100% natural, unadulterated Italian silks, wools, and organic cotton.'
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-velora-100 flex items-center justify-center text-noir-900 shrink-0">
                  <Icon className="w-5 h-5 text-gold-dark" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-noir-950 mb-1">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
