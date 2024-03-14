import Image from 'next/image';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { ArtType } from '@/types/types';

export default function AuctionCard({ artTitle, artImage, artist, wishCnt }: ArtType) {
  return (
    <Card className='rounded-none border-none shadow-none'>
      <div className='group relative aspect-card-image w-full overflow-hidden'>
        <Image fill src={artImage} alt={artTitle} className='transition-transform group-hover:scale-125' />
      </div>
      <div className='py-7'>
        <CardTitle className='mb-3 truncate text-16-500'>{artTitle}</CardTitle>
        <CardDescription className='truncate text-14-400'>{artist}</CardDescription>
      </div>
      <div>
        <span>찜{wishCnt}</span>
      </div>
    </Card>
  );
}
