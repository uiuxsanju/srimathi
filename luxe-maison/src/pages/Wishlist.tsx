import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useProductStore } from '@/store/useProductStore';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Seo } from '@/components/Seo';

export function Wishlist() {
  const { ids } = useWishlistStore();
  const { products } = useProductStore();
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <Seo title="Wishlist" />
      <div className="container pt-28">
        <div className="text-center">
          <p className="eyebrow mb-2">Saved for later</p>
          <h1 className="font-display text-4xl md:text-5xl">Your wishlist</h1>
        </div>

        {saved.length === 0 ? (
          <div className="mt-16 grid place-items-center rounded-3xl border border-dashed border-ink/20 py-24 text-center">
            <Heart size={40} className="text-ink/25" />
            <p className="mt-4 font-display text-2xl">Nothing saved yet</p>
            <p className="mt-2 text-sm text-ink/55">Tap the heart on any piece to keep it here.</p>
            <Link to="/shop" className="mt-5"><Button variant="ghost">Browse the collection</Button></Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {saved.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </>
  );
}
