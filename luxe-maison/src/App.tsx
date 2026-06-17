import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { initStore } from '@/lib/storage';
import { useProductStore } from '@/store/useProductStore';

import { StoreLayout } from '@/layouts/StoreLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';

import { Home } from '@/pages/Home';
import { Shop } from '@/pages/Shop';
import { ProductDetails } from '@/pages/ProductDetails';
import { Categories } from '@/pages/Categories';
import { Cart } from '@/pages/Cart';
import { Wishlist } from '@/pages/Wishlist';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';

import { AdminLogin } from '@/pages/admin/AdminLogin';
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('@/pages/admin/Products'));
const AdminCategories = lazy(() => import('@/pages/admin/Categories'));
const AdminBanners = lazy(() => import('@/pages/admin/Banners'));
const AdminInventory = lazy(() => import('@/pages/admin/Inventory'));

const Loader = () => (
  <div className="grid min-h-[60vh] place-items-center">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink/15 border-t-ink" />
  </div>
);

export default function App() {
  const load = useProductStore((s) => s.load);

  useEffect(() => {
    initStore();
    load();
  }, [load]);

  return (
    <Routes>
      {/* ---------- Storefront ---------- */}
      <Route element={<StoreLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ---------- Admin auth ---------- */}
      <Route path="/login" element={<AdminLogin />} />

      {/* ---------- Admin (protected) ---------- */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<Suspense fallback={<Loader />}><Dashboard /></Suspense>} />
        <Route path="/admin/products" element={<Suspense fallback={<Loader />}><AdminProducts /></Suspense>} />
        <Route path="/admin/categories" element={<Suspense fallback={<Loader />}><AdminCategories /></Suspense>} />
        <Route path="/admin/banners" element={<Suspense fallback={<Loader />}><AdminBanners /></Suspense>} />
        <Route path="/admin/inventory" element={<Suspense fallback={<Loader />}><AdminInventory /></Suspense>} />
      </Route>

      {/* legacy redirects */}
      <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
