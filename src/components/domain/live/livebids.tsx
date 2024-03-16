import { useState } from 'react';
import { Button } from '../../ui/button';

const testBidList = Array(13).fill(1);

export function LiveBids() {
  const [visibleCount, setVisibleCount] = useState(5); // 현재 보여지는 항목 수

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // 더 보기 버튼 클릭 시 항목 수 증가
  };

  const handleShowLess = () => {
    setVisibleCount(5);
  };

  return (
    <div className='sticky top-2 flex h-fit flex-col gap-2 rounded-xl bg-slate-50 p-2'>
      <div className='flex flex-row items-center justify-between'>
        <p className='bg-slate-100'>카테고리</p>
        <div className='space-x-2'>
          <Button variant={'default'}>공유</Button>
          <Button variant={'default'}>찜</Button>
        </div>
      </div>
      <div className='h-16 bg-slate-100'>현재 최고가</div>
      <p className='bg-slate-100'>경매 마감시간</p>
      <p className='bg-slate-100'>참여자 수</p>
      <p className='bg-slate-100'>내 입찰가</p>
      <p className='bg-slate-100'>전체 입찰 내역</p>
      <div className='bg-slate-100'>
        <ul className='space-y-2'>
          {testBidList.slice(0, visibleCount).map((_, index) => (
            <li key={index} className='flex flex-row items-center justify-around'>
              <p>익명</p>
              <p>금액</p>
            </li>
          ))}
        </ul>
      </div>
      {visibleCount < testBidList.length ? (
        <Button variant={'default'} onClick={handleShowMore}>
          더 보기
        </Button>
      ) : (
        <Button variant={'default'} onClick={handleShowLess}>
          감추기
        </Button>
      )}
    </div>
  );
}
