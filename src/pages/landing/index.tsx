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
        {/* ⭐️⭐️⭐️현재 라이브 경매 - 정적 */}
        <section className='mx-auto flex max-w-[136.9rem] justify-between bg-[red]'>
          {/* 최신경매 */}
          <div>
            <div>
              <p className='text-36-400 mb-[1rem] font-[TheJamsil5Bold] text-[#222]'>현재 Live 경매</p>
              <p className='mb-[4rem] text-18-500 leading-[2rem] text-[#9E9E9E]'>지금 경매가 진행되고 있어요!</p>
            </div>
            <div className='relative bg-[blue]'>
              {/* map을 통해 가져오기 */}
              {/* 이미지 박스 */}
              <div className='relative right-[-2rem] z-10'>
                <div className='h-[32rem] w-[24rem] rounded-[.6rem] bg-gradient-to-b from-[#FF7752] to-[#F9BB00] p-[.4rem]'>
                  {/* 이미지 대체 */}
                  <div className='h-full w-full bg-gray-800'></div>
                </div>
                <div className='absolute left-[5.1rem] top-[.4rem] flex items-start '>
                  <Image src='/svgs/m1-timeNear-l.svg' width={16.39} height={14} alt='' />
                  <p className='flex h-[2.8rem] w-[11rem] items-center justify-center rounded-[.8rem] rounded-t-none bg-[#FF7751] text-18-700 text-[#fff]'>
                    00:00
                  </p>
                  <Image src='/svgs/m1-timeNear-r.svg' width={16.39} height={14} alt='' />
                </div>
              </div>
              {/* text박스 */}
              <div className='relative top-[-5.7rem] h-[22.8rem] w-[28rem] rounded-[1rem] border border-[#DFDFDF] bg-[#F9F9F9]'>
                {/* 데이터 가져오기 */}
                <div className='ml-[2rem] mt-[8.2rem]'>
                  <p className='text-18-500 text-[#999]'>아티스트이름</p>
                  <p className='mt-[.5rem] text-20-700'>국내 스마트 워치 타니 프로 2</p>
                  <p className='mt-[.5rem] max-w-[19.1rem] text-18-500 text-[#999]'>
                    국내앱 국내개발 국내 보안 국내최적화
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 인기경매 */}
          <div className='h-[2rem] max-w-[43.9rem] bg-[pink]'>
            <p>나는 인기경매입니다</p>
          </div>
        </section>
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
