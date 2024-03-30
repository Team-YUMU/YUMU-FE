import React, { useState, useRef, SyntheticEvent, useEffect } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface AuctionDetailProps {
  description?: string | undefined;
  notice?: string | null | undefined;
}

type MenuType = '작품 소개' | '작가 소개' | '유의사항';

export function AuctionDetail({ description, notice }: AuctionDetailProps) {
  const scrollRef = useRef<HTMLDivElement[]>([]);
  const [activeTab, setActiveTab] = useState<MenuType>('작품 소개');
  const [isMoreView, setIsMoreView] = useState(false);

  const tabMenus: Record<MenuType, number> = {
    '작품 소개': 0,
    '작가 소개': 1,
    유의사항: 2,
  };

  // 메뉴 탭 이동
  const handleMenu = (event: SyntheticEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.innerText as MenuType;
    scrollRef.current[tabMenus[name]].scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // 스크롤 위치에 따라 활성화된 탭 결정
      let activeTab: MenuType = '작품 소개';
      (Object.keys(tabMenus) as MenuType[]).forEach((tab) => {
        if (scrollRef.current[tabMenus[tab]].offsetTop <= scrollPosition) {
          activeTab = tab as MenuType;
        }
      });
      setActiveTab(activeTab);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tabMenus]);

  // 더보기 버튼
  const handleMore = () => {
    setIsMoreView(!isMoreView);
  };

  return (
    <div className={`relative col-span-2 space-y-2 bg-white pb-[9.4rem] ${isMoreView ? 'h-fit' : 'h-[50.4rem]'}`}>
      <div className='flex h-[3.4rem] w-full flex-row gap-[1.6rem] text-18-500 '>
        {Object.keys(tabMenus).map((tab) => (
          <Button
            key={tab}
            variant={'ghost'}
            onClick={handleMenu}
            className={`h-full w-[12rem] border-b-[0.4rem] pb-[0.8rem] pt-0 ${
              activeTab === tab ? 'border-[#686868] text-[#686868]' : 'border-white text-[#d9d9d9]'
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>
      <div className={`h-full overflow-hidden p-[3rem]`}>
        <div className={`space-y-[4rem] overflow-hidden`}>
          <div ref={(el) => (scrollRef.current[0] = el!)} className='flex flex-col gap-[3rem] font-[notoKR]'>
            <div className='flex flex-row items-center gap-[1.6rem] p-0 text-[#686868]'>
              <Separator orientation='vertical' className='h-[2.6rem] w-[0.4rem] bg-[#686868] p-0' />
              <p className='p-0 text-18-500'>작품 소개</p>
            </div>
            <div className='text-18-500'>{description}</div>
          </div>
          <div ref={(el) => (scrollRef.current[1] = el!)} className='flex flex-col gap-[3rem] font-[notoKR]'>
            <div className='flex flex-row items-center gap-[1.6rem] p-0 text-[#686868]'>
              <Separator orientation='vertical' className='h-[2.6rem] w-[0.4rem] bg-[#686868] p-0' />
              <p className='p-0 text-18-500'>작가 소개</p>
            </div>
            <div className='text-18-500'>작가 소개 들어가는 자리</div>
          </div>
          <div ref={(el) => (scrollRef.current[2] = el!)} className='flex flex-col gap-[3rem] font-[notoKR]'>
            <div className='flex flex-row items-center gap-[1.6rem] p-0 text-[#686868]'>
              <Separator orientation='vertical' className='h-[2.6rem] w-[0.4rem] bg-[#686868] p-0' />
              <p className='p-0 text-18-500'>유의사항</p>
            </div>
            <div className='text-18-500'>{notice}</div>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 mt-2 w-full'>
          {!isMoreView && <div className='h-[10rem] bg-gradient-to-t from-white to-transparent' />}
          <Button
            className='h-[7.4rem] w-full shrink-0 border-[0.2rem] bg-white text-18-500 hover:bg-white hover:text-20-500 focus:bg-white'
            variant={'outline'}
            onClick={handleMore}
          >
            <p className='text-red-F'>{isMoreView ? '작품 설명 줄이기' : '작품 설명 더보기'}</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
