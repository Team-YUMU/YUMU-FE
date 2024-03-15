import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `placeholder:text-gray-B focus:outline-orange-F file:text-sm container h-[5rem] rounded-[0.8rem] border-[0.1rem] bg-gray-F px-[4rem] py-[1.5rem] text-16-400 outline-gray-E file:border-0 file:bg-transparent file:font-medium focus:bg-white focus-visible:ring-offset-2`,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
