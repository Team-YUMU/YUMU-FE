import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { getAuction } from '@/services/api';
import Image from 'next/image';
import LikeButton from '@/components/common/LikeButton';

type BestAuctionProps = {
  className?: string;
  popularRef?: React.RefObject<HTMLDivElement>;
  isLogin: boolean;
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

function LandingPopular({ className = '', popularRef, isLogin }: BestAuctionProps) {
  const [today, setToday] = useState('');
  const [popularData, setPopularData] = useState<popularProps[]>([]);
  const pageSize = 30;

  const loadPopularAuctionData = async () => {
    try {
      const loadData = await getAuction(1, pageSize, 'popular', '');
      console.log(loadData);
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
              <Link href={`/auction/${item.id}/detail`}>
                <div className='relative'>
                  <div className='group relative mb-[1.5rem] h-[20rem] w-full overflow-hidden rounded-[0.6rem] bg-gray-100'>
                    <Image
                      src={item.artImage}
                      alt={item.artName}
                      className='transition-transform group-hover:scale-125'
                      fill
                    />
                  </div>
                  <div className='mb-3 min-h-[6.2rem]'>
                    <h3 className='mb-[0.5rem] truncate text-20-700'>{item.artName}</h3>
                    <p className='truncate text-18-500 text-gray-99'>{item.artSubTitle}</p>
                  </div>
                  <div className='flex items-center gap-[0.6rem]'>
                    <Image src='/images/heart.png' alt='찜한 수' width={24} height={20} />
                    <span className='text-16-500 text-gray-99'>{item.wishCnt}</span>
                  </div>
                  <LikeButton className='absolute right-[1.5rem] top-[1.4rem]' auctionId={item.id} isLogin={isLogin} />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default LandingPopular;
