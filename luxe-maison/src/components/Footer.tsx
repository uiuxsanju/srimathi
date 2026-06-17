import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-cream/90">
      <div className="container grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-2xl">Maison <span className="text-gold">Lumière</span></p>
          <p className="mt-4 text-sm text-cream/60 leading-relaxed">Considered luxury for the modern woman — crafted in limited runs, delivered across India.</p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 hover:bg-cream hover:text-ink transition"><Icon size={16} /></a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="eyebrow !text-cream/50 mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm text-cream/70">
            <li><Link to="/shop?category=sarees" className="hover:text-cream">Sarees</Link></li>
            <li><Link to="/shop?category=gowns" className="hover:text-cream">Gowns</Link></li>
            <li><Link to="/shop?category=co-ord-sets" className="hover:text-cream">Co-Ord Sets</Link></li>
            <li><Link to="/shop?category=sale-collection" className="hover:text-cream">Sale</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-cream/50 mb-4">Maison</h4>
          <ul className="space-y-2.5 text-sm text-cream/70">
            <li><Link to="/about" className="hover:text-cream">Our story</Link></li>
            <li><Link to="/contact" className="hover:text-cream">Contact</Link></li>
            <li><Link to="/categories" className="hover:text-cream">Categories</Link></li>
            <li><Link to="/login" className="hover:text-cream">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-cream/50 mb-4">Newsletter</h4>
          <p className="text-sm text-cream/60 mb-3">First looks, private sales, no noise.</p>
          <div className="flex items-center rounded-full border border-cream/20 bg-cream/5 px-3 py-1.5">
            <Mail size={15} className="text-cream/50" />
            <input placeholder="Email address" className="w-full bg-transparent px-2 py-1 text-sm outline-none placeholder:text-cream/40" />
            <button className="rounded-full bg-cream px-4 py-1.5 text-xs font-medium text-ink hover:bg-gold transition">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} Maison Lumière. All rights reserved.</p>
          <p>Crafted in India · GST & UPI ready</p>
        </div>
      </div>
    </footer>
  );
}
