import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tags, Image, Boxes, LogOut, Store, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Tags },
  { to: '/admin/banners', label: 'Banners', icon: Image },
  { to: '/admin/inventory', label: 'Inventory', icon: Boxes },
];

function ThemeToggle({ className }: { className?: string }) {
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        'flex items-center justify-center rounded-xl border border-ink/10 bg-white/60 p-2.5 text-ink/70 transition hover:bg-ink/5',
        className,
      )}
    >
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export function AdminLayout() {
  const logout = useAuthStore((s) => s.logout);
  const theme = useUIStore((s) => s.theme);
  const navigate = useNavigate();

  const signOut = () => { logout(); navigate('/login'); };

  return (
    <div className={cn('flex min-h-screen bg-champagne text-ink', theme === 'dark' && 'dark')}>
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-ink/10 bg-white/60 p-5 md:flex">
        <Link to="/admin" className="mb-8 font-display text-xl">
          Maison <span className="text-gold">Admin</span>
        </Link>
        <nav className="flex-1 space-y-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition',
                  isActive ? 'bg-ink text-cream' : 'hover:bg-ink/5',
                )
              }
            >
              <Icon size={17} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-1 border-t border-ink/10 pt-4">
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-xs text-ink/45">Appearance</span>
            <ThemeToggle />
          </div>
          <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm hover:bg-ink/5">
            <Store size={17} /> View store
          </Link>
          <button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-red-600 hover:bg-red-500/10">
            <LogOut size={17} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex items-center justify-between border-b border-ink/10 bg-white/60 px-5 py-4 md:hidden">
          <Link to="/admin" className="font-display text-lg">Maison <span className="text-gold">Admin</span></Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={signOut} className="rounded-xl border border-ink/10 bg-white/60 p-2.5 text-red-600"><LogOut size={17} /></button>
          </div>
        </header>
        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-ink/10 bg-white/40 px-4 py-2 md:hidden">
          {nav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn('whitespace-nowrap rounded-full px-3 py-1.5 text-xs', isActive ? 'bg-ink text-cream' : 'bg-ink/5')
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <main className="flex-1 overflow-y-auto p-5 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
