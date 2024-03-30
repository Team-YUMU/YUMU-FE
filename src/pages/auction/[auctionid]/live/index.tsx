import { BidHistories } from '@/components/domain/live/BidHistories';
import { AuctionDetail } from '@/components/common/AuctionDetail';
import { LiveVideo } from '@/components/domain/live/livevideo';
import { LiveChatting } from '@/components/domain/live/livechatting';
import ScrollButtons from '@/components/common/ScrollButtons';
import InfoBox from '@/components/common/InfoBox';
import BiddingBox from '@/components/domain/live/BiddingBox';

export default function Live() {
  return (
    <div className='relative m-auto flex w-[138rem] select-none items-center gap-2 py-2'>
      <div className='grid grid-cols-3 gap-[1.25rem] px-2'>
        <div className='col-span-3 bg-white font-TheJamsil text-36-400'>상품명(긴제목)</div>
        <div className='col-span-2 flex w-[91rem] flex-col gap-[1.13rem]'>
          <div className='h-[54rem] w-full bg-stone-50'>
            비디오 켜지면 플리 이상하게 들려서 끄려고 대충 만든 녀석인데 비디오 컴포넌트 잘 만들어져 있으니까 걱정
            마세요. 사이즈도 동일합니다.
          </div>
          <InfoBox className='mb-[2rem]' />
          {/* <LiveVideo /> */}
        </div>
        <LiveChatting />
        <AuctionDetail />
        <div className='space-y-[2rem]'>
          <BiddingBox />
          <BidHistories />
        </div>
      </div>
      <ScrollButtons />
    </div>
  );
}
