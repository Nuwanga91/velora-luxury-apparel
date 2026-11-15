import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Twitter, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo, addToast, subscribeNewsletter } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    if (subscribeNewsletter) {
      await subscribeNewsletter(email);
    }
    addToast('Welcome to the Velora Atelier Circle. Saved to Supabase. Code VELORA10 unlocked.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-noir-900 text-gray-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top VIP Atelier Newsletter Banner */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-3">
                <Sparkles className="w-4 h-4" /> The Atelier Society
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-3">
                Receive Private Invitations & First Access
              </h3>
              <p className="text-sm text-gray-400 font-light max-w-md">
                Join our discerning global clientele for bespoke capsule debuts, private runway appointments, and 10% off your inaugural commission with code <strong className="text-white">VELORA10</strong>.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="bg-white/5 border border-gold/40 p-4 rounded-xl flex items-center gap-3 text-gold">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-sm">
                    Thank you. Your personal invitation and membership welcome code have been dispatched.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your private email..."
                    className="bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold flex-1"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-light text-noir-950 px-6 py-3.5 rounded-lg text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <span>Request Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4-Column Navigation Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.25em] text-white font-medium block">
              VELORA
            </span>
            <span className="text-[10px] tracking-[0.35em] text-gold uppercase font-light block">
              Maison de Haute Couture • Firenze & Paris
            </span>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm pt-2">
              Born from Italian sartorial heritage and modern architectural minimalism. Dedicated to zero-waste virgin materials, ethical craft, and timeless quiet luxury.
            </p>
            <div className="pt-2 flex items-center space-x-4">
              <a href="#instagram" className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-noir-900 flex items-center justify-center text-gray-300 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-noir-900 flex items-center justify-center text-gray-300 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-noir-900 flex items-center justify-center text-gray-300 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-gray-400">
              <li>
                <button onClick={() => navigateTo('shop', 'women')} className="hover:text-gold transition-colors">
                  Women’s Couture
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'men')} className="hover:text-gold transition-colors">
                  Men’s Sartorial
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'new-arrivals')} className="hover:text-gold transition-colors">
                  Autumn / Winter 2026
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'accessories')} className="hover:text-gold transition-colors">
                  Leather Goods & Silk
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'all')} className="hover:text-gold transition-colors">
                  View Full Catalog
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-gray-400">
              <li>
                <button onClick={() => navigateTo('tracking')} className="hover:text-gold transition-colors">
                  Track Consignment
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-gold transition-colors">
                  Atelier Account
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-gold transition-colors">
                  Complimentary Shipping & Returns
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-gold transition-colors">
                  Bespoke Garment Care
                </span>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-gold transition-colors text-gold/80">
                  Director Back-Office
                </button>
              </li>
            </ul>
          </div>

          {/* Flagship Boutiques */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Flagship Boutiques
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span><strong>New York</strong> • 740 Fifth Avenue</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span><strong>Paris</strong> • 18 Rue du Faubourg Saint-Honoré</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span><strong>Milan</strong> • Via Montenapoleone 8</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span><strong>London</strong> • 42 New Bond Street</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Trust Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>256-bit SSL Encrypted Atelier Payment Gateway</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <span>© 2026 VELORA HAUTE COUTURE. All rights reserved.</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Atelier</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
