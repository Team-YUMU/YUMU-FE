import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import React from 'react';

export default function Detail() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/mypage');
  };
  return (
    <div className='flex h-full min-h-[80vh] w-full flex-col items-center justify-center gap-[3rem] '>
      <div className='h-[15.5rem] w-[86rem] '>
        <p>제품 설명</p>
      </div>
      <div className='h-[6.375rem] w-[86rem]'>
        <p>제품 후기</p>
      </div>
      <div className='h-[23.375rem] w-[86rem]'>
        <p>제품 정보</p>
        <div></div>
      </div>
      <div className='h-[9.6875rem] w-[86rem]'>
        <p>낙찰자 정보</p>
        <div></div>
      </div>
      <div className='h-[11.0625rem] w-[86rem]'>
        <p>배송지</p>
        <div></div>
      </div>
      <div className='h-[15.5rem] w-[86rem]'>
        <p>결제 정보</p>
        <div></div>
      </div>
      <Button onClick={handleBackClick}>구매내역으로 이동</Button>
    </div>
  );
}
