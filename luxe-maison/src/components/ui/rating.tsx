import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Rating({ value, size = 14, className }: { value: number; size?: number; className?: string }) {
  return (
    <div className={cn('inline-flex items-center gap-0.5', className)} aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(value) ? 'fill-gold text-gold' : 'text-ink/20'}
        />
      ))}
    </div>
  );
}
