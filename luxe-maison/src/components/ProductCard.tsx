import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { cn, formatINR, discountedPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggle, has } = useWishlistStore();
  const add = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const wished = has(product.id);
  const final = discountedPrice(product.price, product.discount);

  const quickAdd = () => {
    add({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: final,
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1,
    });
    setCartOpen(true);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      className="group card-luxe"
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-sand">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.discount > 0 && <Badge tone="gold">-{product.discount}%</Badge>}
          {product.bestseller && <Badge>Bestseller</Badge>}
          {product.stock === 0 && <Badge tone="cream">Sold out</Badge>}
        </div>

        <button
          onClick={() => toggle(product.id)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass transition hover:scale-110"
        >
          <Heart size={16} className={cn('transition', wished ? 'fill-ink text-ink' : 'text-ink/60')} />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button onClick={quickAdd} disabled={product.stock === 0} className="btn-luxe w-full !py-2.5 text-xs disabled:opacity-60">
            <ShoppingBag size={15} /> Quick add
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="eyebrow mb-1 truncate">{product.colors.slice(0, 3).join(' · ')}</p>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-display text-lg leading-snug line-clamp-1 hover:text-ink/70 transition">{product.name}</h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-2">
          <Rating value={product.rating} />
          <span className="text-xs text-ink/40">({product.reviews.length})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-medium">{formatINR(final)}</span>
          {product.discount > 0 && <span className="text-sm text-ink/40 line-through">{formatINR(product.price)}</span>}
        </div>
      </div>
    </motion.article>
  );
}
