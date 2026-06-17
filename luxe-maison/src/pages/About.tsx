import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Seo } from '@/components/Seo';

const values = [
  { t: 'Craft over speed', d: 'Limited runs from small ateliers. We make fewer, better things.' },
  { t: 'Considered materials', d: 'Real silk, breathable cottons, responsibly sourced fabrics.' },
  { t: 'Honest pricing', d: 'Atelier quality without the multi-brand markup.' },
  { t: 'Personal service', d: 'A real human on WhatsApp to help you choose and style.' },
];

export function About() {
  return (
    <>
      <Seo title="Our Story" description="The story, mission and philosophy behind Maison Lumière." />
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1800&q=80" alt="Atelier" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="container relative flex h-full flex-col justify-center text-cream">
          <ScrollReveal>
            <p className="eyebrow !text-cream/80 mb-3">Est. 2024 · Made in India</p>
            <h1 className="font-display text-4xl md:text-6xl max-w-2xl leading-[1.05]">Luminous by design, considered by intent</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <ScrollReveal>
            <p className="eyebrow mb-3">Our story</p>
            <h2 className="font-display text-3xl leading-tight">Born from a love of craft</h2>
            <p className="mt-4 text-ink/65 leading-relaxed">Maison Lumière began with a simple frustration: occasion wear was either mass-produced and soulless, or beautiful and impossibly priced. We set out to bridge that gap — partnering directly with weavers and ateliers to bring you genuinely luxurious pieces, made in small batches, sold honestly.</p>
            <p className="mt-4 text-ink/65 leading-relaxed">Every saree, gown and co-ord is chosen for how it feels to wear, not just how it photographs. The result is a wardrobe of quiet confidence.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80" alt="Detail" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-soft" />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container grid gap-12 md:grid-cols-2">
          <ScrollReveal>
            <p className="eyebrow mb-3">Mission</p>
            <h3 className="font-display text-2xl leading-snug">To make considered luxury accessible to the modern Indian woman — without compromise on craft.</h3>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="eyebrow mb-3">Vision</p>
            <h3 className="font-display text-2xl leading-snug">A world where what you wear is made with intention, by people who are paid fairly, to last for years.</h3>
          </ScrollReveal>
        </div>
      </section>

      <section className="container py-20">
        <SectionHeading eyebrow="What we stand for" title="Our values" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <ScrollReveal key={v.t} delay={(i % 4) * 0.06}>
              <div className="h-full rounded-2xl bg-white/70 p-6 shadow-glass">
                <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="mt-3 font-display text-xl">{v.t}</h4>
                <p className="mt-2 text-sm text-ink/60 leading-relaxed">{v.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
