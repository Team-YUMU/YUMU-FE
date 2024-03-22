import Image from 'next/image';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { ArtProps } from '@/types/types';

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

function formatDate(value: number) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

export default function AuctionCard({ artName, artImage, artist, createdAt, wishCnt }: Art) {
  return (
    <Card className='rounded-none border-none shadow-none'>
      <div className='group relative aspect-card-image w-full overflow-hidden bg-gray-100 '>
        <Image fill src={artImage} alt={artName} className='transition-transform group-hover:scale-125' />
      </div>
      <div className='py-7'>
        <CardTitle className='mb-3 truncate text-16-500'>{artName}</CardTitle>
        <CardDescription className='truncate text-14-400'>{artist}</CardDescription>
      </div>
      <div>
        <span>{formatDate(createdAt)}</span> <br />
        <span>찜{wishCnt}</span>
      </div>
    </Card>
  );
}
