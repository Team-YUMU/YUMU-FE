import { ReactNode } from 'react';
import { Avatar, AvatarFallback } from '../../ui/avatar';

interface ChatProps {
  memberId: string;
  children: ReactNode;
}

export function Chat({ memberId, children }: ChatProps) {
  const checkIsUserMe = memberId === 'Me' ? 'flex-row-reverse text-end' : 'flex-row text-start';
  return (
    <div className={`flex ${checkIsUserMe} items-center justify-start gap-[1.2rem]`}>
      <div className={`${checkIsUserMe} flex items-center justify-center gap-[0.8rem]`}>
        <Avatar className='h-[24px] w-[24px]'>
          <AvatarFallback className='border bg-white text-12-700'>{memberId[0]}</AvatarFallback>
        </Avatar>
        <p className='text-15-400 text-stone-300'>{memberId}</p>
      </div>
      <p className='bg-white text-15-400'>{children}</p>
    </div>
  );
}
