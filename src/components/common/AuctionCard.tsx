import Image from 'next/image';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { ArtProps } from '@/types/types';

export default function AuctionCard({ artName, artImage, artist, wishCnt }: ArtProps) {
  return (
    <Card className='rounded-none border-none shadow-none'>
      <div className='group relative aspect-card-image w-full overflow-hidden'>
        <Image fill src={artImage} alt={artName} className='transition-transform group-hover:scale-125' />
      </div>
      <div className='py-7'>
        <CardTitle className='mb-3 truncate text-16-500'>{artName}</CardTitle>
        <CardDescription className='truncate text-14-400'>{artist}</CardDescription>
      </div>
      <div>
        <span>찜{wishCnt}</span>
      </div>
    </Card>
  );
}
