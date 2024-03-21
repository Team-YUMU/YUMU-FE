import { BidHistories } from '@/components/domain/live/BidHistories';
import { ExhibitionCarousel } from '@/components/common/ExhibitionCarousel';
import { AuctionDetail } from '@/components/common/AuctionDetail';
import { LiveVideo } from '@/components/domain/live/livevideo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { LiveChatting } from '@/components/domain/live/livechatting';

export default function Live() {
  return (
    <div className='m-auto flex w-[80%] select-none flex-col items-center gap-2 py-2'>
      <div className='grid grid-cols-3 gap-2 px-2'>
        <div className='col-span-3 bg-slate-200'>상품명</div>
        {/* <LiveVideo /> */}
        <div className='col-span-2'>
          <AspectRatio ratio={16 / 9}>
            비디오 켜지면 플리 이상하게 들려서 끄려고 대충 만든 녀석인데 비디오 컴포넌트 잘 만들어져 있으니까 걱정
            마세요. 사이즈도 동일합니다.
          </AspectRatio>
        </div>
        <LiveChatting />
        <AuctionDetail />
        <BidHistories />
        <ExhibitionCarousel />
      </div>
    </div>
  );
}
