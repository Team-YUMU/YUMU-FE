import { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';

interface ChatProps {
  user: string;
  children: ReactNode;
}

export function Chat({ user, children }: ChatProps) {
  const checkIsUserMe = user === 'Me' ? 'flex-row-reverse text-end' : 'flex-row text-start';
  function handleAvatar() {
    alert(user);
  }
  return (
    <div className={`flex ${checkIsUserMe} items-center justify-start gap-[1.2rem]`}>
      <div className={`${checkIsUserMe} flex items-center justify-center gap-[0.8rem]`}>
        <Button variant={'ghost'} className='size-6 rounded-full p-0' onClick={handleAvatar}>
          <Avatar className='h-[24px] w-[24px]'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback className='bg-stone-400'>{user}</AvatarFallback>
          </Avatar>
        </Button>
        <p className='text-15-400 text-stone-300'>{user}</p>
      </div>
      <p className='bg-white text-15-400'>{children}</p>
    </div>
  );
}
