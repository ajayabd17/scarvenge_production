/**
 * SCARVENGE — Product Data
 * Placeholder catalog — replace with real inventory data.
 * No fabricated prices, reviews, or product details.
 * Structure is i18n-ready and CMS-connectable.
 */
import product1 from '../assets/product-1.jpeg';
import product2 from '../assets/product-2.jpeg';
import product3 from '../assets/product-3.jpeg';
import product4 from '../assets/product-4.jpeg';
import product5 from '../assets/product-5.jpeg';

export const PRODUCTS = [
  {
    id: 'scv-001',
    slug: 'predator-compression-ls',
    name: 'Predator Compression Long Sleeve',
    category: 'compression',
    collection: 'core',
    gender: 'men',
    price: 2999,
    compareAtPrice: null,
    badges: ['bestseller'],
    colors: [
      { name: 'Blackout', hex: '#0D0D0D', images: [product2] },
      { name: 'Stealth Grey', hex: '#4A4A4A', images: [product2] },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 24,
    rating: 0,
    reviewCount: 0,
    description: 'Built for predators. Our signature second-skin compression long sleeve features precision-mapped panels for unrestricted movement. Details will be updated when available.',
    material: null,
    fit: 'Compression',
    features: ['4-way stretch', 'Moisture-wicking', 'Flatlock seams'],
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    tags: ['compression', 'long-sleeve', 'gym'],
  },
  {
    id: 'scv-002',
    slug: 'hunter-sweatpant',
    name: 'Hunter Sweatpant',
    category: 'bottoms',
    collection: 'core',
    gender: 'men',
    price: 2499,
    compareAtPrice: null,
    badges: [],
    colors: [
      { name: 'Ash Grey', hex: '#9A9A9A', images: [product1] },
      { name: 'Pitch Black', hex: '#0D0D0D', images: [product1] },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 40,
    rating: 0,
    reviewCount: 0,
    description: 'Wide-leg training sweatpants with a relaxed silhouette. Engineered to move with you, styled to turn heads. Details will be updated when available.',
    material: null,
    fit: 'Relaxed',
    features: ['Drawstring waist', 'Side pockets', 'Ribbed cuffs'],
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    tags: ['sweatpants', 'bottoms', 'casual'],
  },
  {
    id: 'scv-003',
    slug: 'apex-tank',
    name: 'Apex Ribbed Tank',
    category: 'tops',
    collection: 'core',
    gender: 'men',
    price: 1499,
    compareAtPrice: null,
    badges: ['new'],
    colors: [
      { name: 'Pitch Black', hex: '#0D0D0D', images: [product5] },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 18,
    rating: 0,
    reviewCount: 0,
    description: 'Ribbed muscle-cut tank built for training and worn beyond the gym. Details will be updated when available.',
    material: null,
    fit: 'Athletic',
    features: ['Ribbed fabric', 'U-neck', 'Muscle-cut'],
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    tags: ['tank', 'tops', 'gym'],
  },
  {
    id: 'scv-004',
    slug: 'scavenge-tee',
    name: 'SCARVENGE Oversized Tee',
    category: 'tops',
    collection: 'statement',
    gender: 'unisex',
    price: 1999,
    compareAtPrice: 2499,
    badges: ['sale'],
    colors: [
      { name: 'Washed Charcoal', hex: '#3A3A3A', images: [product4] },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['M', 'L', 'XL'],
    inStock: true,
    stockCount: 8,
    rating: 0,
    reviewCount: 0,
    description: 'Statement oversized tee with the SCARVENGE graphic. Washed for a lived-in feel. Details will be updated when available.',
    material: null,
    fit: 'Oversized',
    features: ['Acid-washed', 'Drop shoulder', 'Heavy-weight cotton'],
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    tags: ['tee', 'tops', 'statement', 'oversized'],
  },
  {
    id: 'scv-005',
    slug: 'sport-shorts',
    name: 'SCARVENGE Sport Shorts',
    category: 'bottoms',
    collection: 'core',
    gender: 'men',
    price: 1799,
    compareAtPrice: null,
    badges: [],
    colors: [
      { name: 'Pitch Black', hex: '#0D0D0D', images: [product1] },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 55,
    rating: 0,
    reviewCount: 0,
    description: 'Athletic training shorts. Designed for maximum mobility. Details will be updated when available.',
    material: null,
    fit: 'Athletic',
    features: ['5" inseam', 'Liner included', 'Zippered pocket'],
    isNew: false,
    isBestSeller: false,
    isTrending: true,
    tags: ['shorts', 'bottoms', 'gym'],
  },
  {
    id: 'scv-006',
    slug: 'predator-compression-ts',
    name: 'Predator Compression T-Shirt',
    category: 'compression',
    collection: 'core',
    gender: 'men',
    price: 2299,
    compareAtPrice: null,
    badges: ['new'],
    colors: [
      { name: 'Stone', hex: '#9A8F84', images: [product3] },
      { name: 'Blackout', hex: '#0D0D0D', images: [product2] },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 62,
    rating: 0,
    reviewCount: 0,
    description: 'Short-sleeve compression tee with graphic detailing. Built for performance. Details will be updated when available.',
    material: null,
    fit: 'Compression',
    features: ['4-way stretch', 'UV protection', 'Anti-odor'],
    isNew: true,
    isBestSeller: false,
    isTrending: false,
    tags: ['compression', 'tee', 'gym'],
  },
];

export const BEST_SELLERS = PRODUCTS.filter(p => p.isBestSeller);
export const NEW_ARRIVALS  = PRODUCTS.filter(p => p.isNew);
export const TRENDING      = PRODUCTS.filter(p => p.isTrending);

export function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null;
}

export function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

export function getProductsByCollection(collection) {
  return PRODUCTS.filter(p => p.collection === collection);
}
