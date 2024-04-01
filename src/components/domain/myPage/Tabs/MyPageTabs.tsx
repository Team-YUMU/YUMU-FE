import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BuyHistory from './BuyHistory';
import SalesHistory from './SalesHistory';
import WishList from './WishList';
import { useState } from 'react';
import Image from 'next/image';

export default function MyPageTabs() {
  const [activeTab, setActiveTab] = useState('buy history');

  const buyIconToggleFn =
    activeTab === 'buy history' ? (
      <Image
        src={`/svgs/my-page-buy-black-icon.svg`}
        width={22}
        height={22}
        alt='구매목록 아이콘'
        className='h-[2.2rem] w-[2.2rem] flex-shrink-0'
      />
    ) : (
      <Image
        src={`/svgs/my-page-buy-gray-icon.svg`}
        width={22}
        height={22}
        alt='구매목록 아이콘'
        className='h-[2.2rem] w-[2.2rem] flex-shrink-0'
      />
    );
  const salesIconToggleFn =
    activeTab === 'sales history' ? (
      <Image
        src={`/svgs/my-page-sales-black-icon.svg`}
        width={22}
        height={22}
        alt='판매목록 아이콘'
        className='h-[2.2rem] w-[2.2rem] flex-shrink-0'
      />
    ) : (
      <Image
        src={`/svgs/my-page-sales-gray-icon.svg`}
        width={22}
        height={22}
        alt='판매목록 아이콘'
        className='h-[2.2rem] w-[2.2rem] flex-shrink-0'
      />
    );
  const wishIconToggleFn =
    activeTab === 'wish list' ? (
      <Image
        src={`/svgs/my-page-wish-black-icon.svg`}
        width={22}
        height={22}
        alt='관심목록 아이콘'
        className='h-[2.2rem] w-[2.2rem] flex-shrink-0'
      />
    ) : (
      <Image
        src={`/svgs/my-page-wish-gray-icon.svg`}
        width={22}
        height={22}
        alt='관심목록 아이콘'
        className='h-[2.2rem] w-[2.2rem] flex-shrink-0'
      />
    );

  const tabStyle = `flex flex-row justify-center item-center  border-gray-C border-b-[0.4rem] text-gray-D `;

  return (
    <Tabs value={activeTab} defaultValue='account' className='flex flex-col gap-[4rem]'>
      <TabsList>
        <TabsTrigger
          onClick={() => {
            setActiveTab('buy history');
          }}
          className={`${tabStyle}`}
          value='buy history'
        >
          <div className='flex items-center justify-center gap-[1.5rem] pb-[1.5rem]'>
            {buyIconToggleFn}
            <p className='font-TheJamsil text-20-400 '>구매목록</p>
          </div>
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setActiveTab('sales history');
          }}
          className={`${tabStyle}`}
          value='sales history'
        >
          <div className='flex items-center justify-center gap-[1.5rem] pb-[1.5rem]'>
            {salesIconToggleFn}
            <p className='font-TheJamsil text-20-400 '> 판매목록</p>
          </div>
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setActiveTab('wish list');
          }}
          className={`${tabStyle}`}
          value='wish list'
        >
          <div className='flex items-center justify-center gap-[1.5rem] pb-[1.5rem]'>
            {wishIconToggleFn}
            <p className='font-TheJamsil text-20-400 '>관심목록</p>
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='buy history'>
        <BuyHistory />
      </TabsContent>
      <TabsContent value='sales history'>
        <SalesHistory />
      </TabsContent>
      <TabsContent value='wish list'>
        <WishList />
      </TabsContent>
    </Tabs>
  );
}
