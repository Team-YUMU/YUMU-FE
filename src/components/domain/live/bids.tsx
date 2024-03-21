import { cva, VariantProps } from 'class-variance-authority';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';

const bidVariants = cva('ml-[1.7rem] rounded-[1rem] border px-[3.1rem] py-[1.6rem]', {
  variants: {
    variant: {
      default: 'border-amber-400 bg-[#FFE8A3]',
      success: 'border-orange-600 bg-red-50',
    },
  },
  defaultVariants: { variant: 'default' },
});

interface BidProps extends VariantProps<typeof bidVariants> {
  user: string;
  bidPrice: number;
}

export function Bid({ user, bidPrice, variant }: BidProps) {
  function handleAvatar() {
    alert(user);
  }
  return (
    <div className={`relative flex flex-row items-center justify-start gap-[1.2rem] text-start`}>
      <Button variant={'ghost'} className='absolute left-0 size-[4rem] rounded-full p-0' onClick={handleAvatar}>
        <Avatar className='size-[4rem]'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback className='bg-stone-400'>{user}</AvatarFallback>
        </Avatar>
      </Button>
      <div className={cn(bidVariants({ variant }))}>
        <p className='text-16-400 text-black-0'>
          <span className='text-16-900'>{user}</span>님께서{' '}
          <span className='text-16-900'>{bidPrice.toLocaleString()}원</span>
          {variant === 'success' ? '으로 최종 낙찰되었습니다.' : ' 응찰하셨습니다.'}
        </p>
      </div>
    </div>
  );
}
