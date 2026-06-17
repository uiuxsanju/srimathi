import { create } from 'zustand';

type Theme = 'light' | 'dark';

const THEME_KEY = 'lf_theme';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(THEME_KEY) as Theme | null;
  return saved === 'dark' || saved === 'light' ? saved : 'light';
};

interface UIState {
  cartOpen: boolean;
  menuOpen: boolean;
  /** Admin-only theme. Scoped to the admin layout wrapper, never the storefront. */
  theme: Theme;
  setCartOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  cartOpen: false,
  menuOpen: false,
  theme: getInitialTheme(),
  setCartOpen: (v) => set({ cartOpen: v }),
  setMenuOpen: (v) => set({ menuOpen: v }),
  setTheme: (theme) => {
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* quota */ }
    set({ theme });
  },
  toggleTheme: () => get().setTheme(get().theme === 'dark' ? 'light' : 'dark'),
}));
