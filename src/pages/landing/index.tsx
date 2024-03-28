import React, { useRef } from 'react';
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

export default function Landing() {
  const router = useRouter();
  const popularRef = useRef<HTMLDivElement>(null);

  const moveToArtist = () => {
    popularRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <>
      {/* 텍스트 박스 밑에 margin 없애기 */}
      <main className='mx-auto max-w-[137.5rem] bg-[pink] pt-[4rem]'>
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
              }}
              plugins={[Autoplay({ delay: 4000 })]}
              className='mr-[8.2rem] w-full max-w-[87.2rem]'
            >
              <CarouselContent className='-ml-2'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index}>
                    <CarouselItem className='basis-1/3 pl-2'>
                      <div className='p-1'>
                        <Image
                          src='/svgs/openLive.svg'
                          alt=''
                          width={280}
                          height={200}
                          className='max-h-[20rem] max-w-[28rem]'
                        />
                        <p className='mt-[1.5rem] text-20-700'>국내 스마트 워치 타니 프로2</p>
                        <p className='max-w-[19.1rem] text-18-500 text-[#999]'>국내앱 국내개발 국내보안 국내 최적화</p>
                      </div>
                    </CarouselItem>
                    <CarouselItem className='mt-[4rem] basis-1/3 pl-2'>
                      <div className='p-1'>
                        <Image
                          src='/svgs/openLive.svg'
                          alt=''
                          width={280}
                          height={200}
                          className='max-h-[20rem] max-w-[28rem]'
                        />
                        <p className='mt-[1.5rem] text-20-700'>국내 스마트 워치 타니 프로2</p>
                        <p className='max-w-[19.1rem] text-18-500 text-[#999]'>국내앱 국내개발 국내보안 국내 최적화</p>
                      </div>
                    </CarouselItem>
                  </div>
                ))}
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
          </div>
        </section>
        <section className='mt-[8rem]'>
          <BestAuction popularRef={popularRef} />
        </section>
      </main>
    </>
  );
}
