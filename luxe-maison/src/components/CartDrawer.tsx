import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { formatINR } from '@/lib/utils';
import { cartCheckout } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const setOpen = useUIStore((s) => s.setCartOpen);
  const { items, setQty, remove, subtotal, total } = useCartStore();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-champagne shadow-lift"
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h3 className="font-display text-2xl">Your bag</h3>
              <button onClick={() => setOpen(false)} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5">
                <X size={18} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag size={40} className="text-ink/30" />
                <p className="text-ink/60">Your bag is beautifully empty.</p>
                <Link to="/shop" onClick={() => setOpen(false)}><Button variant="ghost">Start shopping</Button></Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {items.map((i) => (
                    <div key={`${i.productId}-${i.size}-${i.color}`} className="flex gap-4">
                      <img src={i.image} alt={i.name} className="h-24 w-20 rounded-xl object-cover" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <p className="font-display leading-tight">{i.name}</p>
                          <button onClick={() => remove(i.productId, i.size, i.color)} aria-label="Remove" className="text-ink/40 hover:text-ink">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-ink/50">{i.size} · {i.color}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-ink/15">
                            <button onClick={() => setQty(i.productId, i.size, i.color, i.quantity - 1)} className="grid h-8 w-8 place-items-center" aria-label="Decrease"><Minus size={13} /></button>
                            <span className="w-7 text-center text-sm">{i.quantity}</span>
                            <button onClick={() => setQty(i.productId, i.size, i.color, i.quantity + 1)} className="grid h-8 w-8 place-items-center" aria-label="Increase"><Plus size={13} /></button>
                          </div>
                          <span className="font-medium">{formatINR(i.price * i.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <footer className="border-t border-ink/10 px-6 py-5 space-y-3">
                  <div className="flex justify-between text-sm text-ink/60">
                    <span>Subtotal</span><span>{formatINR(subtotal())}</span>
                  </div>
                  <a href={cartCheckout(items, total())} target="_blank" rel="noreferrer" className="block">
                    <Button className="w-full">Checkout on WhatsApp</Button>
                  </a>
                  <Link to="/cart" onClick={() => setOpen(false)} className="block">
                    <Button variant="ghost" className="w-full">View full bag</Button>
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
