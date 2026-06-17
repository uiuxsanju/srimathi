import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import type { Category } from '@/types';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Seo } from '@/components/Seo';
import { slugify, uid } from '@/lib/utils';

const blank = (): Category => ({ id: uid(), name: '', slug: '', image: '', description: '' });

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useProductStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<Category>(blank());

  const openNew = () => { setEditing(null); setForm(blank()); setOpen(true); };
  const openEdit = (c: Category) => { setEditing(c); setForm({ ...c }); setOpen(true); };
  const count = (slug: string) => products.filter((p) => p.category === slug).length;

  const save = () => {
    if (!form.name.trim()) return;
    const payload: Category = {
      ...form,
      slug: slugify(form.name) || form.id,
      image: form.image || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    };
    editing ? updateCategory(payload) : addCategory(payload);
    setOpen(false);
  };

  const set = <K extends keyof Category>(k: K, v: Category[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-6">
      <Seo title="Categories · Admin" noIndex />
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Collections</p>
          <h1 className="font-display text-3xl md:text-4xl">Categories</h1>
        </div>
        <Button onClick={openNew}><Plus size={16} /> Add category</Button>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <div key={c.id} className="card-luxe overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-cream">
                <p className="font-display text-lg leading-tight">{c.name}</p>
                <p className="text-xs opacity-80">{count(c.slug)} products</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-3">
              <button onClick={() => openEdit(c)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-ink/5"><Pencil size={15} /></button>
              <button onClick={() => deleteCategory(c.id)} className="grid h-9 w-9 place-items-center rounded-lg text-red-600 hover:bg-red-50"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit category' : 'Add category'}>
        <div className="grid gap-4">
          <label className="text-sm">
            <span className="mb-1 block font-medium">Name</span>
            <input value={form.name} onChange={(e) => set('name', e.target.value)} className="field" placeholder="Sarees" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Description</span>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2} className="field resize-none" placeholder="Handwoven heritage drapes…" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Image URL</span>
            <input value={form.image} onChange={(e) => set('image', e.target.value)} className="field" placeholder="https://images.unsplash.com/…" />
          </label>
          {form.image && <img src={form.image} alt="preview" className="h-36 w-full rounded-xl object-cover" />}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}><X size={16} /> Cancel</Button>
          <Button onClick={save}>{editing ? 'Save changes' : 'Add category'}</Button>
        </div>
      </Modal>
    </div>
  );
}
