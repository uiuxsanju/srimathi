import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Tag, Check } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Seo } from '@/components/Seo';
import { formatINR } from '@/lib/utils';
import { cartCheckout } from '@/lib/whatsapp';

export function Cart() {
  const { items, setQty, remove, applyCoupon, removeCoupon, coupon, subtotal, discountAmount, tax, total } = useCartStore();
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const apply = () => {
    if (!code.trim()) return;
    const ok = applyCoupon(code);
    setMsg(ok ? { ok: true, text: 'Coupon applied' } : { ok: false, text: 'Invalid coupon code' });
  };

  if (items.length === 0) {
    return (
      <>
        <Seo title="Cart" />
        <div className="container grid min-h-[60vh] place-items-center pt-28 text-center">
          <div>
            <ShoppingBag size={44} className="mx-auto text-ink/25" />
            <h1 className="mt-4 font-display text-3xl">Your bag is empty</h1>
            <p className="mt-2 text-ink/55">Beautiful things are waiting.</p>
            <Link to="/shop" className="mt-5 inline-block"><Button>Start shopping</Button></Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo title="Cart" />
      <div className="container pt-28">
        <h1 className="font-display text-4xl md:text-5xl">Shopping bag</h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {items.map((i) => (
              <div key={`${i.productId}-${i.size}-${i.color}`} className="flex gap-5 card-luxe p-4">
                <img src={i.image} alt={i.name} className="h-32 w-24 rounded-xl object-cover" />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <h3 className="font-display text-lg leading-tight">{i.name}</h3>
                    <button onClick={() => remove(i.productId, i.size, i.color)} aria-label="Remove" className="text-ink/40 hover:text-red-600"><Trash2 size={17} /></button>
                  </div>
                  <p className="text-sm text-ink/50">{i.size} · {i.color}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-ink/15">
                      <button onClick={() => setQty(i.productId, i.size, i.color, i.quantity - 1)} className="grid h-9 w-9 place-items-center" aria-label="Decrease"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm">{i.quantity}</span>
                      <button onClick={() => setQty(i.productId, i.size, i.color, i.quantity + 1)} className="grid h-9 w-9 place-items-center" aria-label="Increase"><Plus size={14} /></button>
                    </div>
                    <span className="font-medium">{formatINR(i.price * i.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl bg-white/70 p-6 shadow-soft lg:sticky lg:top-28">
            <h3 className="font-display text-xl">Order summary</h3>

            <div className="mt-5">
              {coupon ? (
                <div className="flex items-center justify-between rounded-xl bg-cream px-4 py-3 text-sm">
                  <span className="flex items-center gap-2"><Check size={15} className="text-green-700" /> {coupon} applied</span>
                  <button onClick={() => { removeCoupon(); setMsg(null); setCode(''); }} className="text-ink/50 hover:text-ink">Remove</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center rounded-xl border border-ink/15 bg-white px-3 py-1.5">
                    <Tag size={15} className="text-ink/40" />
                    <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" className="w-full bg-transparent px-2 py-1.5 text-sm uppercase outline-none" />
                    <Button size="sm" onClick={apply}>Apply</Button>
                  </div>
                  {msg && <p className={`mt-1.5 text-xs ${msg.ok ? 'text-green-700' : 'text-red-600'}`}>{msg.text}</p>}
                  <p className="mt-1.5 text-[11px] text-ink/40">Try LUXE10, WELCOME15 or FESTIVE20</p>
                </>
              )}
            </div>

            <dl className="mt-5 space-y-2.5 border-t border-ink/10 pt-5 text-sm">
              <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd>{formatINR(subtotal())}</dd></div>
              {discountAmount() > 0 && <div className="flex justify-between text-green-700"><dt>Discount</dt><dd>− {formatINR(discountAmount())}</dd></div>}
              <div className="flex justify-between"><dt className="text-ink/60">Tax (5% GST)</dt><dd>{formatINR(tax())}</dd></div>
              <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-medium"><dt>Total</dt><dd>{formatINR(total())}</dd></div>
            </dl>

            <a href={cartCheckout(items, total())} target="_blank" rel="noreferrer" className="mt-5 block">
              <Button className="w-full" size="lg">Checkout via WhatsApp</Button>
            </a>
            <p className="mt-3 text-center text-[11px] text-ink/45">You'll confirm details & pay over WhatsApp.</p>
          </aside>
        </div>
      </div>
    </>
  );
}
