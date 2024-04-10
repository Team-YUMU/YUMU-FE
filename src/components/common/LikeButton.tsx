import Image from 'next/image';
import { useState } from 'react';
import { postWishAuction } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

type LikeButtonProps = {
  className?: string;
  auctionId?: number;
  isLogin: boolean;
};

export default function LikeButton({ className, auctionId, isLogin }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);

  const router = useRouter();

  const likeAuctionMutation = useMutation({
    mutationFn: (auctionId: number) => postWishAuction(auctionId),
  });

  const handleLikeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLogin) {
      setIsLiked((prevState) => !prevState);
      likeAuctionMutation.mutate(Number(auctionId));
    } else {
      router.push('/signin');
    }
  };

  return (
    <button type='button' className={`${className}`} onClick={handleLikeButtonClick}>
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
