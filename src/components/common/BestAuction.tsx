import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import AuctionCard from '@/components/common/AuctionCard';
import testArts from '@/mocks/testArts.json';

type BestAuctionProps = {
  className?: string;
  popularRef?: React.RefObject<HTMLDivElement>;
};

export function BestAuction({ className = '', popularRef }: BestAuctionProps) {
  const artData = testArts.results;
  const [arts, setArts] = useState(artData);
  const [today, setToday] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    setToday(year + '.' + month + '.' + day);
  }, []);

  return (
    <section className={`flex flex-col gap-10 ${className}`}>
      <div>
        <h2 className='mb-[1rem] font-TheJamsil text-36-400 text-black-2'>인기 경매</h2>
        <p className='text-18-500 text-gray-9'>{today} 기준</p>
      </div>

      <Carousel className='w-full' ref={popularRef}>
        <CarouselContent className='-ml-4'>
          {arts.map((item) => (
            <CarouselItem key={item.id} className='basis-1/4 pl-[1.6rem]'>
              <Link href={`/auction/${item.id}/detail`}>
                <AuctionCard {...item} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
