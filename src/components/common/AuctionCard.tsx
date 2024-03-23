import Image from 'next/image';
import { useState } from 'react';

// 테스트용
type Art = {
  id: number;
  artName: string;
  artImage: string;
  artist: string;
  status: string;
  createdAt: number;
  wishCnt: number;
};

export default function AuctionCard({ artName, artImage, artist }: Art) {
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLiked((prevState) => !prevState);
  };

  return (
    <div className='relative'>
      <div className='group relative h-[20rem] w-full overflow-hidden rounded-[0.6rem] bg-gray-100'>
        <Image src={artImage} alt={artName} className='transition-transform group-hover:scale-125' fill />
      </div>

      <div className='py-7'>
        <h3 className='mb-[0.5rem] truncate text-20-700'>{artName}</h3>
        <p className='truncate text-18-500 text-gray-99'>{artist}</p>
      </div>

      <button type='button' className='absolute right-[1.5rem] top-[1.4rem]' onClick={handleToggleLike}>
        <div className='relative h-[3rem] w-[3.5rem]'>
          <Image
            src={isLiked ? '/images/heart_on.png' : '/images/heart_off.png'}
            alt={isLiked ? '찜 해제' : '찜 하기'}
            fill
          />
        </div>
      </button>
    </div>
  );
}
