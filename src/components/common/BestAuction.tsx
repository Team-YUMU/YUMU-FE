import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { getAuction } from '@/services/api';

type BestAuctionProps = {
  className?: string;
  popularRef?: React.RefObject<HTMLDivElement>;
};

interface popularProps {
  id: number;
  artName: string;
  artSubTitle: string;
  artImage: string;
  artist: string;
  status: string;
  createdAt: string;
  wishCnt: number;
}

export function BestAuction({ className = '', popularRef }: BestAuctionProps) {
  const [today, setToday] = useState('');
  const [popularData, setPopularData] = useState<popularProps[]>([]);
  const pageSize = 30;

  const loadPopularAuctionData = async () => {
    try {
      const loadData = await getAuction(0, pageSize, 'popular', '');
      const auctionData = loadData.auctions;
      console.log(auctionData);
      setPopularData(auctionData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPopularAuctionData();
  }, []);

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

      <Carousel
        className='w-full'
        ref={popularRef}
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[Autoplay({ delay: 4000 })]}
      >
        <CarouselContent className='-ml-2'>
          {popularData.map((item) => (
            <CarouselItem key={item.id} className='basis-1/4 pl-2'>
              <Link href={`/auction/${item.id}/detail`}></Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
