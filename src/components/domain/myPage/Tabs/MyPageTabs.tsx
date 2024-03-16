import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BuyHistory from './BuyHistory';
import SalesHistory from './SalesHistory';
import WishList from './WishList';
import { useState } from 'react';
export default function MyPageTabs() {
  const [activeTab, setActiveTab] = useState('buy history');

  const tabStyle =
    'border-gray-99 border-b-2 text-gray-D hover:border-b-2 hover:border-red-F hover:text-red-F focus:border-red-F focus:text-red-F';
  return (
    <Tabs value={activeTab} defaultValue='account' className='flex flex-col gap-[3rem]'>
      <TabsList className='text-15-400 flex flex-row bg-white '>
        <TabsTrigger
          onClick={() => {
            setActiveTab('buy history');
          }}
          className={`${tabStyle}`}
          value='buy history'
        >
          구매내역
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setActiveTab('sales history');
          }}
          className={`${tabStyle}`}
          value='sales history'
        >
          판매내역
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setActiveTab('wish list');
          }}
          className={`${tabStyle}`}
          value='wish list'
        >
          관심작품
        </TabsTrigger>
      </TabsList>
      <TabsContent value='buy history'>
        {' '}
        <BuyHistory />
      </TabsContent>
      <TabsContent value='sales history'>
        {' '}
        <SalesHistory />
      </TabsContent>
      <TabsContent value='wish list'>
        {' '}
        <WishList />
      </TabsContent>
    </Tabs>
  );
}
