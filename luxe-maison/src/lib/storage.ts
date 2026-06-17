import type { Product, Category, Banner, AdminUser } from '@/types';
import { sampleProducts } from '@/data/products';
import { sampleCategories } from '@/data/categories';
import { sampleBanners } from '@/data/banners';

const KEYS = {
  products: 'lf_products',
  categories: 'lf_categories',
  banners: 'lf_banners',
  admin: 'lf_admin',
  seeded: 'lf_seeded_v1',
} as const;

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
};

export const DEFAULT_ADMIN: AdminUser = { email: 'admin@luxefashion.com', password: 'Admin@123' };

export function initStore() {
  if (!localStorage.getItem(KEYS.seeded)) {
    write(KEYS.products, sampleProducts);
    write(KEYS.categories, sampleCategories);
    write(KEYS.banners, sampleBanners);
    write(KEYS.admin, DEFAULT_ADMIN);
    localStorage.setItem(KEYS.seeded, '1');
  }
}

export const storage = {
  getProducts: () => read<Product[]>(KEYS.products, sampleProducts),
  setProducts: (p: Product[]) => write(KEYS.products, p),
  getCategories: () => read<Category[]>(KEYS.categories, sampleCategories),
  setCategories: (c: Category[]) => write(KEYS.categories, c),
  getBanners: () => read<Banner[]>(KEYS.banners, sampleBanners),
  setBanners: (b: Banner[]) => write(KEYS.banners, b),
  getAdmin: () => read<AdminUser>(KEYS.admin, DEFAULT_ADMIN),
  setAdmin: (a: AdminUser) => write(KEYS.admin, a),
};
