import { useMemo, useState } from 'react';
import { Search, Boxes, AlertTriangle, XCircle, Check } from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import { Seo } from '@/components/Seo';
import { formatINR, discountedPrice } from '@/lib/utils';

const LOW = 10;

export default function AdminInventory() {
  const { products, updateProduct } = useProductStore();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'out'>('all');
  const [drafts, setDrafts] = useState<Record<string, number>>({});

  const stats = useMemo(() => {
    const units = products.reduce((s, p) => s + p.stock, 0);
    const low = products.filter((p) => p.stock > 0 && p.stock <= LOW).length;
    const out = products.filter((p) => p.stock === 0).length;
    const value = products.reduce((s, p) => s + discountedPrice(p.price, p.discount) * p.stock, 0);
    return { units, low, out, value };
  }, [products]);

  const rows = useMemo(
    () =>
      products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .filter((p) => (filter === 'low' ? p.stock > 0 && p.stock <= LOW : filter === 'out' ? p.stock === 0 : true)),
    [products, query, filter],
  );

  const apply = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p || drafts[id] === undefined) return;
    updateProduct({ ...p, stock: Math.max(0, Number(drafts[id]) || 0) });
    setDrafts((d) => { const n = { ...d }; delete n[id]; return n; });
  };

  const tag = (stock: number) =>
    stock === 0
      ? { label: 'Out of stock', cls: 'bg-red-100 text-red-700' }
      : stock <= LOW
        ? { label: 'Low stock', cls: 'bg-amber-100 text-amber-700' }
        : { label: 'In stock', cls: 'bg-emerald-100 text-emerald-700' };

  const cards = [
    { label: 'Total Units', value: stats.units, icon: Boxes },
    { label: 'Low Stock', value: stats.low, icon: AlertTriangle },
    { label: 'Out of Stock', value: stats.out, icon: XCircle },
    { label: 'Stock Value', value: formatINR(stats.value), icon: Boxes },
  ];

  return (
    <div className="space-y-6">
      <Seo title="Inventory · Admin" noIndex />
      <header>
        <p className="eyebrow">Stock</p>
        <h1 className="font-display text-3xl md:text-4xl">Inventory</h1>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card-luxe p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink/5"><c.icon size={18} /></span>
            <p className="mt-3 font-display text-2xl">{c.value}</p>
            <p className="text-sm text-ink/60">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" className="field pl-11" />
        </div>
        <div className="flex gap-2">
          {(['all', 'low', 'out'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 text-sm capitalize transition ${filter === f ? 'bg-ink text-cream' : 'bg-ink/5 hover:bg-ink/10'}`}>
              {f === 'all' ? 'All' : f === 'low' ? 'Low stock' : 'Out of stock'}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white/60">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-ink/5 text-xs uppercase tracking-wider text-ink/60">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Current</th>
                <th className="px-4 py-3">Update stock</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const t = tag(p.stock);
                const draft = drafts[p.id];
                return (
                  <tr key={p.id} className="border-t border-ink/5 hover:bg-ink/[0.02]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="h-11 w-11 rounded-lg object-cover" />
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.cls}`}>{t.label}</span></td>
                    <td className="px-4 py-3 font-display text-lg">{p.stock}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={draft ?? p.stock}
                          onChange={(e) => setDrafts((d) => ({ ...d, [p.id]: Number(e.target.value) }))}
                          className="field max-w-[100px] py-2"
                        />
                        <button
                          onClick={() => apply(p.id)}
                          disabled={draft === undefined || draft === p.stock}
                          className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-cream transition hover:bg-ink/90 disabled:opacity-30"
                        >
                          <Check size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-ink/50">No products match.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
