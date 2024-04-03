import Image from 'next/image';
import LikeButton from './LikeButton';
import { AuctionProps } from '@/types/types';

export default function AuctionCard({ artName, artImage, artSubTitle, artist, wishCnt }: AuctionProps) {
  return (
    <div className='relative'>
      <div className='group relative mb-[1.5rem] h-[20rem] w-full overflow-hidden rounded-[0.6rem] bg-gray-100'>
        <Image src={artImage} alt={artName} className='transition-transform group-hover:scale-125' fill />
      </div>

      <div className='mb-3 min-h-[6.2rem]'>
        <h3 className='mb-[0.5rem] truncate text-20-700'>{artSubTitle}</h3>
        <p className='truncate text-18-500 text-gray-99'>{artist}</p>
      </div>

      <div className='flex items-center gap-[0.6rem]'>
        <Image src='/images/heart.png' alt='찜한 수' width={24} height={20} />
        <span className='text-16-500 text-gray-99'>{wishCnt}</span>
      </div>

      <LikeButton className='absolute right-[1.5rem] top-[1.4rem]' />
    </div>
  );
}
