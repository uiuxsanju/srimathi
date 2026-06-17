import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  coupon: string | null;
  add: (item: CartItem) => void;
  remove: (productId: string, size: string, color: string) => void;
  setQty: (productId: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: () => number;
  discountAmount: () => number;
  tax: () => number;
  total: () => number;
  count: () => number;
}

const COUPONS: Record<string, number> = { LUXE10: 10, WELCOME15: 15, FESTIVE20: 20 };

const key = (id: string, s: string, c: string) => `${id}__${s}__${c}`;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      add: (item) =>
        set((state) => {
          const idx = state.items.findIndex((i) => key(i.productId, i.size, i.color) === key(item.productId, item.size, item.color));
          if (idx > -1) {
            const items = [...state.items];
            items[idx] = { ...items[idx], quantity: items[idx].quantity + item.quantity };
            return { items };
          }
          return { items: [...state.items, item] };
        }),
      remove: (id, size, color) =>
        set((state) => ({ items: state.items.filter((i) => key(i.productId, i.size, i.color) !== key(id, size, color)) })),
      setQty: (id, size, color, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            key(i.productId, i.size, i.color) === key(id, size, color) ? { ...i, quantity: Math.max(1, qty) } : i,
          ),
        })),
      clear: () => set({ items: [], coupon: null }),
      applyCoupon: (code) => {
        const c = code.toUpperCase().trim();
        if (COUPONS[c]) { set({ coupon: c }); return true; }
        return false;
      },
      removeCoupon: () => set({ coupon: null }),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      discountAmount: () => {
        const c = get().coupon;
        if (!c) return 0;
        return Math.round((get().subtotal() * (COUPONS[c] || 0)) / 100);
      },
      tax: () => Math.round((get().subtotal() - get().discountAmount()) * 0.05),
      total: () => get().subtotal() - get().discountAmount() + get().tax(),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: 'lf_cart' },
  ),
);
