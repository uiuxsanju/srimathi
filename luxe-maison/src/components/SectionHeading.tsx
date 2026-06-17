import { ScrollReveal } from './ScrollReveal';

export function SectionHeading({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <ScrollReveal className={center ? 'text-center max-w-2xl mx-auto' : ''}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-ink/60 text-sm md:text-base leading-relaxed">{subtitle}</p>}
    </ScrollReveal>
  );
}
