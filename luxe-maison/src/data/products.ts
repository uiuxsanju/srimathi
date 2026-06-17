import type { Product } from '@/types';

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=80`;

export const sampleProducts: Product[] = [
  {
    id: 'p1', name: 'Aurelia Banarasi Silk Saree', slug: 'aurelia-banarasi-silk-saree',
    description: 'A handwoven Banarasi silk saree with real zari motifs and a contrast pallu. Drapes like liquid gold — made for weddings and milestone evenings.',
    category: 'sarees', price: 18999, discount: 25, sizes: ['Free Size'], colors: ['Maroon', 'Emerald', 'Gold'],
    stock: 12, rating: 4.8, images: [img('1610030469983-98e550d6193c'), img('1583391733956-6c78276477e2'), img('1602810318383-e386cc2a3ccf')],
    bestseller: true, trending: true, featured: true, createdAt: Date.now() - 86400000 * 2,
    reviews: [
      { id: 'r1', name: 'Ananya R.', rating: 5, comment: 'The zari work is stunning in person. Felt like couture.', date: '2025-12-02' },
      { id: 'r2', name: 'Sneha P.', rating: 4, comment: 'Gorgeous drape, slightly heavy but worth it.', date: '2025-11-20' },
    ],
  },
  {
    id: 'p2', name: 'Noor Chikankari Kurti', slug: 'noor-chikankari-kurti',
    description: 'Lucknowi chikankari hand-embroidery on breathable cotton. The everyday luxury you reach for again and again.',
    category: 'kurtis', price: 3499, discount: 15, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['White', 'Powder Blue', 'Blush'],
    stock: 40, rating: 4.6, images: [img('1583391733956-6c78276477e2'), img('1564257631407-4deb1f99d992')],
    bestseller: true, trending: false, featured: true, createdAt: Date.now() - 86400000 * 5,
    reviews: [{ id: 'r3', name: 'Divya K.', rating: 5, comment: 'So soft and the embroidery is delicate. My new favourite.', date: '2025-12-10' }],
  },
  {
    id: 'p3', name: 'Seraphine Midi Slip Dress', slug: 'seraphine-midi-slip-dress',
    description: 'A bias-cut satin slip dress with a cowl neck and adjustable straps. Quietly devastating, in the best way.',
    category: 'dresses', price: 5999, discount: 20, sizes: ['XS', 'S', 'M', 'L'], colors: ['Champagne', 'Black', 'Sage'],
    stock: 22, rating: 4.7, images: [img('1595777457583-95e059d581b8'), img('1490481651871-ab68de25d43d')],
    bestseller: false, trending: true, featured: true, createdAt: Date.now() - 86400000 * 1,
    reviews: [{ id: 'r4', name: 'Meghana T.', rating: 5, comment: 'Fits like it was made for me. The satin is rich.', date: '2025-12-14' }],
  },
  {
    id: 'p4', name: 'Celestine Trail Gown', slug: 'celestine-trail-gown',
    description: 'A floor-sweeping gown with a structured bodice and a dramatic trail. Hand-finished for red-carpet moments.',
    category: 'gowns', price: 24999, discount: 30, sizes: ['S', 'M', 'L', 'XL'], colors: ['Wine', 'Midnight', 'Ivory'],
    stock: 8, rating: 4.9, images: [img('1566174053879-31528523f8ae'), img('1595777457583-95e059d581b8')],
    bestseller: true, trending: true, featured: true, createdAt: Date.now() - 86400000 * 3,
    reviews: [{ id: 'r5', name: 'Pooja S.', rating: 5, comment: 'Wore it to a reception — could not stop the compliments.', date: '2025-11-30' }],
  },
  {
    id: 'p5', name: 'Liora Puff-Sleeve Blouse', slug: 'liora-puff-sleeve-blouse',
    description: 'A poplin blouse with sculpted puff sleeves and covered buttons. Polished enough for the boardroom, soft enough for brunch.',
    category: 'tops', price: 2499, discount: 10, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['White', 'Butter', 'Black'],
    stock: 55, rating: 4.4, images: [img('1564257631407-4deb1f99d992'), img('1483985988355-763728e1935b')],
    bestseller: false, trending: false, featured: false, createdAt: Date.now() - 86400000 * 8,
    reviews: [{ id: 'r6', name: 'Harshita V.', rating: 4, comment: 'Lovely fabric, runs slightly large.', date: '2025-12-05' }],
  },
  {
    id: 'p6', name: 'Mehr Anarkali Set', slug: 'mehr-anarkali-set',
    description: 'A floor-length Anarkali in georgette with sequin detailing and a sheer dupatta. Festive heritage with a modern flow.',
    category: 'ethnic-wear', price: 12999, discount: 22, sizes: ['S', 'M', 'L', 'XL'], colors: ['Rust', 'Teal', 'Lilac'],
    stock: 18, rating: 4.7, images: [img('1602810318383-e386cc2a3ccf'), img('1610030469983-98e550d6193c')],
    bestseller: true, trending: false, featured: true, createdAt: Date.now() - 86400000 * 6,
    reviews: [{ id: 'r7', name: 'Lavanya M.', rating: 5, comment: 'Twirl-worthy. Got it for Diwali and loved it.', date: '2025-11-12' }],
  },
  {
    id: 'p7', name: 'Vesper Tailored Blazer', slug: 'vesper-tailored-blazer',
    description: 'A single-breasted blazer in wool-blend crepe with a nipped waist. The sharpest line in your wardrobe.',
    category: 'western-wear', price: 7499, discount: 18, sizes: ['XS', 'S', 'M', 'L'], colors: ['Camel', 'Black', 'Ivory'],
    stock: 26, rating: 4.5, images: [img('1483985988355-763728e1935b'), img('1525507119028-ed4c629a60a3')],
    bestseller: false, trending: true, featured: false, createdAt: Date.now() - 86400000 * 4,
    reviews: [{ id: 'r8', name: 'Ritu A.', rating: 5, comment: 'Impeccable tailoring. Looks far more expensive than it is.', date: '2025-12-08' }],
  },
  {
    id: 'p8', name: 'Solene Linen Co-Ord Set', slug: 'solene-linen-co-ord-set',
    description: 'A relaxed linen shirt and wide-leg trouser set. Breezy, elevated, and endlessly photogenic.',
    category: 'co-ord-sets', price: 4999, discount: 12, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Sand', 'Olive', 'White'],
    stock: 33, rating: 4.6, images: [img('1525507119028-ed4c629a60a3'), img('1490481651871-ab68de25d43d')],
    bestseller: true, trending: true, featured: true, createdAt: Date.now() - 86400000 * 1,
    reviews: [{ id: 'r9', name: 'Keerthi N.', rating: 5, comment: 'Vacation-perfect. The linen is premium quality.', date: '2025-12-13' }],
  },
  {
    id: 'p9', name: 'Aria Pleated Maxi', slug: 'aria-pleated-maxi',
    description: 'A sunray-pleated chiffon maxi with a self-tie waist. Movement is the whole point.',
    category: 'new-arrivals', price: 6499, discount: 0, sizes: ['S', 'M', 'L'], colors: ['Dusty Rose', 'Slate', 'Cream'],
    stock: 20, rating: 4.8, images: [img('1490481651871-ab68de25d43d'), img('1595777457583-95e059d581b8')],
    bestseller: false, trending: true, featured: true, createdAt: Date.now() - 86400000 * 0.5,
    reviews: [{ id: 'r10', name: 'Bhavana G.', rating: 5, comment: 'The pleats flow beautifully. Felt elegant all evening.', date: '2025-12-15' }],
  },
  {
    id: 'p10', name: 'Elise Wrap Dress', slug: 'elise-wrap-dress',
    description: 'A timeless faux-wrap dress in stretch jersey that flatters every figure. From the Sale Collection — a true wardrobe workhorse.',
    category: 'sale-collection', price: 3999, discount: 40, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Emerald', 'Burgundy', 'Navy'],
    stock: 48, rating: 4.5, images: [img('1567401893414-76b7b1e5a7a5'), img('1564257631407-4deb1f99d992')],
    bestseller: true, trending: false, featured: false, createdAt: Date.now() - 86400000 * 9,
    reviews: [{ id: 'r11', name: 'Swathi R.', rating: 4, comment: 'Great value, very flattering cut.', date: '2025-11-28' }],
  },
];
