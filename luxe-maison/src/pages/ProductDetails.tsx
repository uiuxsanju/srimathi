import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, ShoppingBag, Truck, RefreshCw, ShieldCheck, ChevronRight } from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useUIStore } from '@/store/useUIStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { ProductCard } from '@/components/ProductCard';
import { Seo } from '@/components/Seo';
import { cn, formatINR, discountedPrice } from '@/lib/utils';
import { productEnquiry } from '@/lib/whatsapp';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const product = products.find((p) => p.id === id) || products.find((p) => p.slug === id);
  const add = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const { toggle, has } = useWishlistStore();

  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState(product?.sizes[0] || '');
  const [color, setColor] = useState(product?.colors[0] || '');
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });

  const related = useMemo(
    () => products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4),
    [products, product],
  );

  if (!product) {
    return (
      <div className="container grid min-h-[60vh] place-items-center pt-28 text-center">
        <div>
          <h1 className="font-display text-3xl">Piece not found</h1>
          <Link to="/shop" className="mt-4 inline-block"><Button variant="ghost">Back to shop</Button></Link>
        </div>
      </div>
    );
  }

  const final = discountedPrice(product.price, product.discount);
  const wished = has(product.id);

  const addToCart = () => {
    add({ productId: product.id, name: product.name, image: product.images[0], price: final, size, color, quantity: qty });
    setCartOpen(true);
  };

  const schema = {
    '@context': 'https://schema.org', '@type': 'Product', name: product.name, image: product.images,
    description: product.description, brand: { '@type': 'Brand', name: 'Maison Lumière' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviews.length },
    offers: { '@type': 'Offer', priceCurrency: 'INR', price: final, availability: product.stock > 0 ? 'InStock' : 'OutOfStock' },
  };

  return (
    <>
      <Seo title={product.name} description={product.description} image={product.images[0]} schema={schema} />
      <div className="container pt-24 md:pt-28">
        <nav className="mb-6 flex items-center gap-1 text-xs text-ink/50">
          <Link to="/" className="hover:text-ink">Home</Link><ChevronRight size={13} />
          <Link to="/shop" className="hover:text-ink">Shop</Link><ChevronRight size={13} />
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* gallery */}
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            <div className="flex gap-3 md:flex-col">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={cn('h-20 w-16 overflow-hidden rounded-xl border-2 transition md:h-24 md:w-20', imgIdx === i ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100')}>
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div
              className="relative flex-1 overflow-hidden rounded-2xl bg-sand"
              onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true }); }}
              onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
            >
              <motion.img
                key={imgIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                src={product.images[imgIdx]} alt={product.name}
                className="aspect-[3/4] w-full object-cover transition-transform duration-200"
                style={{ transformOrigin: `${zoom.x}% ${zoom.y}%`, transform: zoom.on ? 'scale(1.7)' : 'scale(1)' }}
              />
            </div>
          </div>

          {/* info */}
          <div className="lg:pt-2">
            <div className="flex flex-wrap gap-2">
              {product.bestseller && <Badge>Bestseller</Badge>}
              {product.trending && <Badge tone="gold">Trending</Badge>}
            </div>
            <h1 className="mt-3 font-display text-3xl md:text-4xl leading-tight">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <Rating value={product.rating} />
              <span className="text-sm text-ink/50">{product.rating} · {product.reviews.length} reviews</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl">{formatINR(final)}</span>
              {product.discount > 0 && <><span className="text-lg text-ink/40 line-through">{formatINR(product.price)}</span><Badge tone="gold">{product.discount}% off</Badge></>}
            </div>

            <p className="mt-5 text-ink/65 leading-relaxed">{product.description}</p>

            <div className="mt-7">
              <p className="eyebrow mb-2">Colour · {color}</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} className={cn('rounded-full border px-4 py-2 text-sm transition', color === c ? 'border-ink bg-ink text-cream' : 'border-ink/20 hover:border-ink')}>{c}</button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="eyebrow mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={cn('min-w-12 rounded-full border px-4 py-2 text-sm transition', size === s ? 'border-ink bg-ink text-cream' : 'border-ink/20 hover:border-ink')}>{s}</button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-ink/15">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center" aria-label="Decrease"><Minus size={15} /></button>
                <span className="w-8 text-center">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="grid h-11 w-11 place-items-center" aria-label="Increase"><Plus size={15} /></button>
              </div>
              <p className={cn('text-sm', product.stock > 5 ? 'text-green-700' : 'text-amber-600')}>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button onClick={addToCart} disabled={product.stock === 0} size="lg"><ShoppingBag size={18} /> Add to bag</Button>
              <a href={productEnquiry(product.name, size, color)} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="lg" className="w-full">Buy on WhatsApp</Button>
              </a>
            </div>
            <button onClick={() => toggle(product.id)} className="mt-4 inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
              <Heart size={16} className={cn(wished && 'fill-ink text-ink')} /> {wished ? 'Saved to wishlist' : 'Add to wishlist'}
            </button>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-ink/10 pt-6 text-center">
              {[[Truck, 'Free shipping', 'over ₹4,999'], [RefreshCw, '7-day returns', 'easy & free'], [ShieldCheck, 'Authentic', 'artisan-made']].map(([Icon, t, s], i) => {
                const I = Icon as typeof Truck;
                return (<div key={i} className="flex flex-col items-center gap-1"><I size={20} className="text-ink/70" /><p className="text-xs font-medium">{t as string}</p><p className="text-[11px] text-ink/45">{s as string}</p></div>);
              })}
            </div>
          </div>
        </div>

        {/* reviews */}
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl">Customer reviews</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {product.reviews.map((r) => (
              <div key={r.id} className="card-luxe p-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{r.name}</p>
                  <Rating value={r.rating} />
                </div>
                <p className="mt-2 text-sm text-ink/65">{r.comment}</p>
                <p className="mt-2 text-xs text-ink/40">{r.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl md:text-3xl">You may also love</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
