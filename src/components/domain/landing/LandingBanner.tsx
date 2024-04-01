import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  MainCarouselPrevious,
  MainCarouselNext,
  type CarouselApi,
} from '@/components/ui/mainCarousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

const BannerInformation = [
  {
    src: '/svgs/banner-1.svg',
    title: (
      <>
        1. 놓치면 아쉬운 <br /> 종료임박 프로젝트
      </>
    ),
    subTitle: (
      <>
        서포터님의 사랑은 받은 <br />
        인기프로젝트가 곧 끝나요 <br />
        프로젝트가 종료되기 전 살펴보세요!
      </>
    ),
  },
  {
    src: '/svgs/banner-1.svg',
    title: (
      <>
        2. 놓치면 아쉬운 <br /> 종료임박 프로젝트
      </>
    ),
    subTitle: (
      <>
        서포터님의 사랑은 받은 <br />
        인기프로젝트가 곧 끝나요 <br />
        프로젝트가 종료되기 전 살펴보세요!
      </>
    ),
  },
  {
    src: '/svgs/banner-1.svg',
    title: (
      <>
        3. 놓치면 아쉬운 <br /> 종료임박 프로젝트
      </>
    ),
    subTitle: (
      <>
        서포터님의 사랑은 받은 <br />
        인기프로젝트가 곧 끝나요 <br />
        프로젝트가 종료되기 전 살펴보세요!
      </>
    ),
  },
];

export default function LandingBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  console.log(count);
  console.log(current);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      console.log('current');
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section>
      <Carousel
        className=' w-full'
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        // opts={{
        //   loop: true,
        // }}
      >
        <CarouselContent>
          {BannerInformation.map((el, index) => (
            <CarouselItem className='relative' key={index}>
              <Image
                src={el.src}
                alt={`배너이미지 `}
                width={1375}
                height={396}
                className='h-auto w-full object-cover'
              />
              <div className='absolute left-[15.6rem] top-0 max-h-[39.8rem] max-w-[37.2rem]'>
                <p className='pt-[8.8rem] text-[4.8rem] font-bold leading-[6rem] text-[#fff]'>{el.title}</p>
                <div className='mt-[2.6rem] text-[1.8rem] font-normal leading-[2.5rem] text-[#fff]'>{el.subTitle}</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <MainCarouselPrevious
          variant='arrow'
          className='h-[7.7rem] w-[7.7rem] rounded-full border-transparent bg-[#fff] shadow-lg'
        />
        <MainCarouselNext
          type='button'
          variant='arrow'
          className='h-[7.7rem] w-[7.7rem] rounded-full border-transparent bg-[#fff] shadow-lg'
        />
      </Carousel>
      <div className='mt-4 flex justify-end text-muted-foreground'>
        {BannerInformation.map((_, index) => (
          <>
            <span
              key={index}
              className={`mx-2 h-[1.2rem] w-[1.2rem] cursor-pointer rounded-full ${index + 1 === current ? 'bg-[#ff7752]' : 'bg-[#d9d9d9]'}`}
            ></span>
            <div className='hidden'>
              {count} of
              {current}
            </div>
          </>
        ))}
      </div>
    </section>
  );
}
