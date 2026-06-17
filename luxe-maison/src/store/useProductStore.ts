import { create } from 'zustand';
import type { Product, Category, Banner } from '@/types';
import { storage } from '@/lib/storage';

interface ProductState {
  products: Product[];
  categories: Category[];
  banners: Banner[];
  load: () => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (c: Category) => void;
  updateCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;
  addBanner: (b: Banner) => void;
  updateBanner: (b: Banner) => void;
  deleteBanner: (id: string) => void;
  reorderBanners: (banners: Banner[]) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: [],
  banners: [],
  load: () =>
    set({
      products: storage.getProducts(),
      categories: storage.getCategories(),
      banners: storage.getBanners().sort((a, b) => a.order - b.order),
    }),

  addProduct: (p) => { const products = [p, ...get().products]; storage.setProducts(products); set({ products }); },
  updateProduct: (p) => { const products = get().products.map((x) => (x.id === p.id ? p : x)); storage.setProducts(products); set({ products }); },
  deleteProduct: (id) => { const products = get().products.filter((x) => x.id !== id); storage.setProducts(products); set({ products }); },

  addCategory: (c) => { const categories = [...get().categories, c]; storage.setCategories(categories); set({ categories }); },
  updateCategory: (c) => { const categories = get().categories.map((x) => (x.id === c.id ? c : x)); storage.setCategories(categories); set({ categories }); },
  deleteCategory: (id) => { const categories = get().categories.filter((x) => x.id !== id); storage.setCategories(categories); set({ categories }); },

  addBanner: (b) => { const banners = [...get().banners, b]; storage.setBanners(banners); set({ banners }); },
  updateBanner: (b) => { const banners = get().banners.map((x) => (x.id === b.id ? b : x)); storage.setBanners(banners); set({ banners }); },
  deleteBanner: (id) => { const banners = get().banners.filter((x) => x.id !== id); storage.setBanners(banners); set({ banners }); },
  reorderBanners: (banners) => { const reordered = banners.map((b, i) => ({ ...b, order: i })); storage.setBanners(reordered); set({ banners: reordered }); },
}));
