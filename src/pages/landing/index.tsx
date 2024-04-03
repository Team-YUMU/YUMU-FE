import React, { useEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  MainCarouselPrevious,
  MainCarouselNext,
} from '@/components/ui/mainCarousel';
import { ExhibitionCarousel } from '@/components/common/ExhibitionCarousel';
import LandingBanner from '@/components/domain/landing/LandingBanner';
import LandingLivePopular from '@/components/domain/landing/LandingLivePopular';
import { BestAuction } from '@/components/common/BestAuction';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getAuction } from '@/services/api';
import LikeButton from '@/components/common/LikeButton';

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

export default function Landing() {
  const router = useRouter();
  const popularRef = useRef<HTMLDivElement>(null);
  const [liveSoonData, setLiveSoonData] = useState<popularProps[]>([]);
  const [liveSoonDataSecond, setLiveSoonDataSecond] = useState<popularProps[]>([]);
  const pageSize = 15;

  const loadLiveSoonData = async () => {
    try {
      const res = await getAuction(1, pageSize, 'liveSoon', '');
      const data = res.auctions;
      console.log(data);
      setLiveSoonData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadLiveSoonDataSecond = async () => {
    try {
      const res = await getAuction(1, pageSize, 'liveSoon', '');
      const data = res.auctions;
      console.log(data);
      setLiveSoonDataSecond(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLiveSoonData();
  }, []);

  const moveToArtist = () => {
    popularRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex === liveSoonData.length - 1 ? 0 : prevIndex + 1));
  // };

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex === 0 ? liveSoonData.length - 1 : prevIndex - 1));
  // };

  return (
    <>
      {/* 텍스트 박스 밑에 margin 없애기 */}
      <main className='mx-auto max-w-[137.5rem] pt-[4rem]'>
        <LandingBanner />
        <section className='mx-auto flex max-w-[136.9rem] justify-between'>
          <LandingLivePopular moveToArtist={moveToArtist} />
        </section>
        <section className='mt-[8rem]'>
          <ExhibitionCarousel />
        </section>
        <section>
          <div className='mx-auto mt-[8rem] flex max-w-[136.8rem] justify-between'>
            <div>
              <Image src='/svgs/openLive.svg' alt='' width={313} height={293} />
              <div>
                <p className='mt-[4rem] font-TheJamsil text-36-400 text-[#222]'>오픈 예정 Live 경매</p>
                <p className='mt-[1rem] text-18-500 leading-[2rem] text-[#9E9E9E]'>매력적인 예술품이 곧 오픈 됩니다.</p>
                <button
                  onClick={() => {
                    router.push(`/search?sort=${encodeURIComponent('liveSoon')}`);
                  }}
                  className='mt-[4rem] rounded-[3.7rem] border border-[#DFDFDF;] px-[7.7rem] py-[1.3rem] text-16-500 text-[#999] hover:border-[#FF7752] hover:text-red-F/90'
                >
                  라이브 경매 더보기
                </button>
              </div>
            </div>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[Autoplay({ delay: 4000 })]}
              className='mr-[8.2rem] w-full max-w-[87.2rem] bg-pink'
            >
              <CarouselContent className='-ml-1 flex basis-1/3  flex-wrap'>
                <CarouselItem className='flex  flex-wrap pl-1'>
                  <div className='flex basis-1/3 bg-red '>
                    {liveSoonData.map((item, index) => (
                      <div key={index} className='relative'>
                        <div className='p-1'>
                          <Image src={item.artImage} alt='' width={280} height={200} className='h-[20rem] w-[28rem]' />
                          <p className='mt-[1.5rem] text-20-700'>{item.artName}</p>
                          <p className='w-[19.1rem] text-18-500 text-[#999]'>{item.artSubTitle}</p>
                        </div>
                        <LikeButton className='absolute right-[1.5rem] top-[1.4rem]' />
                      </div>
                    ))}
                  </div>
                  <div className='flex basis-1/3'>
                    {liveSoonData.map((item, index) => (
                      <div key={index} className='relative'>
                        <div className='p-1'>
                          <Image src={item.artImage} alt='' width={280} height={200} className='h-[20rem] w-[28rem]' />
                          <p className='mt-[1.5rem] text-20-700'>{item.artName}</p>
                          <p className='w-[19.1rem] text-18-500 text-[#999]'>{item.artSubTitle}</p>
                        </div>
                        <LikeButton className='absolute right-[1.5rem] top-[1.4rem]' />
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              </CarouselContent>
              <MainCarouselPrevious
                type='button'
                variant='arrow'
                className='-left-32  h-[7.7rem] w-[7.7rem] rounded-full border-transparent bg-[#fff] shadow-lg'
              />
              <MainCarouselNext
                type='button'
                variant='arrow'
                className='-right-32  h-[7.7rem] w-[7.7rem] rounded-full border-transparent bg-[#fff] shadow-lg'
              />
            </Carousel>
            {/* <div className='relative w-full'>
              <button
                className='absolute inset-y-0 left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 bg-opacity-50 text-white'
                onClick={prevSlide}
              >
                이전
              </button>
              <button
                className='absolute inset-y-0 right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 bg-opacity-50 text-white'
                onClick={nextSlide}
              >
                다음
              </button>
              <div className='absolute mr-[8.2rem] grid  w-[87.2rem]  grid-flow-col grid-rows-2  gap-4 bg-pink'>
                {liveSoonData.map((item, index) => (
                  <div
                    key={index}
                    className=' basis-1/3'
                    // className={`transition-opacity duration-500 ${
                    //   index === currentIndex ? 'opacity-100' : 'opacity-0'
                    // }`}
                  >
                    <div className='rounded-lg bg-gray-200 p-4'>
                      <Image
                        src={item.artImage}
                        alt={item.artName}
                        width={280}
                        height={200}
                        className='h-[20rem] w-[28rem]'
                      />
                      <p className='text-lg mt-2 font-semibold'>{item.artSubTitle}</p>
                      <p className='text-gray-600'>{item.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
          </div>
        </section>
        <section className='mt-[8rem]'>
          <BestAuction popularRef={popularRef} />
        </section>
      </main>
    </>
  );
}
