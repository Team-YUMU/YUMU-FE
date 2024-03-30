import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import React, { Fragment, useEffect } from 'react';
import Image from 'next/image';
import { getSalesHistory } from '@/services/api';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function SalesHistory() {
  const [ref, inView] = useInView();
  const historyBoxStyles =
    'flex h-[24rem] w-[90.8rem] flex-shrink-0 flex-row justify-around gap-[40rem] rounded-[1rem] border-[0.1rem] border-gray-C';

  const {
    data: postInfoList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 999999 }) => getSalesHistory(pageParam, 5),
    initialPageParam: 999999,
    getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextLastPostId : undefined),
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <>
      <div className='inline-flex h-[73rem] flex-col gap-[1.6rem] overflow-scroll' onScroll={handleScroll}>
        <div className='inner-container'>
          {postInfoList?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.postList.map((item, itemIndex) => (
                <div className={`${historyBoxStyles} items-center`} key={itemIndex}>
                  <div className='ml-[4.8rem] flex w-[8rem] flex-col gap-[4.3rem]'>
                    <div className='flex flex-col gap-[0.4rem]'>
                      <span className='h-[1.8rem] w-[9.5rem] flex-shrink-0 text-18-700 text-gray-9'>{'판매 완료'}</span>
                      <p className='h-[3.9rem] w-[24.9rem] flex-shrink-0 text-32-700 text-black-2'>{item.artTitle}</p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button type='button' size={'myPage'} variant={'myPage'}>
                          <span className='text-center text-16-500 text-gray-9'>낙찰자 : {item.artist}</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='h-[49.7rem] max-w-[44rem]'>
                        <AlertDialogDescription>
                          <div className='flex flex-col gap-[4rem] pl-[3.6rem]'>
                            <div className='flex flex-col gap-[0.4rem] '>
                              <span className=' relative mt-[3rem] h-[1.8rem] w-[9.5rem] flex-shrink-0 text-18-700 text-gray-9'>
                                거래완료
                              </span>
                              <span className=' h-[3.9rem] w-[24.9rem] flex-shrink-0 text-24-700 text-gray-9'>
                                구매자정보
                              </span>
                            </div>
                            <div className='flex flex-col gap-[0.4rem] '>
                              <span className='h-[3.9rem] w-[24.9rem] flex-shrink-0 text-32-700 text-black-2'>
                                {item.artist}
                              </span>
                              <span className='text-16-500 text-gray-9'>구매자 번호</span>
                            </div>
                            <div className='flex flex-col gap-[0.4rem] '>
                              <span className='text-16-500 text-gray-9'>결제금액</span>
                              <span className='text-16-500 text-gray-9'>{item.price + `원`}</span>
                            </div>
                            <div className='flex flex-col gap-[0.4rem] '>
                              <span className='text-16-500 text-gray-9'>주소</span>
                              <span className='h-[7.2rem] w-[32rem] text-16-500 text-gray-9'>
                                서울특별자치도 서울특별자치도 서울특별자치도 서울특별자치도 서울특별자치도 (000000)
                                105동 103호
                              </span>
                            </div>
                          </div>
                        </AlertDialogDescription>
                        <AlertDialogCancel>
                          <Image
                            src={'svgs/my-page-modal-close-icon.svg'}
                            width={30}
                            height={30}
                            className='absolute h-[3rem] w-[3rem] flex-shrink-0'
                            alt='모달 닫기 버튼 아이콘'
                          />
                        </AlertDialogCancel>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div className='mt-[5rem] flex flex-col gap-[2.3rem]'>
                    <div className='flex h-[3.9rem] w-[35.5rem] flex-row items-center justify-center gap-2'>
                      <p className='flex-shrink-0 text-36-900'>{item.price + `원`}</p>
                      <p className='text-28-500 text-gray-9'>{'낙찰'}</p>
                    </div>
                    <p className='ml-[3rem] h-[1.8rem] w-[27.1rem] flex-shrink-0 text-right text-18-700 text-gray-9'>
                      {item.saleDate.slice(0, 10) + ` 경매 종료`}
                    </p>
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      {isFetchingNextPage ? <div>Loading...</div> : <div ref={ref}></div>}
    </>
  );
}
