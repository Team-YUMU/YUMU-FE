import Image from 'next/image';
import LikeButton from './LikeButton';

// 테스트용
type Art = {
  id: number;
  artName: string;
  artSubTitle: string;
  artImage: string;
  artist: string;
  status: string;
  createdAt: string;
  wishCnt: number;
};

export default function AuctionCard({ artName, artImage, artist }: Art) {
  return (
    <div className='relative p-1'>
      <div className='group relative h-[20rem] w-full overflow-hidden rounded-[0.6rem] bg-gray-100'>
        <Image src={artImage} alt={artName} className='transition-transform group-hover:scale-125' fill />
      </div>

      <div className='py-7'>
        <h3 className='mb-[0.5rem] truncate text-20-700'>{artName}</h3>
        <p className='truncate text-18-500 text-gray-99'>{artist}</p>
      </div>

      <LikeButton className='absolute right-[1.5rem] top-[1.4rem]' />
    </div>
  );
}
