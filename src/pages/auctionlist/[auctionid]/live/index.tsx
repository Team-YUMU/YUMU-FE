import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

export default function Live() {
  return (
    <div className='m-dvh flex h-dvh select-none flex-col items-center gap-2'>
      <div className='w-ful bg-emerald-100'>Header</div>
      <div className='grid grid-cols-3 gap-2 bg-emerald-100'>
        <div className='col-span-3 bg-white'>상품명</div>
        <div className='col-span-2 bg-white'>영상작성</div>
        <div className='bg-white'>채팅</div>
        <div className='col-span-2 bg-white'>
          <div className='bg-emerald-100'>
            유의사항 ex. 도서신간 배송 불가 / 실문배송이 아닌 이메일로 상품이 전달 됩니다.
          </div>
          <Menubar className='flex w-full flex-row gap-2 bg-emerald-100'>
            <MenubarMenu>
              <MenubarTrigger>상세페이지</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>작가소개</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>유의사항</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>공지글</MenubarTrigger>
            </MenubarMenu>
          </Menubar>
          <div className='relative bg-emerald-100 p-2'>
            <div className='bg-white'>상세 페이지</div>
            <div className='bg-white'>작가소개</div>
            <div className='bg-white'>유의사항</div>
            <div className='bg-white'>공지글</div>
            <Button className='w-full' variant={'outline'}>
              더보기
            </Button>
          </div>
        </div>
        <div className='flex flex-col bg-white'>
          <div className='flex flex-row'>
            <p>카테고리</p>
            <Button>공유</Button>
            <Button>찜</Button>
          </div>
          <div>현재 최고가</div>
          <p>경매 마감시간</p>
          <p>참여자 수</p>
          <p>내 입찰가</p>
          <div>
            <p>전체 입찰 내역</p>
            <ul>
              <li className='flex flex-row'>
                <p>익명</p>
                <p>금액</p>
              </li>
            </ul>
          </div>
        </div>
        <div className='col-span-3 flex justify-center'>
          <Carousel className='w-2/3'>
            <CarouselPrevious />
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className='p-1'>
                    <Card className='rounded-full'>
                      <CardContent className='flex items-center justify-center p-6'>
                        <span className='text-4xl font-semibold'>기획전 {index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className='bg-emerald-100'>Footer</div>
    </div>
  );
}
