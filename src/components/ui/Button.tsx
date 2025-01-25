import React from 'react';
    import { cn } from '@/lib/utils';
    import { LoadingSpinner } from './LoadingSpinner';

    interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: 'primary' | 'secondary' | 'ghost';
      size?: 'sm' | 'md' | 'lg';
      loading?: boolean;
    }

    export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
      ({ className, variant = 'primary', size = 'md', loading = false, children, ...props }, ref) => {
        return (
          <button
            ref={ref}
            className={cn(
              'inline-flex items-center justify-center rounded-md font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              {
                'bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90': variant === 'primary',
                'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
                'hover:bg-gray-100': variant === 'ghost',
                'h-9 px-4 text-sm': size === 'sm',
                'h-11 px-6 text-base': size === 'md',
                'h-14 px-8 text-lg': size === 'lg',
              },
              className
            )}
            disabled={loading}
            {...props}
          >
            {loading ? <LoadingSpinner size={size} /> : children}
          </button>
        );
      }
    );
