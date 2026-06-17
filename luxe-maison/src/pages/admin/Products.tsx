import { useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import type { Product } from '@/types';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Seo } from '@/components/Seo';
import { formatINR, slugify, uid, discountedPrice } from '@/lib/utils';

const blank = (): Product => ({
  id: uid(), name: '', slug: '', description: '', category: '', price: 0, discount: 0,
  sizes: [], colors: [], stock: 0, rating: 4.5, reviews: [], images: [],
  bestseller: false, trending: false, featured: false, createdAt: Date.now(),
});

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Product>(blank());

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === 'all' || p.category === cat) &&
          p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [products, query, cat],
  );

  const openNew = () => { setEditing(null); setForm(blank()); setOpen(true); };
  const openEdit = (p: Product) => { setEditing(p); setForm({ ...p }); setOpen(true); };

  const save = () => {
    if (!form.name.trim() || !form.category) return;
    const payload: Product = {
      ...form,
      slug: slugify(form.name) || form.id,
      price: Number(form.price) || 0,
      discount: Number(form.discount) || 0,
      stock: Number(form.stock) || 0,
      rating: Number(form.rating) || 4.5,
      images: form.images.length ? form.images : ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80'],
    };
    editing ? updateProduct(payload) : addProduct(payload);
    setOpen(false);
  };

  const set = <K extends keyof Product>(k: K, v: Product[K]) => setForm((f) => ({ ...f, [k]: v }));
  const csv = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean);

  return (
    <div className="space-y-6">
      <Seo title="Products · Admin" noIndex />
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h1 className="font-display text-3xl md:text-4xl">Products</h1>
        </div>
        <Button onClick={openNew}><Plus size={16} /> Add product</Button>
      </header>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" className="field pl-11" />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="field max-w-[200px]">
          <option value="all">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white/60">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-ink/5 text-xs uppercase tracking-wider text-ink/60">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Flags</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-ink/5 hover:bg-ink/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-ink/70">{p.category.replace(/-/g, ' ')}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{formatINR(discountedPrice(p.price, p.discount))}</div>
                    {p.discount > 0 && <div className="text-xs text-ink/40 line-through">{formatINR(p.price)}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={p.stock <= 10 ? 'font-semibold text-amber-600' : ''}>{p.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.bestseller && <Badge tone="gold">Best</Badge>}
                      {p.trending && <Badge tone="cream">Trend</Badge>}
                      {p.featured && <Badge>Feat</Badge>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-ink/5"><Pencil size={15} /></button>
                      <button onClick={() => deleteProduct(p.id)} className="grid h-9 w-9 place-items-center rounded-lg text-red-600 hover:bg-red-50"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-ink/50">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit product' : 'Add product'}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2 text-sm">
            <span className="mb-1 block font-medium">Name</span>
            <input value={form.name} onChange={(e) => set('name', e.target.value)} className="field" placeholder="Ivory Silk Saree" />
          </label>
          <label className="sm:col-span-2 text-sm">
            <span className="mb-1 block font-medium">Description</span>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} className="field resize-none" placeholder="Product description…" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Category</span>
            <select value={form.category} onChange={(e) => set('category', e.target.value)} className="field">
              <option value="">Select…</option>
              {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Stock</span>
            <input type="number" value={form.stock} onChange={(e) => set('stock', Number(e.target.value))} className="field" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Price (₹)</span>
            <input type="number" value={form.price} onChange={(e) => set('price', Number(e.target.value))} className="field" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Discount (%)</span>
            <input type="number" value={form.discount} onChange={(e) => set('discount', Number(e.target.value))} className="field" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Sizes (comma sep)</span>
            <input value={form.sizes.join(', ')} onChange={(e) => set('sizes', csv(e.target.value))} className="field" placeholder="S, M, L, XL" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Colors (comma sep)</span>
            <input value={form.colors.join(', ')} onChange={(e) => set('colors', csv(e.target.value))} className="field" placeholder="Ivory, Black" />
          </label>
          <label className="sm:col-span-2 text-sm">
            <span className="mb-1 block font-medium">Image URLs (comma sep)</span>
            <textarea value={form.images.join(', ')} onChange={(e) => set('images', csv(e.target.value))} rows={2} className="field resize-none" placeholder="https://…, https://…" />
          </label>
          <div className="sm:col-span-2 flex flex-wrap gap-4 text-sm">
            {(['bestseller', 'trending', 'featured'] as const).map((f) => (
              <label key={f} className="flex items-center gap-2 capitalize">
                <input type="checkbox" checked={form[f]} onChange={(e) => set(f, e.target.checked)} className="h-4 w-4 accent-ink" />
                {f}
              </label>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}><X size={16} /> Cancel</Button>
          <Button onClick={save}>{editing ? 'Save changes' : 'Add product'}</Button>
        </div>
      </Modal>
    </div>
  );
}
