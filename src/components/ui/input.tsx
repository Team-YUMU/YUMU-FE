import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `file:text-sm container h-[5rem] rounded-[0.8rem] border-[0.1rem] bg-gray-F px-[4rem] py-[1.5rem] text-16-400 outline-gray-E file:border-0 file:bg-transparent file:font-medium placeholder:text-gray-B focus:bg-white focus:outline-orange-F focus-visible:ring-offset-2`,
        `header h-[4.8rem] w-[44rem] rounded-[0.6rem] border border-red-400 px-[2rem] py-[1.5rem] `,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
