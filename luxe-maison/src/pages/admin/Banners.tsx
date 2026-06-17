import { useState } from 'react';
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown } from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import type { Banner } from '@/types';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Seo } from '@/components/Seo';
import { uid } from '@/lib/utils';

const blank = (order: number): Banner => ({ id: uid(), title: '', subtitle: '', cta: 'Shop Now', link: '/shop', image: '', order });

export default function AdminBanners() {
  const { banners, addBanner, updateBanner, deleteBanner, reorderBanners } = useProductStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState<Banner>(blank(0));

  const openNew = () => { setEditing(null); setForm(blank(banners.length)); setOpen(true); };
  const openEdit = (b: Banner) => { setEditing(b); setForm({ ...b }); setOpen(true); };

  const save = () => {
    if (!form.title.trim()) return;
    const payload: Banner = {
      ...form,
      image: form.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
    };
    editing ? updateBanner(payload) : addBanner(payload);
    setOpen(false);
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...banners];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    reorderBanners(next);
  };

  const set = <K extends keyof Banner>(k: K, v: Banner[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-6">
      <Seo title="Banners · Admin" noIndex />
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Hero Slider</p>
          <h1 className="font-display text-3xl md:text-4xl">Banners</h1>
        </div>
        <Button onClick={openNew}><Plus size={16} /> Add banner</Button>
      </header>

      <div className="space-y-4">
        {banners.map((b, i) => (
          <div key={b.id} className="card-luxe flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <img src={b.image} alt={b.title} className="h-28 w-full rounded-xl object-cover sm:w-44" />
            <div className="flex-1">
              <p className="font-display text-lg">{b.title}</p>
              <p className="text-sm text-ink/60">{b.subtitle}</p>
              <span className="mt-2 inline-block rounded-full bg-ink/5 px-3 py-1 text-xs">CTA: {b.cta} → {b.link}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => move(i, -1)} disabled={i === 0} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-ink/5 disabled:opacity-30"><ArrowUp size={15} /></button>
              <button onClick={() => move(i, 1)} disabled={i === banners.length - 1} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-ink/5 disabled:opacity-30"><ArrowDown size={15} /></button>
              <button onClick={() => openEdit(b)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-ink/5"><Pencil size={15} /></button>
              <button onClick={() => deleteBanner(b.id)} className="grid h-9 w-9 place-items-center rounded-lg text-red-600 hover:bg-red-50"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {banners.length === 0 && <p className="py-10 text-center text-ink/50">No banners yet.</p>}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit banner' : 'Add banner'}>
        <div className="grid gap-4">
          <label className="text-sm">
            <span className="mb-1 block font-medium">Title</span>
            <input value={form.title} onChange={(e) => set('title', e.target.value)} className="field" placeholder="The Festive Edit" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Subtitle</span>
            <input value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} className="field" placeholder="Handcrafted luxury for the season" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm">
              <span className="mb-1 block font-medium">CTA label</span>
              <input value={form.cta} onChange={(e) => set('cta', e.target.value)} className="field" placeholder="Shop Now" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Link</span>
              <input value={form.link} onChange={(e) => set('link', e.target.value)} className="field" placeholder="/shop" />
            </label>
          </div>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Image URL</span>
            <input value={form.image} onChange={(e) => set('image', e.target.value)} className="field" placeholder="https://images.unsplash.com/…" />
          </label>
          {form.image && <img src={form.image} alt="preview" className="h-36 w-full rounded-xl object-cover" />}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}><X size={16} /> Cancel</Button>
          <Button onClick={save}>{editing ? 'Save changes' : 'Add banner'}</Button>
        </div>
      </Modal>
    </div>
  );
}
