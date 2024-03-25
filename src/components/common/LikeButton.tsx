import Image from 'next/image';
import { useState } from 'react';

type LikeButtonProps = {
  className?: string;
};
export default function LikeButton({ className }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLiked((prevState) => !prevState);
  };

  return (
    <button type='button' className={`${className}`} onClick={handleToggleLike}>
      <div className='relative h-[3rem] w-[3.5rem]'>
        <Image
          src={isLiked ? '/images/heart_on.png' : '/images/heart_off.png'}
          alt={isLiked ? '찜 해제' : '찜 하기'}
          fill
        />
      </div>
    </button>
  );
}
