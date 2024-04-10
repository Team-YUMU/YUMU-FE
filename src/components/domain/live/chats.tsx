import { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

interface ChatProps {
  memberId: string;
  memberImage?: string;
  mynickname?: string;
  children: ReactNode;
}

export function Chat({ memberId, memberImage, mynickname, children }: ChatProps) {
  const checkIsUserMe = memberId === mynickname ? 'flex-row-reverse text-end' : 'flex-row text-start';
  return (
    <div className={`flex ${checkIsUserMe} items-center justify-start gap-[1.2rem]`}>
      <div className={`${checkIsUserMe} flex items-center justify-center gap-[0.8rem]`}>
        <Avatar className='h-[24px] w-[24px]'>
          {/* <AvatarImage src={memberImage} /> */}
          <AvatarFallback className='border bg-white text-12-700'>{memberId[0]}</AvatarFallback>
        </Avatar>
        <p className='text-15-400 text-stone-300'>{memberId}</p>
      </div>
      <p className='bg-white text-15-400'>{children}</p>
    </div>
  );
}
