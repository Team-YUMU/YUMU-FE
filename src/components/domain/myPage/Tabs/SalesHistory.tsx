import { Button } from '@/components/ui/button';
import SalesHistoryData from '@/mocks/SalesHistory';
import React from 'react';

export default function SalesHistory() {
  const salesHistory = SalesHistoryData;

  const historyBoxStyles =
    ' flex h-[13.5rem] w-[56.875rem] flex-shrink-0 flex-row justify-around gap-[20rem] rounded-[0.8rem] border-[0.1rem] border-red-F hover:border-2';
  return (
    <div className='flex h-[40rem] w-full flex-col gap-3 overflow-scroll'>
      {salesHistory.map((item, id) => {
        return (
          <div className={`${historyBoxStyles} items-center`} key={id}>
            <div className='w-[15rem]'>
              <div className='flex flex-row gap-2'>
                <span className='text.11.1-400'>{item.status}</span>
                <p className='text.11.1-400'>
                  {item.status === 'Done' ? `${item.saleDate.slice(0, 10) + ` 낙찰`} ` : ''}
                </p>
              </div>
              <p className='text-22.5-500'>{item.artTitle}</p>
              <Button type='button'>낙찰자 : {item.artist}</Button>
            </div>
            <div className='mt-[5rem] flex flex-col gap-[0.1rem]'>
              <p className='text-22.5-500'>{item.price + `원`}</p>
              <p className='text.11.1-400 flex items-end justify-end'>{item.saleDate.slice(0, 10) + ` 경매 종료`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
