import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAuction } from '@/services/api';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

interface liveProps {
  id: number;
  artName: string;
  artSubTitle: string;
  artImage: string;
  artist: string;
  status: string;
  createdAt: string;
  wishCnt: number;
}

interface LandingLivePopularProps {
  moveToArtist: () => void;
}

function LandingLivePopular({ moveToArtist }: LandingLivePopularProps) {
  const [liveData, setLiveData] = useState<liveProps[]>([]);
  const [popularData, setPopularData] = useState<liveProps[]>([]);
  const [today, setToday] = useState('');
  const router = useRouter();
  const pageSize = 3;

  const loadLiveAuctionData = async () => {
    try {
      const data = await getAuction(0, pageSize, 'live', '');
      const auctionLiveData = data.auctions;
      console.log(auctionLiveData);
      setLiveData(auctionLiveData);
    } catch (error) {
      console.error(error);
    }
  };

  const defaultItem = {
    id: null,
    artName: '',
    artSubTitle: '',
    artImage: '',
    artist: '',
    status: '',
    createdAt: '',
    wishCnt: 0,
  };

  const displayData =
    liveData.length === 3 ? liveData : [...liveData, defaultItem, defaultItem, defaultItem].slice(0, 3);
  console.log(displayData);

  useEffect(() => {
    loadLiveAuctionData();
  }, []);

  const loadPopularAuctionData = async () => {
    try {
      const data = await getAuction(0, pageSize, 'popular', '');
      const auctionPopularData = data.auctions;
      console.log(auctionPopularData);
      setPopularData(auctionPopularData);
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
    <>
      <div>
        <div>
          <p className='mb-[1rem] font-TheJamsil text-36-400 text-[#222]'>현재 Live 경매</p>
          <div className='flex justify-between'>
            <p className='mb-[4rem] text-18-500 leading-[2rem] text-[#9E9E9E]'>지금 경매가 진행되고 있어요!</p>
            <div
              onClick={() => {
                router.push(`/search?sort=${encodeURIComponent('live')}`);
              }}
              className='flex h-[2.6rem] items-center justify-between text-18-500 text-[#999] hover:text-[#FF7752] '
            >
              <span className='mr-[.7rem] '>더보기</span>
              <Image src='/svgs/m1-moreArrow.svg' alt='' width={18} height={6} className='h-[.6rem] w-[1.86rem] ' />
            </div>
          </div>
        </div>
        <div className='relative flex'>
          <>
            {displayData.map((item, index) =>
              item.id !== null ? (
                <>
                  <div key={index} className='mr-[1.6rem]'>
                    <div className='relative right-[-2rem] z-10'>
                      <div className=' h-[32.8rem] w-[24.8rem] rounded-[.6rem] bg-gradient-to-b from-[#FF7752] to-[#F9BB00] shadow-md'>
                        <div className='relative left-[.4rem] top-[.4rem] h-[32rem] w-[24rem] overflow-hidden rounded-[.6rem]'>
                          <Image src={item.artImage} alt='' fill className='transition-transform hover:scale-125' />
                        </div>
                      </div>
                      <div className='absolute left-[5.1rem] top-[.4rem] flex items-start '>
                        <Image src='/svgs/m1-timeNear-l.svg' width={16.39} height={14} alt='' />
                        <p className='flex h-[2.8rem] w-[11rem] items-center justify-center rounded-[.8rem] rounded-t-none bg-[#FF7751] text-18-700 text-[#fff]'>
                          {/* 타이머 기능 */}
                          {item.createdAt}
                        </p>
                        <Image src='/svgs/m1-timeNear-r.svg' width={16.39} height={14} alt='' />
                      </div>
                    </div>
                    <div className='relative top-[-5.7rem] h-[22.8rem] w-[28rem] rounded-[1rem] border border-[#DFDFDF] bg-[#F9F9F9]'>
                      <div className='ml-[2rem] mt-[8.2rem]'>
                        <span className='mr-[1.5rem] text-18-500 text-[#999]'>{item.artist}</span>
                        <span className='font-[Inter] text-16-500 text-[#999] opacity-40'>
                          <Heart strokeWidth={3.5} size={12} className='mr-[.6rem] inline ' />
                          {item.wishCnt.toLocaleString()}
                        </span>
                        <p className='mt-[.5rem] text-20-700 '>{item.artName}</p>
                        <p className='mt-[.5rem] max-w-[19.1rem] text-18-500 text-[#999]'>{item.artSubTitle}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div key={index} className='mr-[1.6rem]'>
                  <div className='relative right-[-2rem] z-10'>
                    <div className='h-[32rem] w-[24rem] rounded-[.6rem] bg-gradient-to-b from-[#FF7752] to-[#F9BB00] p-[.4rem] shadow-md'>
                      <div className='flex h-full w-full flex-col items-center justify-center bg-[#FFFAEC]'>
                        <Image src='svgs/m1-microphone.svg' alt='' width={55} height={104} />
                        <p className='mt-[1.2rem] text-12-500 text-[#FF7752]'>라이브가 준비중입니다!</p>
                      </div>
                    </div>
                    <div className='absolute left-[5.1rem] top-[.4rem] flex items-start '>
                      <Image src='/svgs/m1-timeNear-l.svg' width={16.39} height={14} alt='' />
                      <p className='flex h-[2.8rem] w-[11rem] items-center justify-center rounded-[.8rem] rounded-t-none bg-[#FF7751] text-18-700 text-[#fff]'></p>
                      <Image src='/svgs/m1-timeNear-r.svg' width={16.39} height={14} alt='' />
                    </div>
                  </div>
                  <div className='relative top-[-5.7rem] flex h-[22.8rem] w-[28rem] justify-center rounded-[1rem] border border-[#DFDFDF] bg-[#F9F9F9]'>
                    <div className='max-w-[17.3rem] pt-[8.5rem] text-center'>
                      <span className=' mb-[1.9rem] text-14-500 text-[#999]'>
                        매력적인 상품을 <br /> 곧 Live에서 보실 수 있습니다.
                      </span>
                      <Button
                        variant='outline'
                        size='header'
                        className='mt-[1.9rem] text-[1.6rem] font-bold leading-[2rem] '
                        onClick={() => {
                          router.push(`/search?sort=${encodeURIComponent('liveSoon')}`);
                        }}
                      >
                        오픈예정 경매보기
                      </Button>
                    </div>
                  </div>
                </div>
              ),
            )}
          </>
        </div>
      </div>
      {/* 인기경매 */}
      <div className='h-[2rem] w-[43.9rem]'>
        <div>
          <p className='mb-[1rem] font-TheJamsil text-36-400 text-[#222]'>인기 경매</p>
          <p className='mb-[4rem] text-18-500 leading-[2rem] text-[#9E9E9E]'>{today} 기준</p>
        </div>
        <div className=''>
          {/* map으로 돌릴부분 */}
          {popularData.map((item, index) => (
            <div key={index} className='mb-[2rem] flex justify-between'>
              <div className='relative  h-[12rem] w-[18rem] overflow-hidden'>
                <Image src={item.artImage} alt='' fill className='transition-transform hover:scale-125' />
              </div>
              <div className='w-[24.1rem]'>
                <span className='mr-[1.4rem] text-18-500 text-[#FF7752]'>{index + 1}</span>
                <span className='max-w-[20rem] text-20-700'>{item.artSubTitle}</span>
                <div className='mt-[3.4rem] text-end'>
                  <span className='text-16-500 text-[#999]'>경매마감</span>
                  <span className='ml-[1.2rem] text-20-700 text-[#FF7752]'>00:30:59</span>
                </div>
              </div>
            </div>
          ))}
          <div className='text-center'>
            <button
              onClick={() => moveToArtist()}
              type='button'
              className='mt-[2rem] h-[4.8rme] w-[28rem] rounded-[3.7rem] border border-[#dfdfdf] px-[8.4rem] py-[1.3rem] text-16-500 text-[#999] hover:border-[#FF7752] hover:text-red-F/90'
            >
              인기경매 더보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingLivePopular;
