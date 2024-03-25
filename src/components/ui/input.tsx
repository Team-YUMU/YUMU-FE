import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputVariants = cva(`file:text-sm container file:border-0 file:bg-transparent file:font-medium `, {
  variants: {
    variant: {
      default:
        'bg-gray-F placeholder:text-gray-B focus:bg-white focus:outline-orange-F focus-visible:ring-offset-2 h-[5rem] rounded-[0.8rem] border-[0.1rem] px-[4rem] py-[1.5rem] text-16-400 outline-gray-E',
      chat: 'border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
      header: 'h-[4.8rem] w-[44rem] rounded-[0.6rem] border border-red-F px-[2rem] py-[1.5rem]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, variant, ...props }, ref) => {
  return <input type={type} className={cn(InputVariants({ variant, className }))} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input, InputVariants };
