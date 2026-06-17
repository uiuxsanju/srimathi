import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileTabBar } from '@/components/MobileTabBar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CartDrawer } from '@/components/CartDrawer';

export function StoreLayout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 pb-16 md:pb-0"
      >
        <Outlet />
      </motion.main>
      <Footer />
      <MobileTabBar />
      <WhatsAppButton />
      <CartDrawer />
    </div>
  );
}
