import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { ExhibitionCarousel } from '@/components/common/ExhibitionCarousel';
import LandingBanner from '@/components/domain/landing/LandingBanner';
import { getLiveAuction } from '@/services/api';

interface ArtProps {
  id: number;
  artName: string;
  artImage: string;
  artist: string;
  status: string;
  createdAt: string;
  wishCnt: number;
}

export default function Landing() {
  const [auctionsData, setAuctionsData] = useState<ArtProps[]>([]);

  const loadLiveAuctionData = async () => {
    try {
      const data = await getLiveAuction({ keyword: '', size: 3, page: 0 });
      const auctionData = data.auctions;
      console.log(auctionData);
      setAuctionsData(auctionData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLiveAuctionData();
  }, []);

  return (
    <>
      {/* 텍스트 박스 밑에 margin 없애기 */}
      <main className='mx-auto max-w-[137.5rem] bg-[pink] pt-[4rem]'>
        <LandingBanner />
        <section className='mx-auto flex max-w-[136.9rem] justify-between'>
          <div>
            <div>
              <p className='mb-[1rem] font-[TheJamsil] text-36-400 text-[#222]'>현재 Live 경매</p>
              <p className='mb-[4rem] text-18-500 leading-[2rem] text-[#9E9E9E]'>지금 경매가 진행되고 있어요!</p>
            </div>
            <div className='relative flex bg-[blue]'>
              {auctionsData.length === 3 ? (
                <>
                  {auctionsData.map((item, index) => (
                    <>
                      <div key={index} className='mr-[1.6rem]'>
                        <div className='relative right-[-2rem] z-10'>
                          <div className='h-[32rem] w-[24rem] rounded-[.6rem] bg-gradient-to-b from-[#FF7752] to-[#F9BB00] p-[.4rem]'>
                            {/* 이미지 대체 */}
                            <Image className='h-full w-full' src={item.artImage} width={24} height={32} alt='' />
                          </div>
                          <div className='absolute left-[5.1rem] top-[.4rem] flex items-start '>
                            <Image src='/svgs/m1-timeNear-l.svg' width={16.39} height={14} alt='' />
                            <p className='flex h-[2.8rem] w-[11rem] items-center justify-center rounded-[.8rem] rounded-t-none bg-[#FF7751] text-18-700 text-[#fff]'>
                              {item.createdAt}
                            </p>
                            <Image src='/svgs/m1-timeNear-r.svg' width={16.39} height={14} alt='' />
                          </div>
                        </div>
                        <div className='relative top-[-5.7rem] h-[22.8rem] w-[28rem] rounded-[1rem] border border-[#DFDFDF] bg-[#F9F9F9]'>
                          <div className='ml-[2rem] mt-[8.2rem]'>
                            <span className='mr-[1.5rem] text-18-500 text-[#999]'>{item.artist}</span>
                            {/* 이모티콘 */}
                            <span className='font-[Inter] text-16-500 text-[#999]'>{item.wishCnt}</span>
                            <p className='mt-[.5rem] text-20-700'>{item.artName}</p>
                            <p className='mt-[.5rem] max-w-[19.1rem] text-18-500 text-[#999]'>
                              어떤 데이터를 불러올지 정하기
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <>
                  {[...Array(3 - auctionsData.length)].map((_, index) => (
                    <div key={index} className='mr-[1.6rem]'>
                      <div className='relative right-[-2rem] z-10'>
                        <div className='h-[32rem] w-[24rem] rounded-[.6rem] bg-gradient-to-b from-[#FF7752] to-[#F9BB00] p-[.4rem]'>
                          <div className='h-full w-full bg-gray-800'></div>
                        </div>
                        <div className='absolute left-[5.1rem] top-[.4rem] flex items-start '>
                          <Image src='/svgs/m1-timeNear-l.svg' width={16.39} height={14} alt='' />
                          <p className='flex h-[2.8rem] w-[11rem] items-center justify-center rounded-[.8rem] rounded-t-none bg-[#FF7751] text-18-700 text-[#fff]'></p>
                          <Image src='/svgs/m1-timeNear-r.svg' width={16.39} height={14} alt='' />
                        </div>
                      </div>
                      <div className='relative top-[-5.7rem] h-[22.8rem] w-[28rem] rounded-[1rem] border border-[#DFDFDF] bg-[#F9F9F9]'>
                        <div className='ml-[2rem] mt-[8.2rem]'>
                          <span className='mr-[1.5rem] text-18-500 text-[#999]'>준비중입니다</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          {/* 인기경매 */}
          <div className='h-[2rem] w-[43.9rem] bg-[pink]'>
            <div>
              <p className='mb-[1rem] font-[TheJamsil] text-36-400 text-[#222]'>인기 경매</p>
              <p className='mb-[4rem] text-18-500 leading-[2rem] text-[#9E9E9E]'>00000기준</p>
            </div>
            <div className='text-center'>
              {/* map으로 돌릴부분 */}
              <div className='flex justify-between bg-[blue]'>
                <Image src='/svgs/banner-1.svg' alt='' width={18} height={12} className='h-[12rem] w-[18rem]' />
                <p className='text-18-500 text-[#FF7752]'>1</p>
                <div>
                  <p className='max-w-[20rem] text-20-700'>어머 이건 꼭 사야해 로판에 나오는 한복</p>
                  <div className='mt-[3.4rem] text-end'>
                    <span className='text-16-500 text-[#999]'>경매마감</span>
                    <span className='ml-[1.2rem] text-20-700 text-[#FF7752]'>00:30:59</span>
                  </div>
                </div>
              </div>
              <button
                type='button'
                className='mt-[4.3rem] h-[4.8rme] w-[28rem] rounded-[3.7rem] border border-[#dfdfdf] px-[8.4rem] py-[1.3rem] text-16-500 text-[#999]'
              >
                인기경매 더보기
              </button>
            </div>
          </div>
        </section>
        {/* 기획전 */}
        <div className='mt-[8rem]'>
          <ExhibitionCarousel />
        </div>
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
