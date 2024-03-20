import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
// import Autoplay from 'embla-carousel-autoplay';
import { ExhibitionCarousel } from '@/components/common/ExhibitionCarousel';

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

export default function Landing() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === BannerInformation.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? BannerInformation.length - 1 : prevIndex - 1));
  };
  return (
    <>
      <main className='mx-auto max-w-[137.5rem] bg-[pink] pt-[4rem]'>
        {/* 베너 */}
        <section>
          <Carousel
            className=' w-full'
            // plugins={[
            //   Autoplay({
            //     delay: 2000,
            //   }),
            // ]}
            opts={{
              loop: true,
              watchDrag: false,
              active: false,
            }}
          >
            <CarouselContent
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                transition: 'transform 0.5s ease-in-out',
              }}
            >
              {BannerInformation.map((el, index) => (
                <CarouselItem className='relative' key={index}>
                  <Image
                    src={el.src}
                    alt={`배너이미지 ${index + 1}`}
                    width={1375}
                    height={396}
                    priority
                    className='h-auto w-full object-cover'
                  />
                  <div className='absolute left-[15.6rem] top-0 max-h-[39.8rem] max-w-[37.2rem]'>
                    <p className='pt-[8.8rem] text-[4.8rem] font-bold leading-[6rem] text-[#fff]'>{el.title}</p>
                    <div className='mt-[2.6rem] text-[1.8rem] font-normal leading-[2.5rem] text-[#fff]'>
                      {el.subTitle}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              type='button'
              onClick={prevSlide}
              className='h-[7.7rem] w-[7.7rem] rounded-full border-transparent bg-[#fff] shadow-lg'
            />
            <CarouselNext
              type='button'
              onClick={nextSlide}
              className='h-[7.7rem] w-[7.7rem] rounded-full border-transparent bg-[#fff] shadow-lg'
            />
          </Carousel>
          <div className='mt-4 flex justify-end'>
            {BannerInformation.map((_, index) => (
              <span
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`mx-2 h-[1.2rem] w-[1.2rem] cursor-pointer rounded-full ${index === activeIndex ? 'bg-[#ff7752]' : 'bg-[#d9d9d9]'}`}
              ></span>
            ))}
          </div>
        </section>
        {/* 현재 라이브 경매 - 정적 */}
        {/* 인기경매 - 정적*/}
        {/* 기획전 */}
        <ExhibitionCarousel />

        <div>
          <Carousel className=' w-full max-w-xs'>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className='p-1'>
                    <Card>
                      <CardContent className='flex aspect-square items-center justify-center p-6'>
                        <span className='text-4xl font-semibold'>{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {/* 오픈예정 */}
        <div>
          <Carousel className=' w-full max-w-xs'>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className='p-1'>
                    <Card>
                      <CardContent className='flex aspect-square items-center justify-center p-6'>
                        <span className='text-4xl font-semibold'>{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {/* 인기경매 */}
        <div>
          <Carousel className=' w-full max-w-xs'>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className='p-1'>
                    <Card>
                      <CardContent className='flex aspect-square items-center justify-center p-6'>
                        <span className='text-4xl font-semibold'>{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </main>
    </>
  );
}
