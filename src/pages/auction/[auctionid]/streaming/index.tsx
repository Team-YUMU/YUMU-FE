import { BidHistories } from '@/components/domain/live/BidHistories';
import { LiveChatting } from '@/components/domain/live/livechatting';
import { AuctionDetail } from '@/components/common/AuctionDetail';
import { LiveVideo } from '@/components/domain/live/livevideo';
import { ChevronLeft, CircleAlert } from 'lucide-react';
import ScrollButtons from '@/components/common/ScrollButtons';
import { Button } from '@/components/ui/button';

export default function Streaming() {
  return (
    <div className='relative m-auto flex w-[138rem] select-none items-center gap-2 py-2'>
      <div className='grid grid-cols-3 gap-[1.25rem] px-2'>
        <div className='col-span-3 flex flex-row items-center gap-[1.2rem] bg-white font-TheJamsil text-36-400'>
          <Button variant={'ghost'} className='p-0'>
            <ChevronLeft color='#e0e0e0' className='size-[3.2rem] shrink-0' />
          </Button>
          상품명(긴제목)
        </div>
        <div className='col-span-2 flex w-[91rem] flex-col gap-[1.13rem]'>
          <div className='h-[54rem] w-full bg-stone-50'>
            비디오 켜지면 플리 이상하게 들려서 끄려고 대충 만든 녀석인데 비디오 컴포넌트 잘 만들어져 있으니까 걱정
            마세요. 사이즈도 동일합니다.
          </div>
          {/* <LiveVideo /> */}
          <div className='flex h-[8rem] w-full flex-row items-center space-x-[1.3rem] rounded-xl bg-stone-50 px-[3.2rem] font-[notoKR] text-16-700'>
            <CircleAlert color='#f9f9f9' fill='#bdbdbd' className='size-[1.8rem]' />
            <p className='text-16-700 text-[#bdbdbd]'>제주도 및 도서 산간 지역은 배송이 불가합니다.</p>
          </div>
        </div>
        <LiveChatting />
        <AuctionDetail />
        <BidHistories />
      </div>
      <ScrollButtons />
    </div>
  );
}
