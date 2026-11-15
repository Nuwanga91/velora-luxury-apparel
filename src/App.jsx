import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Toast } from './components/common/Toast';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { FullCartPage } from './components/cart/FullCartPage';

// Pages & Sections
import { HeroBanner } from './components/home/HeroBanner';
import { CategoryShowcase } from './components/home/CategoryShowcase';
import { BestsellersCarousel } from './components/home/BestsellersCarousel';
import { LookbookSection } from './components/home/LookbookSection';
import { BrandStoryTeaser } from './components/home/BrandStoryTeaser';
import { ValueProps } from './components/home/ValueProps';
import { CustomerReviews } from './components/home/CustomerReviews';
import { InstagramGrid } from './components/home/InstagramGrid';

import { ProductListingPage } from './components/plp/ProductListingPage';
import { ProductDetailPage } from './components/pdp/ProductDetailPage';
import { BrandStoryPage } from './components/story/BrandStoryPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderConfirmation } from './components/order/OrderConfirmation';
import { OrderTracking } from './components/order/OrderTracking';
import { AccountPage } from './components/account/AccountPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout = () => {
  const { currentPage } = useShop();

  // If in Admin back-office view, render dashboard cleanly
  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-noir-950">
        <Toast />
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-velora-50 text-noir-900 font-sans">
      <Toast />
      <Navbar />
      <QuickViewModal />
      <SizeGuideModal />
      <CartDrawer />

      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <HeroBanner />
            <CategoryShowcase />
            <BestsellersCarousel />
            <LookbookSection />
            <BrandStoryTeaser />
            <ValueProps />
            <CustomerReviews />
            <InstagramGrid />
          </>
        )}

        {currentPage === 'shop' && <ProductListingPage />}
        {currentPage === 'product' && <ProductDetailPage />}
        {currentPage === 'story' && <BrandStoryPage />}
        {currentPage === 'cart' && <FullCartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'confirmation' && <OrderConfirmation />}
        {currentPage === 'tracking' && <OrderTracking />}
        {currentPage === 'account' && <AccountPage />}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
