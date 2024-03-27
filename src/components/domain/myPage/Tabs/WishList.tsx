import PurchaseHistories from '@/mocks/PurchaseHistory';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import artImage from '@/../public/images/artImage.png';

export default function WishList() {
  const WishListData = PurchaseHistories;

  const handleWishClick = () => {};
  return (
    <div className='grid h-[73rem] w-[90.8rem] grid-cols-3 gap-[1.72rem] overflow-scroll'>
      {WishListData.map((item, id) => {
        return (
          <div key={id}>
            <form className={`relative gap-[5rem]`}>
              <Image
                className='h-[20rem] w-[29.2rem] flex-shrink-0 rounded-[0.6rem]'
                width={292}
                height={200}
                src={artImage}
                alt='관심경매 이미지'
              />
              <Button type='button' variant='myPageWish' size='myPageWish' onClick={handleWishClick}>
                <Image
                  width={35}
                  height={30}
                  className='absolute'
                  src={'svgs/my-page-wish-gray-icon.svg'}
                  alt='관심목록 찜 버튼'
                />
              </Button>
              <div className='pt-[1.5rem] text-20-700 text-black-0'>
                <p>{item.artName}</p>
                <p className='h-[5.4rem] w-[19.1rem] text-18-500 text-gray-9'>국내앱 국내개발 국내보안 국내최적화</p>
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
}
