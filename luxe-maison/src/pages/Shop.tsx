import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Seo } from '@/components/Seo';
import { discountedPrice, cn } from '@/lib/utils';
import type { SortKey } from '@/types';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'Free Size'];
const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'latest', label: 'Latest' },
  { key: 'popular', label: 'Popularity' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
];
const PER_PAGE = 8;

export function Shop() {
  const { products, categories } = useProductStore();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const [activeCat, setActiveCat] = useState(params.get('category') || 'all');
  const [maxPrice, setMaxPrice] = useState(30000);
  const [selSizes, setSelSizes] = useState<string[]>([]);
  const [selColors, setSelColors] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('latest');
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);

  const allColors = useMemo(() => Array.from(new Set(products.flatMap((p) => p.colors))).sort(), [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (activeCat !== 'all' && p.category !== activeCat) return false;
      if (q && !`${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (discountedPrice(p.price, p.discount) > maxPrice) return false;
      if (selSizes.length && !p.sizes.some((s) => selSizes.includes(s))) return false;
      if (selColors.length && !p.colors.some((c) => selColors.includes(c))) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === 'latest') return b.createdAt - a.createdAt;
      if (sort === 'popular') return b.rating - a.rating;
      if (sort === 'price-asc') return discountedPrice(a.price, a.discount) - discountedPrice(b.price, b.discount);
      return discountedPrice(b.price, b.discount) - discountedPrice(a.price, a.discount);
    });
    return list;
  }, [products, activeCat, q, maxPrice, selSizes, selColors, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    setPage(1);
  };

  const setCat = (slug: string) => {
    setActiveCat(slug);
    setPage(1);
    if (slug === 'all') params.delete('category'); else params.set('category', slug);
    setParams(params, { replace: true });
  };

  const reset = () => { setActiveCat('all'); setQ(''); setMaxPrice(30000); setSelSizes([]); setSelColors([]); setPage(1); };

  const Filters = (
    <div className="space-y-8">
      <div>
        <h4 className="eyebrow mb-3">Price · up to ₹{maxPrice.toLocaleString('en-IN')}</h4>
        <input type="range" min={1000} max={30000} step={500} value={maxPrice} onChange={(e) => { setMaxPrice(+e.target.value); setPage(1); }} className="w-full accent-ink" />
      </div>
      <div>
        <h4 className="eyebrow mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button key={s} onClick={() => toggle(selSizes, s, setSelSizes)} className={cn('rounded-full border px-3 py-1.5 text-xs transition', selSizes.includes(s) ? 'border-ink bg-ink text-cream' : 'border-ink/20 hover:border-ink')}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="eyebrow mb-3">Colour</h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <button key={c} onClick={() => toggle(selColors, c, setSelColors)} className={cn('rounded-full border px-3 py-1.5 text-xs transition', selColors.includes(c) ? 'border-ink bg-ink text-cream' : 'border-ink/20 hover:border-ink')}>{c}</button>
          ))}
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={reset} className="w-full">Clear filters</Button>
    </div>
  );

  return (
    <>
      <Seo title="Shop" description="Browse the full Maison Lumière collection — filter by category, size, colour and price." />
      <div className="container pt-28">
        <div className="text-center">
          <p className="eyebrow mb-2">The collection</p>
          <h1 className="font-display text-4xl md:text-5xl">Shop all</h1>
        </div>

        {/* search + category pills */}
        <div className="mt-8 flex items-center rounded-full border border-ink/15 bg-white/60 px-4 py-2.5 max-w-xl mx-auto">
          <Search size={17} className="text-ink/40" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search the collection…" className="w-full bg-transparent px-3 text-sm outline-none" />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => setCat('all')} className={cn('rounded-full px-4 py-1.5 text-xs transition', activeCat === 'all' ? 'bg-ink text-cream' : 'bg-ink/5 hover:bg-ink/10')}>All</button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setCat(c.slug)} className={cn('rounded-full px-4 py-1.5 text-xs transition', activeCat === c.slug ? 'bg-ink text-cream' : 'bg-ink/5 hover:bg-ink/10')}>{c.name}</button>
          ))}
        </div>
      </div>

      <div className="container mt-10 grid gap-8 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <div className="sticky top-28 rounded-2xl bg-white/60 p-6 shadow-glass">{Filters}</div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-ink/55">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setDrawer(true)} className="flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-xs md:hidden"><SlidersHorizontal size={14} /> Filters</button>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="rounded-full border border-ink/20 bg-white/60 px-4 py-2 text-xs outline-none">
                {sortOptions.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {current.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-dashed border-ink/20 py-24 text-center">
              <p className="font-display text-2xl">Nothing matches just yet</p>
              <p className="mt-2 text-sm text-ink/55">Try widening your filters.</p>
              <Button variant="ghost" size="sm" className="mt-4" onClick={reset}>Clear filters</Button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {current.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </AnimatePresence>
            </motion.div>
          )}

          {pages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button key={i} onClick={() => { setPage(i + 1); window.scrollTo({ top: 200, behavior: 'smooth' }); }} className={cn('h-10 w-10 rounded-full text-sm transition', page === i + 1 ? 'bg-ink text-cream' : 'bg-white/60 hover:bg-ink/10')}>{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* mobile filter drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm md:hidden" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-champagne p-6 md:hidden">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl">Filters</h3>
                <button onClick={() => setDrawer(false)} aria-label="Close"><X size={20} /></button>
              </div>
              {Filters}
              <Button className="mt-6 w-full" onClick={() => setDrawer(false)}>Show {filtered.length} results</Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
