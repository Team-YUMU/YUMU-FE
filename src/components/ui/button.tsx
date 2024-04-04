import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-red-F text-white hover:bg-red-F/90 focus:bg-red-F/80',
        outline: 'border border-red-F hover:bg-white outline-red-F text-red-F hover:bg-white/90',
        ghost: 'bg-transparent hover:bg-transparent focus:bg-transparent',
        sns: 'border border-yellow text-black-0 bg-yellow',
        myPage: 'bg-white border-gray-DF',
        myPageModal: 'absolute left-[35.5rem] top-[3.5rem] w-[3rem] h-[3rem]',
        myPageWish: 'absolute',
        myPageEditImageDelete: 'flex rounded-md  border-b-2 leading-[2rem] text-gray-9',
        myPageEditButton: 'inline-flex',
        myPageUserDelete: 'text-center',
        arrow: 'disabled:opacity-1 text-red-F disabled:text-gray-300 disabled:bg-white',
        exhibitionArrow: 'disabled:opacity-1 text-red-F hover:text-[#FF7752] disabled:text-gray-300',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 wp-10',
        auth: 'w-[43.8rem] h-[6.4rem]',
        header: 'w-[16rem] h-[4.8rem]  rounded-[0.6rem]',
        myPage: 'rounded-[3.7rem] border-[0.1rem] w-[28rem] h-[4.8rem] flex-shrink-0',
        myPageWish: 'left-[24.4rem] top-[1.4rem] bottom-[15.6rem] right-[1.3rem] w-[3.5rem] h-[3rem]',
        myPageEditImageDelete: 'h-10  px-4 py-2',
        myPageEditButton: ' py-[0.4rem] px-[0.1rem]',
        myPageUserDelete: 'w-[8rem] h-[2.3rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
