import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { postBid } from '@/services/api';
import { RotateCcw } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const addBidList = [100000, 10000, 1000];

export default function BiddingBox() {
  const router = useRouter();
  const { auctionid } = router.query;
  const auctionId = Number(auctionid);
  const [bidValue, setBidValue] = useState<number>(0);

  const postAuctionBid = async () => {
    try {
      postBid(auctionId, bidValue).then(() => alert(`${auctionId.toLocaleString()}원 입찰되셨습니다!`));
    } catch (error) {
      console.log('경매 입찰 에러 : ', error);
    }
  };

  const handleAddBid = (addBidValue: number) => {
    if (bidValue !== 0) {
      setBidValue(bidValue + addBidValue);
    } else {
      setBidValue(addBidValue);
    }
  };

  return (
    <div className='flex h-fit flex-col rounded-[1rem] border-2 border-[#f3f3f3] bg-white px-[3rem] py-[2.3rem] text-[#686868]'>
      <h1 className='mb-[0.5rem] text-18-500'>경매에 참여하기</h1>
      <p className='mb-[1.7rem] text-12-500 text-[#c5c5c5]'>낙찰 후 24시간 이내에 결제가 완료되어야 합니다.</p>
      <div className='mb-[1.2rem] flex flex-row items-center justify-end gap-[0.7rem] text-16-500'>
        {addBidList.map((addBid, index) => (
          <Button
            key={index}
            variant={'outline'}
            onClick={() => handleAddBid(addBid)}
            className='focus:border-red-f rounded-[3.7rem] border border-[#dfdfdf] px-[1.3rem] py-[0.6rem] text-[#999] hover:border-red-F hover:bg-red-F hover:text-white'
          >
            +{addBid.toLocaleString()}원
          </Button>
        ))}
      </div>
      <div className='mb-[0.6rem] flex h-[6.4rem] w-full flex-row items-center justify-center gap-1 rounded-[0.6rem] border-gray-E bg-gray-F p-1 px-[2.2rem] text-20-700 focus-within:border focus-within:border-orange-F focus-within:bg-white'>
        <Button variant={'ghost'} onClick={() => setBidValue(0)}>
          <RotateCcw width={20} height={20} className='hover:size-9' />
        </Button>
        <Input
          placeholder='금액을 입력해주세요.'
          readOnly
          value={bidValue?.toLocaleString()}
          className='h-full w-full border-transparent bg-transparent px-0 text-end text-20-700 outline-transparent focus:border-transparent focus:bg-transparent focus:outline-transparent'
        />
        {bidValue ? <p>원</p> : undefined}
      </div>

      <p className='mb-[1.3rem] text-end text-14-400 text-red-F'>* 금액의 최소 단위는 1,000원입니다.</p>
      <div className='text-20-500'>
        <Button onClick={postAuctionBid} className='h-[6.4rem] w-full rounded-[0.6rem]'>
          응찰하기
        </Button>
      </div>
    </div>
  );
}
