import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useUIStore } from '@/store/useUIStore';

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const count = useCartStore((s) => s.count());
  const wishCount = useWishlistStore((s) => s.ids.length);
  const { menuOpen, setMenuOpen, setCartOpen } = useUIStore();
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className={cn('fixed inset-x-0 top-0 z-40 transition-all duration-300', scrolled ? 'glass shadow-glass py-2.5' : 'bg-transparent py-4')}>
      <div className="container flex items-center justify-between gap-4">
        <button className="md:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </button>

        <Link to="/" className="font-display text-xl md:text-2xl tracking-tight leading-none">
          Maison<span className="text-gold"> Lumière</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => cn('link-underline tracking-wide', isActive && 'after:w-full')}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <form onSubmit={submitSearch} className="hidden lg:flex items-center rounded-full border border-ink/15 bg-white/50 px-3 py-1.5">
            <Search size={15} className="text-ink/50" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-28 bg-transparent px-2 text-sm outline-none placeholder:text-ink/40" />
          </form>
          <Link to="/wishlist" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5" aria-label="Wishlist">
            <Heart size={19} />
            {wishCount > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[9px] font-bold text-cream">{wishCount}</span>}
          </Link>
          <button onClick={() => setCartOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5" aria-label="Cart">
            <ShoppingBag size={19} />
            {count > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-ink">{count}</span>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm md:hidden" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed left-0 top-0 z-50 h-full w-72 bg-champagne p-6 shadow-lift md:hidden">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-xl">Menu</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5"><X size={18} /></button>
              </div>
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => cn('rounded-xl px-4 py-3 font-display text-lg transition', isActive ? 'bg-ink text-cream' : 'hover:bg-ink/5')}>
                    {l.label}
                  </NavLink>
                ))}
                <NavLink to="/login" onClick={() => setMenuOpen(false)} className="mt-4 rounded-xl px-4 py-3 text-sm text-ink/50 hover:bg-ink/5">Admin</NavLink>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
