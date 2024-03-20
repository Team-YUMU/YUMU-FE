import PurchaseHistories from '@/mocks/PurchaseHistory';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import React from 'react';

export default function WishList() {
  const WishListData = PurchaseHistories;
  const WishListCardStyle = `flexCenter  w-[17.168rem] h-[21.45994rem] flex-shrink-0 rounded-[0.8rem] border-[0.1rem] border-red-F hover:border-2`;
  return (
    <div className='grid h-[40rem] w-[56.875rem] grid-cols-3 gap-[1.72rem]  overflow-scroll'>
      {WishListData.map((item, id) => {
        return (
          <div key={id}>
            <div className={`${WishListCardStyle} gap-[5rem]`}>
              <Image
                className='flex items-center justify-center'
                width={56}
                height={40}
                src={'svgs/yumu-logo.svg'}
                alt='관심경매 이미지'
              />
              <div className='flex flex-col items-center justify-center gap-2'>
                <Separator className='w-[17rem] bg-red-F' />
                <p>{item.artName}</p>
                <p>{item.price}</p>
                <p>{item.purchaseDate}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
