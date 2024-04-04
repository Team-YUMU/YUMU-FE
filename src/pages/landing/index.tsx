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
import LandingPopular from '@/components/domain/landing/LandingPopular';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getAuction } from '@/services/api';
import LikeButton from '@/components/common/LikeButton';
import Link from 'next/link';

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
  const pageSize = 20;

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

  useEffect(() => {
    loadLiveSoonData();
  }, []);

  const moveToArtist = () => {
    popularRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

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
              }}
              plugins={[Autoplay({ delay: 4000 })]}
              className='mr-[8.2rem] w-full max-w-[87.2rem]'
            >
              <CarouselContent>
                <CarouselItem>
                  <section className='grid w-full grid-cols-3 grid-rows-2 gap-x-10 gap-y-[4rem]'>
                    {liveSoonData.slice(0, 6).map((item, index) => (
                      <div key={index}>
                        <Link href={`/auction/${item.id}/detail`}>
                          <div className='relative'>
                            <div className='overflow-hidden'>
                              <Image
                                src={item.artImage}
                                alt={item.artName}
                                width={280}
                                height={200}
                                className='h-[20rem] w-[28rem] rounded-[.6rem] transition-transform hover:scale-125'
                              />
                            </div>
                            <p className='text-lg mt-[1.5rem] font-NotoSansKR text-20-700'>{item.artSubTitle}</p>
                            <p className='mt-[.5rem] text-18-500 text-gray-600'>{item.artist}</p>
                            <LikeButton className='absolute right-[1.8rem] top-[1.4rem]' />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </section>
                </CarouselItem>
                <CarouselItem>
                  <section className='grid w-full grid-cols-3 grid-rows-2 gap-x-10 gap-y-[4rem]'>
                    {liveSoonData.slice(6, 12).map((item, index) => (
                      <div key={index}>
                        <Link href={`/auction/${item.id}/detail`}>
                          <div className='relative'>
                            <div className='overflow-hidden'>
                              <Image
                                src={item.artImage}
                                alt={item.artName}
                                width={280}
                                height={200}
                                className='h-[20rem] w-[28rem] rounded-[.6rem] transition-transform hover:scale-125'
                              />
                            </div>
                            <p className='text-lg mt-[1.5rem] font-NotoSansKR text-20-700'>{item.artSubTitle}</p>
                            <p className='mt-[.5rem] text-18-500 text-gray-600'>{item.artist}</p>
                            <LikeButton className='absolute right-[1.8rem] top-[1.4rem]' />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </section>
                </CarouselItem>
                <CarouselItem>
                  <section className='grid w-full grid-cols-3 grid-rows-2 gap-x-10 gap-y-[4rem]'>
                    {liveSoonData.slice(12, 18).map((item, index) => (
                      <div key={index}>
                        <Link href={`/auction/${item.id}/detail`}>
                          <div className='relative'>
                            <div className='overflow-hidden'>
                              <Image
                                src={item.artImage}
                                alt={item.artName}
                                width={280}
                                height={200}
                                className='h-[20rem] w-[28rem] rounded-[.6rem] transition-transform hover:scale-125'
                              />
                            </div>
                            <p className='text-lg mt-[1.5rem] font-NotoSansKR text-20-700'>{item.artSubTitle}</p>
                            <p className='mt-[.5rem] text-18-500 text-gray-600'>{item.artist}</p>
                            <LikeButton className='absolute right-[1.8rem] top-[1.4rem]' />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </section>
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
          </div>
        </section>
        <section className='mt-[8rem]'>
          <LandingPopular popularRef={popularRef} />
        </section>
      </main>
    </>
  );
}
