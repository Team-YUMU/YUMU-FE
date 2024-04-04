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
    src: '/svgs/landingBanner.svg',
    title: (
      <>
        유무 OPEN!
        <br />
        작가님 들어오세요!
      </>
    ),
    subTitle: (
      <>
        유일무이한 당신의 작품이
        <br />
        특별한 가치를 가지고 오래 지속되도록
        <br />
        유무가 응원할게요!
      </>
    ),
  },
  {
    src: '/svgs/landingBanner.svg',
    title: (
      <>
        유무 OPEN!
        <br />
        작가님 들어오세요!
      </>
    ),
    subTitle: (
      <>
        유일무이한 당신의 작품이
        <br />
        특별한 가치를 가지고 오래 지속되도록
        <br />
        유무가 응원할게요!
      </>
    ),
  },
  {
    src: '/svgs/landingBanner.svg',
    title: (
      <>
        유무 OPEN!
        <br />
        작가님 들어오세요!
      </>
    ),
    subTitle: (
      <>
        유일무이한 당신의 작품이
        <br />
        특별한 가치를 가지고 오래 지속되도록
        <br />
        유무가 응원할게요!
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
                className='h-auto w-full rounded-[2rem] object-cover'
              />
              <div className='absolute left-[15.6rem] top-0 max-h-[39.8rem] max-w-[38.1rem]'>
                <p className='pt-[8.8rem] font-TheJamsil text-[4.8rem] font-bold leading-[6rem]'>{el.title}</p>
                <div className='<br /> mt-[2.6rem] text-[1.8rem] font-normal leading-[2.5rem]'>{el.subTitle}</div>
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
