import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Seo } from '@/components/Seo';

export function Categories() {
  const { categories, products } = useProductStore();
  const count = (slug: string) => products.filter((p) => p.category === slug).length;

  return (
    <>
      <Seo title="Categories" description="Explore every Maison Lumière edit — sarees, gowns, ethnic and western wear." />
      <div className="container pt-28">
        <SectionHeading eyebrow="Browse" title="Our edits" subtitle="Ten curated worlds, each with its own mood and craft." />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <ScrollReveal key={c.id} delay={(i % 3) * 0.06}>
              <Link to={`/shop?category=${c.slug}`} className="group relative block aspect-[5/4] overflow-hidden rounded-3xl">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-cream">
                  <p className="eyebrow !text-cream/70 mb-1">{count(c.slug)} pieces</p>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-3xl">{c.name}</h3>
                    <span className="grid h-11 w-11 place-items-center rounded-full glass text-ink transition group-hover:bg-white"><ArrowUpRight size={20} /></span>
                  </div>
                  <p className="mt-1 text-sm text-cream/70">{c.description}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </>
  );
}
