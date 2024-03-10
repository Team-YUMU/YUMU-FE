import { ReactNode } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';

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
    <div className={`flex ${checkIsUserMe} items-center justify-start gap-2`}>
      <Button variant={'ghost'} className='h-6 w-6 hover:bg-transparent' onClick={handleAvatar}>
        <Avatar className='h-6 w-6'>
          <AvatarFallback>{user}</AvatarFallback>
        </Avatar>
      </Button>
      <p className='text-12-500 bg-white'>{children}</p>
    </div>
  );
}
