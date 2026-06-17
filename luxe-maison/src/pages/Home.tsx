import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import { useCountdown } from '@/hooks/useCountdown';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Seo } from '@/components/Seo';

const testimonials = [
  { name: 'Aishwarya N.', city: 'Hyderabad', text: 'The saree I ordered arrived like a piece of art. Packaging, fabric, finish — everything whispered luxury.' },
  { name: 'Priya M.', city: 'Bengaluru', text: 'Ordered through WhatsApp, got styling help, and my gown fit perfectly. This is how online shopping should feel.' },
  { name: 'Tanvi R.', city: 'Mumbai', text: 'Quiet, elegant, and beautifully made. Maison Lumière has become my go-to for occasion wear.' },
];

const gallery = [
  '1490481651871-ab68de25d43d', '1483985988355-763728e1935b', '1525507119028-ed4c629a60a3',
  '1564257631407-4deb1f99d992', '1595777457583-95e059d581b8', '1566174053879-31528523f8ae',
];

function Hero() {
  const banners = useProductStore((s) => s.banners);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (banners.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % banners.length), 6000);
    return () => clearInterval(id);
  }, [banners.length]);

  if (!banners.length) return null;
  const b = banners[i];
  const go = (d: number) => setI((p) => (p + d + banners.length) % banners.length);

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={b.id}
          src={b.image} alt={b.title}
          initial={{ scale: 1.12, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

      <div className="container relative flex h-full flex-col justify-end pb-24 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={b.id} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.6 }} className="max-w-xl text-cream">
            <p className="eyebrow !text-cream/80 mb-4">Maison Lumière · {String(i + 1).padStart(2, '0')} / {String(banners.length).padStart(2, '0')}</p>
            <h1 className="font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl">{b.title}</h1>
            <p className="mt-5 max-w-md text-cream/80 md:text-lg">{b.subtitle}</p>
            <Link to={b.link} className="mt-8 inline-block">
              <Button variant="soft" size="lg">{b.cta} <ArrowRight size={18} /></Button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 right-4 flex gap-2 md:right-8">
        <button onClick={() => go(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full glass text-ink hover:bg-white"><ChevronLeft size={18} /></button>
        <button onClick={() => go(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full glass text-ink hover:bg-white"><ChevronRight size={18} /></button>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ['Free shipping over ₹4,999', 'Handcrafted in limited runs', 'WhatsApp styling concierge', 'Easy 7-day returns', 'GST invoice on request'];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-cream py-3">
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12 text-sm uppercase tracking-[0.2em] text-ink/70">{t} <span className="text-gold">✦</span></span>
        ))}
      </div>
    </div>
  );
}

export function Home() {
  const { products, categories } = useProductStore();
  const featured = categories.slice(0, 6);
  const newArrivals = [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
  const trending = products.filter((p) => p.trending).slice(0, 4);
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
  const flash = products.filter((p) => p.discount >= 25).slice(0, 3);
  const [tIdx, setTIdx] = useState(0);
  const saleEnd = Date.now() + 1000 * 60 * 60 * 14 + 1000 * 60 * 32;
  const { hours, minutes, seconds } = useCountdown(saleEnd);

  useEffect(() => {
    const id = setInterval(() => setTIdx((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const schema = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Maison Lumière',
    description: 'Luxury women\'s fashion brand in India.', url: 'https://maisonlumiere.example',
  };

  return (
    <>
      <Seo schema={schema} />
      <Hero />
      <Marquee />

      {/* Featured categories */}
      <section className="container py-20">
        <SectionHeading eyebrow="Explore" title="Shop by category" subtitle="From heirloom drapes to cosmopolitan tailoring — curated edits for every chapter." />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {featured.map((c, i) => (
            <ScrollReveal key={c.id} delay={(i % 3) * 0.08}>
              <Link to={`/shop?category=${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-cream">
                  <div>
                    <p className="eyebrow !text-cream/70">{c.description}</p>
                    <h3 className="font-display text-2xl">{c.name}</h3>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full glass text-ink transition group-hover:bg-white"><ArrowUpRight size={18} /></span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="container py-12">
        <div className="flex items-end justify-between">
          <SectionHeading center={false} eyebrow="Just landed" title="New arrivals" />
          <Link to="/shop?category=new-arrivals" className="hidden md:inline-flex"><Button variant="link">View all <ArrowRight size={16} /></Button></Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Flash sale */}
      {flash.length > 0 && (
        <section className="py-12">
          <div className="container">
            <div className="overflow-hidden rounded-3xl bg-ink text-cream">
              <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
                <div>
                  <p className="eyebrow !text-gold mb-3">Limited time</p>
                  <h2 className="font-display text-3xl md:text-5xl leading-tight">The Flash Atelier</h2>
                  <p className="mt-4 text-cream/70 max-w-sm">Up to 40% off select couture. When they're gone, they're gone.</p>
                  <div className="mt-7 flex gap-3">
                    {[['Hrs', hours], ['Min', minutes], ['Sec', seconds]].map(([label, val]) => (
                      <div key={label as string} className="grid h-16 w-16 place-content-center rounded-2xl bg-cream/10 text-center">
                        <span className="font-display text-2xl tabular-nums">{String(val).padStart(2, '0')}</span>
                        <span className="text-[10px] uppercase tracking-wider text-cream/50">{label}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/shop?category=sale-collection" className="mt-8 inline-block"><Button variant="gold">Shop the sale</Button></Link>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {flash.map((p) => (
                    <Link key={p.id} to={`/product/${p.id}`} className="group relative overflow-hidden rounded-xl">
                      <img src={p.images[0]} alt={p.name} className="aspect-[3/4] w-full object-cover transition group-hover:scale-105" />
                      <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-ink">-{p.discount}%</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trending */}
      <section className="container py-12">
        <SectionHeading eyebrow="Loved right now" title="Trending this week" />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Brand story */}
      <section className="container py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <ScrollReveal>
            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80" alt="Atelier" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="eyebrow mb-3">Our philosophy</p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">Luxury, made quietly and made to last</h2>
            <p className="mt-5 text-ink/65 leading-relaxed">We work with master artisans and small ateliers to produce in limited runs — never mass, never loud. Every drape, seam and finish is considered, so the piece you wear carries intention.</p>
            <Link to="/about" className="mt-7 inline-block"><Button variant="ghost">Read our story</Button></Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container py-12">
        <SectionHeading eyebrow="Tried & adored" title="Bestsellers" />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto mb-6 text-gold" size={36} />
          <AnimatePresence mode="wait">
            <motion.blockquote key={tIdx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.4 }}>
              <p className="font-display text-2xl md:text-3xl leading-snug">{testimonials[tIdx].text}</p>
              <footer className="mt-6 text-sm text-ink/55">— {testimonials[tIdx].name}, {testimonials[tIdx].city}</footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)} aria-label={`Testimonial ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === tIdx ? 'w-8 bg-ink' : 'w-2 bg-ink/25'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram gallery */}
      <section className="container py-12">
        <SectionHeading eyebrow="@maisonlumiere" title="On the gram" subtitle="Tag us to be featured in our community gallery." />
        <div className="mt-10 grid grid-cols-3 gap-2 md:grid-cols-6">
          {gallery.map((g, i) => (
            <a key={i} href="#" className="group relative aspect-square overflow-hidden rounded-xl">
              <img src={`https://images.unsplash.com/photo-${g}?auto=format&fit=crop&w=500&q=80`} alt="Instagram" loading="lazy" className="h-full w-full object-cover transition group-hover:scale-110" />
              <div className="absolute inset-0 grid place-items-center bg-ink/0 transition group-hover:bg-ink/40"><ArrowUpRight className="text-cream opacity-0 transition group-hover:opacity-100" /></div>
            </a>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container pb-8 pt-12">
        <div className="rounded-3xl bg-cream p-10 text-center md:p-16">
          <p className="eyebrow mb-3">The list</p>
          <h2 className="font-display text-3xl md:text-4xl">Join the Maison</h2>
          <p className="mx-auto mt-3 max-w-md text-ink/60">Private previews, atelier notes and member-only prices. We email rarely, and only when it matters.</p>
          <div className="mx-auto mt-7 flex max-w-md items-center rounded-full bg-white p-1.5 shadow-soft">
            <input placeholder="Your email address" className="w-full bg-transparent px-4 text-sm outline-none" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </>
  );
}
