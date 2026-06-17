import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-ink text-cream hover:bg-ink/90 hover:shadow-lift',
        ghost: 'border border-ink/20 hover:border-ink hover:bg-ink hover:text-cream',
        gold: 'bg-gold text-ink hover:brightness-105 hover:shadow-lift',
        soft: 'bg-white text-ink shadow-soft hover:shadow-lift',
        link: 'text-ink underline-offset-4 hover:underline rounded-none px-0',
      },
      size: { default: 'px-7 py-3', sm: 'px-4 py-2 text-xs', lg: 'px-9 py-4 text-base', icon: 'h-10 w-10 p-0' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  ),
);
Button.displayName = 'Button';
export { buttonVariants };
