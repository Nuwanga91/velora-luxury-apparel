# VELORA — Haute Couture & Contemporary Women's Apparel

> An end-to-end, ultra-stylish eCommerce experience built for **Velora**, featuring the official collection of tailored blazers, wool wrap coats, velvet slip dresses, pleated midi skirts, and handcrafted leather goods.

![Velora Banner](https://images.pexels.com/photos/36730602/pexels-photo-36730602.jpeg)

---

## 🌟 Executive Summary & Key Highlights

Velora blends modern European haute couture aesthetics with high-conversion eCommerce engineering. The platform is designed with an understated "quiet luxury" visual language, editorial typography, and thoughtful customer journeys.

### 💎 Featured Brand Universes & Pages
1. **Modern Homepage**:
   - **Haute Couture Hero Banner**: High-impact editorial photography, collection badges, and direct CTAs.
   - **Curated Category Grid**: Tailored entry points for *Women’s Couture*, *Men’s Sartorial*, *New Arrivals A/W 26*, and *Artisan Leather & Silk*.
   - **Coveted Icons / Bestsellers**: Tabbed carousels with hover secondary image swaps, quick-add size selector, and stock scarcity badges.
   - **Interactive "Shop The Look" Runway Lookbook**: Clickable glowing hotspots that reveal shoppable piece popovers directly on model imagery.
   - **The Velora Ethos Teaser**: Editorial story montage highlighting Tuscan craftsmanship and natural fibers.
   - **Luxury Value Guarantees**: Free worldwide express over $250, 30-day white-glove returns, archival wax-sealed packaging.
   - **Press Accolades & Verified Reviews**: Quotations from *Vogue*, *GQ*, *Harper’s Bazaar*, and verified customer reviews.
   - **Social Atelier**: Curated `@veloraofficial` Instagram feed with shoppable overlays.
   - **VIP Atelier Society**: Newsletter subscription with immediate 10% coupon reward.

2. **The Brand Story (`BrandStoryPage`)**:
   - Complete history of Maison Velora (Florence & Paris ateliers).
   - Founders' Manifesto by Elena Rossi on *intentional permanence*.
   - The Four Pillars of Sustainable Craft (100% Virgin Natural Fibers, Architectural Half-Canvas, Living Artisan Wages, Carbon-Neutral Courier).
   - Historical Timeline (2018–2026).
   - Flagship salons directory (New York, Paris, Milan, London).

3. **Product Listing Page (`ProductListingPage`)**:
   - Multi-category routing (All, Women, Men, New Arrivals, Accessories).
   - Left filter sidebar: Color swatches, Size selector (XS–XXL), Price range slider ($200–$1500), In-stock only toggle.
   - Sort dropdown: Featured, Newest, Price Low-High, Price High-Low, Highest Rated.
   - Layout switcher: 2-column and 3-column responsive grid view.
   - Active filter badges with one-click clear.
   - Quick View modal & Quick Add to bag.

4. **Product Detail Page (`ProductDetailPage`)**:
   - Multi-angle high-resolution image gallery with thumbnail switcher.
   - Color variant swatches synced to image perspectives.
   - Size selector with interactive **Size Guide Modal** (with cm/inches converter and international conversion table for US, UK, EU, IT).
   - Scarcity indicator ("Only X pieces remaining in atelier").
   - Primary **Add to Bag** button (triggers slide-out drawer) + **Instant Buy Now** express checkout.
   - Real-time estimated delivery date calculator.
   - Tabbed accordions for *Architectural Details & Fit*, *Materials & Provenance*, *Garment Care & Longevity*.
   - Verified Customer Reviews section with average rating breakdown and interactive **"Write a Review"** submission form.
   - "Harmonious Pairings / Related Pieces" recommendations.

5. **Cart System (Slide-Out Drawer + Full Cart Page)**:
   - Dynamic **Free Worldwide Express Delivery** meter with real-time percentage progress.
   - Item quantity steppers and quick removal.
   - Real-time promo code engine:
     - `VELORA10` — 10% VIP Courtesy Discount
     - `VIP20` — 20% Haute Couture Member Courtesy
     - `FREESHIP` — Complimentary Worldwide Express
   - Comprehensive price breakdown: Subtotal, Discount, Shipping, Estimated Tax, and Final Total.

6. **Checkout Experience (`CheckoutPage`)**:
   - Customer Contact & Shipping Address form.
   - **1-Click Auto-Fill Demo Button**: Instantly fills sample VIP customer data and test card numbers.
   - Delivery Courier Selection: Complimentary Standard (3-5 days), Priority Maison Express (1-2 days), White-Glove Hand Delivery ($60).
   - Integrated Payment Options:
     - Live Credit/Debit Card input with visual card brand recognition.
     - PayPal Express simulation.
     - Apple Pay / Google Pay biometric simulation.
   - Festive Confetti celebration on completion.

7. **Consignment Tracking (`OrderTracking`)**:
   - Search by Order Number (e.g., `VEL-8821-NY`, `VEL-7419-LN`).
   - 5-Stage Animated Milestone Timeline: *Order Confirmed* → *Handcrafted & Packed* → *In Transit* → *Out for Delivery* → *Delivered*.
   - Real-time movement history log with timestamps and locations.
   - Courier carrier specifications (DHL Express Luxury / FedEx Priority Maison).
   - Enclosed garments inspection preview.

8. **User Account System (`AccountPage`)**:
   - One-click demo sign-in buttons for VIP Client (`Eleanor Vance`) and Managing Director (`Alexandre Laurent`).
   - Order history with live tracking links.
   - Private saved wishlist with 1-click transfer to shopping bag.
   - Primary residence and secondary delivery address book.
   - VIP Atelier Society membership benefits preview.

9. **Back-Office Admin Dashboard (`AdminDashboard`)**:
   - Executive KPIs: Gross Revenue, Total Orders, Average Order Value (AOV), and Low Stock Alerts.
   - **Live Order Management**: Change order status (*Order Confirmed* → *Handcrafted* → *In Transit* → *Delivered*), which **immediately updates the client's live consignment tracking page**.
   - **Product Catalog Management**: View full inventory, stock levels, add new garments via modal form, and delete items.

10. **SEO & High-Performance Engineering**:
    - Preloaded Google Fonts: Playfair Display + Plus Jakarta Sans.
    - Full OpenGraph & Twitter Cards meta tags.
    - JSON-LD Structured Schema (`@type: FashionStore`) with address, coordinates, and opening hours.
    - Client-side persistence via `localStorage` for cart, wishlist, orders, and customized products.

---

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 with custom luxury color extensions (`velora-50`–`velora-950`, `gold`, `noir`)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

---

## 🚀 How to Run the Application

### 1. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Production Build
```bash
npm run build
npm run preview
```

---

## 🔑 Demo Credentials & Helpful Shortcuts

| Role | Email | Password | Quick Action |
|---|---|---|---|
| **VIP Client** | `eleanor.vance@velora-vip.com` | `password` | Click **"VIP Client (Eleanor)"** on login |
| **Director / Admin** | `director@velora-couture.com` | `password` | Click **"Back-Office"** in top bar |

### Active Promo Codes
- `VELORA10` : 10% Off Entire Order
- `VIP20` : 20% Off Entire Order
- `FREESHIP` : Free Worldwide Express Delivery
