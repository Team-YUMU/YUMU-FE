import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export default function MyPageTabs() {
  return (
    <Tabs defaultValue='account'>
      <TabsList className='h-[10.27rem] w-[91rem] gap-[10rem]'>
        <TabsTrigger value='buy history'>구매내역</TabsTrigger>
        <TabsTrigger value='sales history'>판매내역</TabsTrigger>
        <TabsTrigger value='wish list'>관심작품</TabsTrigger>
      </TabsList>
      <TabsContent value='buy history'>구매내역</TabsContent>
      <TabsContent value='sales history'>판매내역</TabsContent>
      <TabsContent value='wish list'>관심작품</TabsContent>
    </Tabs>
  );
}
