import { useState } from 'react';
import { Button } from '../../ui/button';
import { Separator } from '@/components/ui/separator';

type BidHistoryProps = {
  username: string;
  bidprice: number;
  bidtime: Date;
};

const testBidList = [
  { username: '홍길동', bidprice: 100000, bidtime: new Date('2024-03-18T08:00:00') },
  { username: 'user2', bidprice: 120000, bidtime: new Date('2024-03-18T08:05:00') },
  { username: 'user3', bidprice: 150000, bidtime: new Date('2024-03-18T22:10:00') },
  { username: 'user4', bidprice: 110000, bidtime: new Date('2024-03-19T10:30:00') },
  { username: 'user5', bidprice: 130000, bidtime: new Date('2024-03-19T12:45:00') },
  { username: 'user6', bidprice: 140000, bidtime: new Date('2024-03-20T15:20:00') },
  { username: 'user7', bidprice: 160000, bidtime: new Date('2024-03-20T18:00:00') },
  { username: 'user8', bidprice: 170000, bidtime: new Date('2024-03-21T09:15:00') },
  { username: 'user9', bidprice: 180000, bidtime: new Date('2024-03-21T14:30:00') },
  { username: 'user10', bidprice: 190000, bidtime: new Date('2024-03-22T16:40:00') },
  { username: 'user11', bidprice: 200000, bidtime: new Date('2024-03-22T20:00:00') },
  { username: 'user12', bidprice: 210000, bidtime: new Date('2024-03-23T11:10:00') },
  { username: '아이유', bidprice: 220000, bidtime: new Date('2024-03-23T14:55:00') },
];

function BidHistory({ username, bidprice, bidtime }: BidHistoryProps) {
  const handleUserProfile = () => {
    alert(username);
  };
  return (
    <li className='flex flex-row justify-between px-[2.2rem] py-[2rem]'>
      <div className='space-y-[0.6rem]'>
        <Button variant={'ghost'} onClick={handleUserProfile} className='flex flex-row items-center gap-[1.6rem] p-0'>
          <Separator orientation='vertical' className='h-[2.6rem] w-[0.4rem] bg-[#686868] p-0' />
          <p className='p-0 text-18-500'>{username}</p>
        </Button>
        <p className='text-16-500 text-[#c5c5c5]'>
          {bidtime.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })}
        </p>
      </div>
      <div className='flex flex-col'>
        <div className='grow' />
        <p className='inline-block pb-[0.6rem] text-20-900 text-red-F'>{bidprice.toLocaleString()}원</p>
      </div>
    </li>
  );
}

export function BidHistories() {
  const [showAll, setShowAll] = useState(-4); // 현재 보여지는 항목 수

  const handleShowAll = () => {
    if (showAll === 0) {
      setShowAll(-4);
    } else {
      setShowAll(0);
    }
  };

  return (
    <div className='sticky top-2 flex h-fit max-h-[79.5rem] flex-col gap-2 rounded-[1rem] border-2 border-[#F3F3F3] bg-white p-[2.3rem] font-sans text-[#686868]'>
      <p className='pl-[0.3rem] text-18-500'>지난 내역</p>
      <div className='overflow-y-scroll scrollbar-hide'>
        <ul className='flex flex-col-reverse gap-0'>
          {testBidList.slice(showAll).map((testBid, index) => (
            <div key={index}>
              <BidHistory username={testBid.username} bidtime={testBid.bidtime} bidprice={testBid.bidprice} />
              {index > 0 && <Separator className='h-[0.2rem] bg-[#f3f3f3]' />}
            </div>
          ))}
        </ul>
      </div>
      <Button
        onClick={handleShowAll}
        className='h[4.8rem] mx-auto mb-[0.8rem] w-[28rem] shrink-0 rounded-[3.7rem] border border-[#dfdfdf] bg-white text-16-500 text-[#999999] hover:bg-white focus:bg-white'
      >
        {showAll ? '지난 내역 더보기' : '지난 내역 감추기'}
      </Button>
    </div>
  );
}
