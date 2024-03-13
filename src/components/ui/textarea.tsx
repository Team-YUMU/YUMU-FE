import * as React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps {
  className?: string;
  rows?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export const Textarea: React.FC<TextareaProps> = ({ className, rows }) => {
  return (
    <textarea
      className={cn(
        'text-sm file:text-sm flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      rows={rows}
      placeholder='Type your message here.'
    />
  );
};
