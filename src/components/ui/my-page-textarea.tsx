import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex h-[10rem] w-[28rem] flex-shrink-0 flex-col justify-center rounded-[1rem] border-[0.1rem] border-gray-9 px-[2.1rem] py-[1.2rem] text-16-500 leading-[2.7rem] outline-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
