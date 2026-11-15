export const initialProducts = [
  // ==================== WOMEN'S APPAREL (FROM SHEET 2) ====================
  {
    id: 'vel-wom-001',
    name: 'Minimalist Bodysuit',
    subtitle: 'Form-Fitting Micro-Rib Stretch • Seamless Silhouette',
    category: 'women',
    subcategory: 'Tops & Bodysuits',
    isNewArrival: true,
    isBestseller: true,
    price: 55,
    originalPrice: 75,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockCount: 16,
    sku: 'VEL-BOD-01',
    description: 'Sleek, form-fitting stretch bodysuit designed for effortless layering and a seamless silhouette. Features snap base closure and comfortable breathable micro-rib jersey.',
    material: '92% Organic Modal, 8% Elastane. OEKO-TEX Standard 100 certified.',
    care: 'Machine wash delicate cold. Hang dry or tumble low.',
    fit: 'Second-skin tailored fit. True to size.',
    colors: [
      { name: 'Onyx Noir', hex: '#161616', bgClass: 'bg-[#161616]', imageIndex: 0 },
      { name: 'Chalk Bone', hex: '#EDE8E0', bgClass: 'bg-[#EDE8E0] border border-gray-300', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/19832327/pexels-photo-19832327.jpeg'
    ],
    tags: ['Bodysuit', 'Minimalist', 'Layering', 'Essential', 'Women']
  },
  {
    id: 'vel-wom-002',
    name: 'Structured Blazer',
    subtitle: 'Single-Breasted Tailoring with Architectural Shoulders',
    category: 'women',
    subcategory: 'Jackets & Blazers',
    isNewArrival: true,
    isBestseller: true,
    price: 195,
    originalPrice: 240,
    rating: 5.0,
    reviewCount: 68,
    inStock: true,
    stockCount: 10,
    sku: 'VEL-BLZ-02',
    description: 'Tailored single-breasted blazer featuring sharp lapels and structured shoulders for modern power dressing. Fully lined with custom horn buttons and precision interior welt pockets.',
    material: '70% Fine Virgin Wool, 30% Mulberry Silk. Lining: 100% Cupro.',
    care: 'Specialist dry clean only. Steam between wears.',
    fit: 'Structured modern tailored fit. Hits at mid-hip.',
    colors: [
      { name: 'Midnight Charcoal', hex: '#26282A', bgClass: 'bg-[#26282A]', imageIndex: 0 },
      { name: 'Taupe Stone', hex: '#8C8276', bgClass: 'bg-[#8C8276]', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/10916172/pexels-photo-10916172.jpeg'
    ],
    tags: ['Blazer', 'Tailored', 'Power Dressing', 'Wool', 'Women']
  },
  {
    id: 'vel-wom-003',
    name: 'Pleated Midi Skirt',
    subtitle: 'Fluid Accordion Pleats with Easy Elastic Waistband',
    category: 'women',
    subcategory: 'Skirts',
    isNewArrival: false,
    isBestseller: true,
    price: 115,
    originalPrice: 145,
    rating: 4.8,
    reviewCount: 51,
    inStock: true,
    stockCount: 14,
    sku: 'VEL-SKT-03',
    description: 'Flowing accordion-pleated midi skirt offering elegant movement and an easy elastic waistband. Cut to catch the breeze and pair effortlessly with blazers and knits.',
    material: '100% Crepe de Chine. Permanent heat-pressed knife pleats.',
    care: 'Hand wash cold or dry clean. Hang to dry.',
    fit: 'A-line midi length. Sits at the natural waist.',
    colors: [
      { name: 'Champagne Sand', hex: '#DED3C4', bgClass: 'bg-[#DED3C4]', imageIndex: 0 },
      { name: 'Onyx Noir', hex: '#161616', bgClass: 'bg-[#161616]', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.pexels.com/photos/38830349/pexels-photo-38830349.jpeg'
    ],
    tags: ['Pleated', 'Midi Skirt', 'Elegant', 'Movement', 'Women']
  },
  {
    id: 'vel-wom-004',
    name: 'Linen Button-Down',
    subtitle: '100% Pure French Flax • Lightweight Breathable Drape',
    category: 'women',
    subcategory: 'Shirts & Blouses',
    isNewArrival: true,
    isBestseller: false,
    price: 85,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 36,
    inStock: true,
    stockCount: 18,
    sku: 'VEL-SHT-04',
    description: 'Relaxed-fit breathable linen shirt with classic collar, button cuffs, and a lightweight drape. Pre-washed for a soft lived-in texture that softens with every wear.',
    material: '100% Certified French Flax Linen. Mother-of-pearl buttons.',
    care: 'Machine wash cold delicate. Line dry and iron damp.',
    fit: 'Relaxed effortless drape. True to size.',
    colors: [
      { name: 'Ivory Flax', hex: '#FAF6EE', bgClass: 'bg-[#FAF6EE] border border-gray-300', imageIndex: 0 },
      { name: 'Sage Olive', hex: '#636958', bgClass: 'bg-[#636958]', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/7624507/pexels-photo-7624507.jpeg'
    ],
    tags: ['Linen', 'Button-Down', 'Breathable', 'Summer', 'Women']
  },
  {
    id: 'vel-wom-005',
    name: 'Knit Halter Top',
    subtitle: 'Ribbed Knit with Open-Back Architecture',
    category: 'women',
    subcategory: 'Tops & Bodysuits',
    isNewArrival: true,
    isBestseller: false,
    price: 45,
    originalPrice: 60,
    rating: 4.7,
    reviewCount: 29,
    inStock: true,
    stockCount: 15,
    sku: 'VEL-HLT-05',
    description: 'Chic sleeveless knit halter top with an open-back detail, ideal for warm-weather styling. Features a sculpted high neck and form-fitting rib knit.',
    material: '80% Viscose, 20% Fine Nylon for shape memory.',
    care: 'Hand wash cold. Dry flat on a towel.',
    fit: 'Cropped silhouette that pairs with high-waisted trousers.',
    colors: [
      { name: 'Vanilla Cream', hex: '#F7F3EB', bgClass: 'bg-[#F7F3EB] border border-gray-300', imageIndex: 0 },
      { name: 'Pitch Black', hex: '#111111', bgClass: 'bg-[#111111]', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.pexels.com/photos/17824646/pexels-photo-17824646.jpeg'
    ],
    tags: ['Halter Top', 'Knitwear', 'Open Back', 'Summer', 'Women']
  },
  {
    id: 'vel-wom-006',
    name: 'Velvet Slip Dress',
    subtitle: 'Lustrous Silk-Velvet with Flattering Bias-Cut Drape',
    category: 'women',
    subcategory: 'Dresses',
    isNewArrival: true,
    isBestseller: true,
    price: 150,
    originalPrice: 195,
    rating: 5.0,
    reviewCount: 64,
    inStock: true,
    stockCount: 8,
    sku: 'VEL-DRS-06',
    description: 'Luxurious velvet slip dress with delicate shoulder straps and a flattering bias-cut drape. Deep plush velvet captures evening light with liquid-like dimension.',
    material: '82% Rayon, 18% Mulberry Silk Velvet. Ultra-soft interior hand.',
    care: 'Dry clean only. Store on padded hanger.',
    fit: 'Fluid bias cut skimming natural body contours.',
    colors: [
      { name: 'Midnight Emerald', hex: '#162D20', bgClass: 'bg-[#162D20]', imageIndex: 0 },
      { name: 'Onyx Black', hex: '#101012', bgClass: 'bg-[#101012]', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.pexels.com/photos/20821761/pexels-photo-20821761.jpeg'
    ],
    tags: ['Velvet', 'Slip Dress', 'Evening', 'Bias Cut', 'Women']
  },
  {
    id: 'vel-wom-007',
    name: 'Wool Blend Wrap Coat',
    subtitle: 'Tailored Wrap Overcoat with Self-Tie Belt & Notched Collar',
    category: 'women',
    subcategory: 'Coats & Outerwear',
    isNewArrival: true,
    isBestseller: true,
    price: 260,
    originalPrice: 320,
    rating: 4.9,
    reviewCount: 77,
    inStock: true,
    stockCount: 7,
    sku: 'VEL-COT-07',
    description: 'Warm and refined wool-blend wrap coat featuring a tie belt and wide notched collar. Designed for effortless enveloping over eveningwear or chunky knitwear.',
    material: '80% Virgin Wool, 20% Cashmere blend. Lining: 100% Cupro.',
    care: 'Specialist dry clean only.',
    fit: 'Relaxed wrap tailoring with adjustable sash waist.',
    colors: [
      { name: 'Camel Tan', hex: '#C19A6B', bgClass: 'bg-[#C19A6B]', imageIndex: 0 },
      { name: 'Dark Melange', hex: '#2A2C30', bgClass: 'bg-[#2A2C30]', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/19169191/pexels-photo-19169191.jpeg'
    ],
    tags: ['Wrap Coat', 'Wool', 'Cashmere', 'Outerwear', 'Women']
  },
  {
    id: 'vel-wom-008',
    name: 'Satin Blouse',
    subtitle: 'Heavyweight Silk-Satin with Fluid Day-to-Night Drape',
    category: 'women',
    subcategory: 'Shirts & Blouses',
    isNewArrival: false,
    isBestseller: true,
    price: 90,
    originalPrice: 120,
    rating: 4.8,
    reviewCount: 46,
    inStock: true,
    stockCount: 15,
    sku: 'VEL-BLS-08',
    description: 'Silky lustrous blouse with buttoned cuffs and fluid drape, perfect for day-to-night transitions. Finished with delicate concealed button placket.',
    material: '100% Silk-Touch Satin Charmeuse.',
    care: 'Hand wash cold or dry clean. Cool iron on reverse.',
    fit: 'Fluid regular fit with elegant cuff gathers.',
    colors: [
      { name: 'Champagne Pearl', hex: '#F3E8D2', bgClass: 'bg-[#F3E8D2]', imageIndex: 0 },
      { name: 'Espresso Noir', hex: '#1C1A19', bgClass: 'bg-[#1C1A19]', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/34536499/pexels-photo-34536499.jpeg'
    ],
    tags: ['Satin', 'Blouse', 'Silk', 'Day to Night', 'Women']
  },
  {
    id: 'vel-wom-009',
    name: 'Crochet Summer Top',
    subtitle: 'Handcrafted Open-Knit Textured Pattern',
    category: 'women',
    subcategory: 'Tops & Bodysuits',
    isNewArrival: true,
    isBestseller: false,
    price: 75,
    originalPrice: 95,
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    stockCount: 11,
    sku: 'VEL-CRC-09',
    description: 'Handcrafted open-knit crochet sleeveless top featuring airy textured patterns for summer days. Scalloped hem and artisanal macramé stitchwork.',
    material: '100% Organic Pima Cotton Crochet.',
    care: 'Hand wash cold with gentle detergent. Reshape and dry flat.',
    fit: 'Boxy relaxed drape.',
    colors: [
      { name: 'Natural Ecru', hex: '#F1EDE2', bgClass: 'bg-[#F1EDE2] border border-gray-300', imageIndex: 0 },
      { name: 'Golden Honey', hex: '#D4AF37', bgClass: 'bg-[#D4AF37]', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.pexels.com/photos/19713990/pexels-photo-19713990.jpeg'
    ],
    tags: ['Crochet', 'Handcrafted', 'Summer', 'Artisanal', 'Women']
  },
  {
    id: 'vel-wom-010',
    name: 'Ribbed Cardigan',
    subtitle: 'Fine-Ribbed Button-Up Slender Silhouette',
    category: 'women',
    subcategory: 'Knitwear',
    isNewArrival: false,
    isBestseller: true,
    price: 110,
    originalPrice: 135,
    rating: 4.8,
    reviewCount: 58,
    inStock: true,
    stockCount: 19,
    sku: 'VEL-CRD-10',
    description: 'Cozy fine-ribbed button-up cardigan crafted with soft yarns and a slender silhouette. Mother-of-pearl button placket and flattering deep V-neckline.',
    material: '70% Extrafine Merino Wool, 30% Mulberry Silk.',
    care: 'Gentle wool cycle or hand wash cold. Lay flat to dry.',
    fit: 'Slim ribbed fit with generous stretch.',
    colors: [
      { name: 'Oatmeal Heather', hex: '#DED3C4', bgClass: 'bg-[#DED3C4]', imageIndex: 0 },
      { name: 'Noir Black', hex: '#151517', bgClass: 'bg-[#151517]', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/14696526/pexels-photo-14696526.jpeg'
    ],
    tags: ['Cardigan', 'Ribbed', 'Merino Silk', 'Knitwear', 'Women']
  },
  {
    id: 'vel-wom-011',
    name: 'Leather Handbag',
    subtitle: 'Structured Full-Grain Calfskin Everyday Shoulder Bag',
    category: 'accessories',
    subcategory: 'Bags & Leather',
    isNewArrival: true,
    isBestseller: true,
    price: 320,
    originalPrice: 380,
    rating: 5.0,
    reviewCount: 47,
    inStock: true,
    stockCount: 8,
    sku: 'VEL-BAG-11',
    description: 'Premium leather everyday shoulder bag with structured minimalist design and secure zip closure. Hand-burnished edge painted piping with brushed gold hardware.',
    material: '100% Full-Grain Italian Calfskin. Solid Brass Hardware.',
    care: 'Wipe with dry microfiber cloth. Condition with leather balm.',
    fit: 'Accommodates tablet, wallet, keys, and tech essentials with ease.',
    colors: [
      { name: 'Cognac Saddle', hex: '#8B4513', bgClass: 'bg-[#8B4513]', imageIndex: 0 },
      { name: 'Onyx Noir', hex: '#111111', bgClass: 'bg-[#111111]', imageIndex: 0 }
    ],
    sizes: ['One Size'],
    images: [
      'https://images.pexels.com/photos/32888397/pexels-photo-32888397.jpeg'
    ],
    tags: ['Leather', 'Handbag', 'Accessories', 'Italian', 'Women']
  },
  {
    id: 'vel-wom-012',
    name: 'Envogue Ladies Night Short-Baby Pink',
    subtitle: 'Soft & Breathable Lounge Shorts with Elastic Waistband',
    category: 'women',
    subcategory: 'Loungewear & Shorts',
    isNewArrival: true,
    isBestseller: true,
    price: 80,
    originalPrice: 105,
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    stockCount: 18,
    sku: 'VEL-SHT-12',
    description: 'Soft and breathable lounge shorts in baby pink, featuring an elastic waistband for relaxed nighttime comfort. Crafted from premium organic modal jersey with delicate tonal piping.',
    material: '95% Organic Micro-Modal, 5% Elastane. Ultra-soft breathable knit.',
    care: 'Machine wash delicate cold in laundry bag. Lay flat or hang to dry.',
    fit: 'Relaxed comfortable lounge fit with flexible elasticated drawstring waist.',
    colors: [
      { name: 'Baby Pink', hex: '#F8C8DC', bgClass: 'bg-[#F8C8DC]', imageIndex: 0 },
      { name: 'Chalk Bone', hex: '#EDE8E0', bgClass: 'bg-[#EDE8E0] border border-gray-300', imageIndex: 1 },
      { name: 'Soft Rose', hex: '#E8A598', bgClass: 'bg-[#E8A598]', imageIndex: 2 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/5690227/pexels-photo-5690227.jpeg',
      'https://images.pexels.com/photos/36179299/pexels-photo-36179299.jpeg',
      'https://images.pexels.com/photos/7143216/pexels-photo-7143216.jpeg'
    ],
    tags: ['Loungewear', 'Nightwear', 'Shorts', 'Baby Pink', 'Organic Modal', 'Women']
  },

  // ==================== MEN'S APPAREL (FROM SHEET 1) ====================
  {
    id: 'vel-men-001',
    name: 'Urban Edge Classic Tee',
    subtitle: '100% Ring-Spun Cotton • Heavyweight 240 GSM',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: true,
    isBestseller: true,
    price: 49,
    originalPrice: 65,
    rating: 4.9,
    reviewCount: 54,
    inStock: true,
    stockCount: 18,
    sku: 'VEL-MEN-01',
    description: 'Modern everyday T-shirt with clean fit and premium feel. Cut from custom-milled 240 GSM organic combed cotton with double-needle hems and a reinforced ribbed crew collar.',
    material: '100% Long-Staple Combed Cotton. Bio-washed for ultra-soft hand feel.',
    care: 'Machine wash cold with like colors. Hang dry or tumble low.',
    fit: 'Contemporary regular fit with clean drape through shoulders and torso.',
    colors: [
      { name: 'Onyx Noir', hex: '#161616', bgClass: 'bg-[#161616]', imageIndex: 0 },
      { name: 'Chalk White', hex: '#F5F5F3', bgClass: 'bg-[#F5F5F3] border border-gray-300', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/15779643/pexels-photo-15779643.jpeg'
    ],
    tags: ['T-Shirt', 'Classic', 'Everyday', 'Essential', 'Men']
  },
  {
    id: 'vel-men-002',
    name: 'Alpha Fit Premium T-Shirt',
    subtitle: 'Sharp Tailored Athletic Silhouette',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: true,
    isBestseller: false,
    price: 35,
    originalPrice: 48,
    rating: 4.8,
    reviewCount: 38,
    inStock: true,
    stockCount: 14,
    sku: 'VEL-MEN-02',
    description: 'Sharp tailored fit designed for confident everyday wear. Accentuates the shoulders and chest with tapered sleeves and subtle side-seam shaping.',
    material: '95% Premium Combed Cotton, 5% Elastane for structured recovery.',
    care: 'Machine wash cold inside out. Gentle cycle. Do not bleach.',
    fit: 'Athletic tailored fit. Order your standard size for a sculpted look.',
    colors: [
      { name: 'Obsidian Black', hex: '#111111', bgClass: 'bg-[#111111]', imageIndex: 0 },
      { name: 'Heather Charcoal', hex: '#2C2E35', bgClass: 'bg-[#2C2E35]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/29138677/pexels-photo-29138677.jpeg'
    ],
    tags: ['Tailored', 'Athletic', 'T-Shirt', 'Streetwear', 'Men']
  },
  {
    id: 'vel-men-003',
    name: 'Midnight Black Essential Tee',
    subtitle: 'Deep Saturated Carbon Dye Finish',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: false,
    isBestseller: true,
    price: 60,
    originalPrice: null,
    rating: 5.0,
    reviewCount: 82,
    inStock: true,
    stockCount: 25,
    sku: 'VEL-MEN-03',
    description: 'Timeless black T-shirt crafted for all-day comfort. Dyed with reactive midnight pigments that resist fading through countless washes.',
    material: '100% Pima Organic Cotton. Silky smooth 220 GSM jersey.',
    care: 'Wash dark colors separately at 30°C. Steam iron on reverse.',
    fit: 'Relaxed modern fit. Drapes effortlessly over denim and tailored trousers.',
    colors: [
      { name: 'Midnight Black', hex: '#0B0B0C', bgClass: 'bg-[#0B0B0C]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/19570744/pexels-photo-19570744.jpeg'
    ],
    tags: ['Essential', 'Minimalist', 'Black Tee', 'Pima', 'Men']
  },
  {
    id: 'vel-men-004',
    name: 'StreetCore Solid cotton Tee',
    subtitle: 'Breathable Street-Inspired Heavyweight Drop',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: true,
    isBestseller: false,
    price: 38,
    originalPrice: 50,
    rating: 4.7,
    reviewCount: 29,
    inStock: true,
    stockCount: 12,
    sku: 'VEL-MEN-04',
    description: 'Soft breathable cotton tee inspired by street style. Built with dropped shoulders and a boxy contemporary silhouette that bridges luxury and urban culture.',
    material: '100% Heavyweight Open-End Cotton.',
    care: 'Machine wash cold. Do not dry clean.',
    fit: 'Boxy streetwear cut. Sits comfortably at waist level.',
    colors: [
      { name: 'Vintage Black', hex: '#1A1A1C', bgClass: 'bg-[#1A1A1C]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/5611483/pexels-photo-5611483.jpeg'
    ],
    tags: ['StreetCore', 'Boxy', 'Drop Shoulder', 'Urban', 'Men']
  },
  {
    id: 'vel-men-005',
    name: 'IronFlex Everyday T-shirt',
    subtitle: 'Four-Way Stretch Performance Micro-Rib',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: false,
    isBestseller: true,
    price: 25,
    originalPrice: 35,
    rating: 4.9,
    reviewCount: 91,
    inStock: true,
    stockCount: 30,
    sku: 'VEL-MEN-05',
    description: 'Durable stretch fabric built for daily active lifestyle. Engineered with moisture-wicking natural fibers and shape-retaining elastic seams.',
    material: '92% Combed Cotton, 8% Spandex.',
    care: 'Cool machine wash. Quick air dry.',
    fit: 'Fitted athletic cut with maximum mobility.',
    colors: [
      { name: 'Jet Noir', hex: '#141414', bgClass: 'bg-[#141414]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/37741892/pexels-photo-37741892.jpeg'
    ],
    tags: ['Performance', 'Everyday', 'Stretch', 'Active', 'Men']
  },
  {
    id: 'vel-men-006',
    name: 'NeoMinimal Crew Neck Tee',
    subtitle: 'Mercerized Cotton with Silk-Sheen Finish',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: true,
    isBestseller: true,
    price: 68,
    originalPrice: 85,
    rating: 5.0,
    reviewCount: 43,
    inStock: true,
    stockCount: 9,
    sku: 'VEL-MEN-06',
    description: 'Minimal design crew neck tee with smooth finish. Crafted with double-mercerized Egyptian cotton for a subtle luminous sheen and frictionless skin contact.',
    material: '100% Mercerized Egyptian Cotton. Premium 200 GSM.',
    care: 'Gentle hand wash or delicate cycle. Flat dry.',
    fit: 'Clean minimalist silhouette with seamless neck binding.',
    colors: [
      { name: 'Pitch Black', hex: '#0F0F10', bgClass: 'bg-[#0F0F10]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/4729199/pexels-photo-4729199.jpeg'
    ],
    tags: ['NeoMinimal', 'Mercerized', 'Luxury', 'Minimalist', 'Men']
  },
  {
    id: 'vel-men-007',
    name: 'Boldline Comfort Fit T-Shirt',
    subtitle: 'Relaxed Oversized Contemporary Cut',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: false,
    isBestseller: true,
    price: 96,
    originalPrice: 120,
    rating: 4.8,
    reviewCount: 61,
    inStock: true,
    stockCount: 6,
    sku: 'VEL-MEN-07',
    description: 'Relaxed comfort fit tee made for effortless styling. Heavy drape construction with wide sleeves and reinforced collar bands.',
    material: '100% French Terry Lightweight Cotton (280 GSM).',
    care: 'Machine wash 30°C. Steam freshen.',
    fit: 'Relaxed oversized fit. Take your normal size for loose silhouette.',
    colors: [
      { name: 'Onyx Ash', hex: '#1E1E22', bgClass: 'bg-[#1E1E22]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/10106995/pexels-photo-10106995.jpeg'
    ],
    tags: ['Boldline', 'Comfort Fit', 'Heavyweight', 'Oversized', 'Men']
  },
  {
    id: 'vel-men-008',
    name: 'Urban Wolf Causal Tee',
    subtitle: 'Casual Everyday Tee with Urban Attitude',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: true,
    isBestseller: false,
    price: 40,
    originalPrice: 55,
    rating: 4.9,
    reviewCount: 27,
    inStock: true,
    stockCount: 15,
    sku: 'VEL-MEN-08',
    description: 'Casual wear T-Shirt with bold urban attitude. Soft garment-dyed wash gives each piece an authentic lived-in vintage character.',
    material: '100% Garment-Dyed Cotton.',
    care: 'Cold water wash inside out to preserve vintage wash tone.',
    fit: 'Regular streetwear fit.',
    colors: [
      { name: 'Mineral Black', hex: '#1D1E20', bgClass: 'bg-[#1D1E20]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/8973294/pexels-photo-8973294.jpeg'
    ],
    tags: ['Urban Wolf', 'Casual', 'Street', 'Graphic', 'Men']
  },
  {
    id: 'vel-men-009',
    name: 'PrimeWear Soft Touch T-shirt',
    subtitle: 'Velvety Peached Finish Organic Cotton',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: false,
    isBestseller: true,
    price: 50,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 76,
    inStock: true,
    stockCount: 22,
    sku: 'VEL-MEN-09',
    description: 'Ultra-soft fabric T-shirt delivering premium comfort. Micro-sanded surface provides a cashmere-like peachskin texture.',
    material: '100% Peached Organic Cotton.',
    care: 'Machine wash delicate. Tumble dry ultra low.',
    fit: 'Classic tailored cut.',
    colors: [
      { name: 'Shadow Black', hex: '#121213', bgClass: 'bg-[#121213]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/17858295/pexels-photo-17858295.jpeg'
    ],
    tags: ['Soft Touch', 'Peached', 'Comfort', 'Essential', 'Men']
  },
  {
    id: 'vel-men-010',
    name: 'Rouge Street Slim Fit Tee',
    subtitle: 'Sleek Contoured Modern Street Vibe',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: true,
    isBestseller: false,
    price: 55,
    originalPrice: 70,
    rating: 4.8,
    reviewCount: 33,
    inStock: true,
    stockCount: 11,
    sku: 'VEL-MEN-10',
    description: 'Slim fit T-shirt with edgy modern street vibe. Designed with clean side splits and high-recovery jersey.',
    material: '96% Organic Cotton, 4% Lycra.',
    care: 'Machine wash cold. Iron on medium.',
    fit: 'Slim tapered cut.',
    colors: [
      { name: 'Carbon Black', hex: '#171718', bgClass: 'bg-[#171718]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/4255642/pexels-photo-4255642.jpeg'
    ],
    tags: ['Slim Fit', 'Street Vibe', 'Contoured', 'Modern', 'Men']
  },
  {
    id: 'vel-men-011',
    name: 'Daily Hustle Cotton T-Shirt',
    subtitle: 'Resilient All-Day Studio Essential',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: true,
    isBestseller: true,
    price: 43,
    originalPrice: 58,
    rating: 4.8,
    reviewCount: 45,
    inStock: true,
    stockCount: 19,
    sku: 'VEL-MEN-11',
    description: 'Modern everyday T-shirt with clean fit and premium feel. Engineered to withstand heavy daily rotation without collar curling.',
    material: '100% Combed Compact Cotton (230 GSM).',
    care: 'Machine wash warm with like colors. Line dry.',
    fit: 'Clean regular fit.',
    colors: [
      { name: 'Onyx Black', hex: '#151516', bgClass: 'bg-[#151516]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/33115312/pexels-photo-33115312.jpeg'
    ],
    tags: ['Daily Hustle', 'Durable', 'Cotton', 'Workwear', 'Men']
  },
  {
    id: 'vel-men-012',
    name: 'MonoFlex Modern Basic Tee',
    subtitle: 'Tailored Silhouette for Confident Wear',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: false,
    isBestseller: true,
    price: 65,
    originalPrice: null,
    rating: 5.0,
    reviewCount: 68,
    inStock: true,
    stockCount: 16,
    sku: 'VEL-MEN-12',
    description: 'Sharp tailored fit designed for confident everyday wear. Flat-lock seamless stitching prevents chafing.',
    material: '100% Supima Cotton from American heritage mills.',
    care: 'Cold wash gentle cycle. Do not wring.',
    fit: 'Tailored modern fit.',
    colors: [
      { name: 'Pure Black', hex: '#0E0E0F', bgClass: 'bg-[#0E0E0F]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/31482884/pexels-photo-31482884.jpeg'
    ],
    tags: ['MonoFlex', 'Supima', 'Tailored', 'Minimalist', 'Men']
  },
  {
    id: 'vel-men-013',
    name: 'Apex Urban Lifestyle T-Shirt',
    subtitle: 'Understated Architectural Fit',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: true,
    isBestseller: false,
    price: 33,
    originalPrice: 45,
    rating: 4.7,
    reviewCount: 31,
    inStock: true,
    stockCount: 20,
    sku: 'VEL-MEN-13',
    description: 'Timeless black T-shirt crafted for all-day comfort. Lightweight, breathable, and designed with minimal seams.',
    material: '100% Breathable Fine Gauge Cotton (180 GSM).',
    care: 'Machine wash cold. Hang dry.',
    fit: 'Standard relaxed fit.',
    colors: [
      { name: 'Matte Black', hex: '#19191B', bgClass: 'bg-[#19191B]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/3399995/pexels-photo-3399995.jpeg'
    ],
    tags: ['Apex', 'Urban', 'Lifestyle', 'Lightweight', 'Men']
  },
  {
    id: 'vel-men-014',
    name: 'TrueForm Premium Causal Tee',
    subtitle: 'Street-Inspired Organic Fabric Weave',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: false,
    isBestseller: true,
    price: 49,
    originalPrice: 62,
    rating: 4.9,
    reviewCount: 52,
    inStock: true,
    stockCount: 14,
    sku: 'VEL-MEN-14',
    description: 'Soft breathable cotton tee inspired by street style. Pre-washed with silicone softening enzyme for a butter-smooth tactile experience.',
    material: '100% Organic Cotton Jersey.',
    care: 'Machine wash 30°C. Cool iron.',
    fit: 'Comfort relaxed fit.',
    colors: [
      { name: 'Onyx Night', hex: '#131314', bgClass: 'bg-[#131314]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/31918875/pexels-photo-31918875.jpeg'
    ],
    tags: ['TrueForm', 'Street Style', 'Soft', 'Essential', 'Men']
  },
  {
    id: 'vel-men-015',
    name: 'RawStreet Classic Crew Tee',
    subtitle: 'Heavy-Duty Stretch Daily Armor',
    category: 'men',
    subcategory: 'T-Shirts & Tops',
    isNewArrival: true,
    isBestseller: false,
    price: 51,
    originalPrice: 68,
    rating: 4.8,
    reviewCount: 39,
    inStock: true,
    stockCount: 17,
    sku: 'VEL-MEN-15',
    description: 'Durable stretch fabric built for daily active lifestyle. Features reinforced shoulder taping and heavy-gauge thread for lifelong resilience.',
    material: '95% Compact Ring-Spun Cotton, 5% Spandex.',
    care: 'Machine wash cold. Do not bleach or tumble hot.',
    fit: 'Regular athletic fit.',
    colors: [
      { name: 'Onyx Black', hex: '#111112', bgClass: 'bg-[#111112]', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/29276076/pexels-photo-29276076.jpeg'
    ],
    tags: ['RawStreet', 'Heavy-Duty', 'Active', 'Durable', 'Men']
  }
];
