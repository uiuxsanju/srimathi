import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';

export function MobileTabBar() {
  const { pathname } = useLocation();
  const count = useCartStore((s) => s.count());
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  const item = (active: boolean) => cn('flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] transition', active ? 'text-ink' : 'text-ink/45');

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 glass border-t border-white/40 md:hidden">
      <Link to="/" className={item(pathname === '/')}><Home size={20} /><span>Home</span></Link>
      <Link to="/shop" className={item(pathname.startsWith('/shop'))}><Search size={20} /><span>Shop</span></Link>
      <Link to="/wishlist" className={item(pathname === '/wishlist')}><Heart size={20} /><span>Wishlist</span></Link>
      <button onClick={() => setCartOpen(true)} className={cn(item(false), 'relative')}>
        <ShoppingBag size={20} />
        {count > 0 && <span className="absolute right-6 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-ink">{count}</span>}
        <span>Bag</span>
      </button>
    </nav>
  );
}
