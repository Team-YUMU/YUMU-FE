import { BidHistories } from '@/components/domain/live/BidHistories';
import { AuctionDetail } from '@/components/common/AuctionDetail';
import { LiveVideo } from '@/components/domain/live/livevideo';
import { LiveChatting } from '@/components/domain/live/livechatting';
import ScrollButtons from '@/components/common/ScrollButtons';
import InfoBox from '@/components/common/InfoBox';
import BiddingBox from '@/components/domain/live/BiddingBox';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetAuctionDetailsProps } from '@/types/types';
import { getAuctionDetails } from '@/services/api';
import { ChevronLeft } from 'lucide-react';
import CurrentBidBox from '@/components/domain/live/CurrentBidBox';

export default function Live() {
  const [auctionDetailData, setAuctionDetailData] = useState<GetAuctionDetailsProps | null>();
  const router = useRouter();
  const { auctionid } = router.query;
  const auctionId = Number(auctionid);

  const getAuctionDetail = async () => {
    try {
      const data = await getAuctionDetails(auctionId);
      console.log('경매 상세 정보:', data);
      setAuctionDetailData(data);
      // 필요한 처리 로직 추가
    } catch (error) {
      console.error('경매 상세 정보를 가져오는 동안 오류 발생:', error);
    }
  };

  useEffect(() => {
    getAuctionDetail();
  }, [auctionid]);

  return (
    <div className='relative m-auto flex w-[138rem] select-none items-center gap-2 py-2'>
      <div className='grid grid-cols-3 gap-[1.25rem] px-2'>
        <div className='col-span-3 flex flex-row items-center gap-[0.4rem] bg-white font-TheJamsil text-36-400'>
          <button onClick={() => router.push('/search')}>
            <ChevronLeft color='#e0e0e0' width={36} height={36} />
          </button>
          {auctionDetailData?.artInfo.artName}
        </div>
        <div className='col-span-2 flex w-[91rem] flex-col gap-[1.13rem]'>
          <div className='h-[54rem] w-full bg-stone-50'>
            비디오 켜지면 플리 이상하게 들려서 끄려고 대충 만든 녀석인데 비디오 컴포넌트 잘 만들어져 있으니까 걱정
            마세요. 사이즈도 동일합니다.
          </div>
          {auctionDetailData?.notice && <InfoBox className='mb-[2rem]' notice={auctionDetailData?.notice} />}
          {/* <LiveVideo notice={auctionDetailData?.notice as string} /> */}
        </div>
        {/* <LiveChatting /> */}
        <AuctionDetail
          description={auctionDetailData?.artDescription}
          notice={auctionDetailData?.notice}
          artistInfo={auctionDetailData?.artistInfo}
        />
        <div className='space-y-[2rem]'>
          <CurrentBidBox />
          <BiddingBox />
          <BidHistories />
        </div>
      </div>
      <ScrollButtons />
    </div>
  );
}
