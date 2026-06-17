import { cn } from '@/lib/utils';

export function Badge({ children, className, tone = 'dark' }: { children: React.ReactNode; className?: string; tone?: 'dark' | 'gold' | 'cream' }) {
  const tones = {
    dark: 'bg-ink text-cream',
    gold: 'bg-gold text-ink',
    cream: 'bg-cream text-ink',
  };
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]', tones[tone], className)}>
      {children}
    </span>
  );
}
