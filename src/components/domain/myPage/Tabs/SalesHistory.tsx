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
import { useRouter } from 'next/router';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function SalesHistory() {
  const [ref, inView] = useInView();
  const historyBoxStyles =
    'flex h-[24rem] w-[90.8rem] flex-shrink-0 flex-row justify-around gap-[40rem] rounded-[1rem] border-[0.1rem] border-gray-C';

  const {
    data: getSalesList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 999999 }) => getSalesHistory(pageParam, 5),
    initialPageParam: 999999,
    retry: 0,
    getNextPageParam: (lastPage) => (!lastPage?.isLast ? lastPage?.nextLastPostId : undefined),
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (inView && scrollHeight - scrollTop === clientHeight && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  const router = useRouter();

  return (
    <>
      {getSalesList && getSalesList?.pages[0]?.postList.length > 0 ? (
        <div className='inline-flex h-[73rem] flex-col gap-[1.6rem] overflow-scroll' onScroll={handleScroll}>
          {getSalesList?.pages.map((page, index) => (
            <Fragment key={index}>
              {page?.postList.map((item, itemIndex) => (
                <div className={`${historyBoxStyles} items-center`} key={itemIndex}>
                  <div className=' mx-[4.8rem] flex w-[1rem] flex-col gap-[4.3rem]'>
                    <div className='flex flex-col gap-[0.4rem]'>
                      <span className='h-[1.8rem] w-[9.5rem] flex-shrink-0 text-18-700 text-gray-9'>{'판매 완료'}</span>
                      <Link href={`/auction/${item.auctionId}/detail`}>
                        <p className='h-[3.9rem] w-[30rem] flex-shrink-0 text-32-700 text-black-2 hover:border-b-[0.1rem]  hover:border-b-black-2'>
                          {item.artTitle}
                        </p>
                      </Link>
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
                  <div className=' mt-[5rem] flex w-[40rem] flex-col gap-[2.3rem]'>
                    <div className='flex h-[3.9rem] w-[35.5rem] flex-row items-center justify-end gap-2'>
                      <p className='flex-shrink-0 text-36-900'>{item.price + `원`}</p>
                      <p className='text-28-500 text-gray-9'>{'낙찰'}</p>
                    </div>
                    <div className='flex h-[3.9rem] w-[35.5rem] flex-row items-center justify-end gap-2'>
                      <p className='ml-[3rem] h-[1.8rem] w-[27.1rem] flex-shrink-0 justify-end text-right text-18-700 text-gray-9'>
                        {item.saleDate ? item.saleDate.slice(0, 10) + ` 경매 종료` : '판매일자 없음'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
          {isFetching ? (
            <div className='flex flex-col gap-[1.6rem]'>
              <Skeleton className='h-[24rem] w-[90.8rem] rounded-[1rem] border-[0.1rem] bg-gray-7' />
              <Skeleton className='h-[24rem] w-[90.8rem] rounded-[1rem] border-[0.1rem] bg-gray-7' />
              <Skeleton className='h-[24rem] w-[90.8rem] rounded-[1rem] border-[0.1rem] bg-gray-7' />
            </div>
          ) : (
            <div ref={ref}></div>
          )}
        </div>
      ) : (
        <div className='inline-flex h-[73rem] w-[90.8rem] flex-col items-center gap-[2rem]'>
          <div className='flex w-[15.2rem] flex-col items-center gap-[1rem]'>
            <Image
              alt='판매 목록 빈 목록 일 때 박스 이미지'
              width={152}
              height={100}
              src={'svgs/sales-history-null-icon.svg'}
            />
          </div>
          <p className='text-center font-TheJamsil text-20-400 text-gray-C'>아직 등록하신 경매 작품이 없습니다.</p>
          <p className='h-[4.3rem] w-[30.2rem] text-center text-16-500 leading-[2rem] text-gray-C'>
            현재 라이브중인 제품중에 마음이 이끄는 예술품을 발견해봐요!
          </p>
          <button
            className='h-[4.8rem] w-[16rem] rounded-[0.6rem] border-[0.1rem] border-red-F text-16-700 leading-[2rem] text-red-F outline-red-F'
            onClick={() => router.push('/registration')}
          >
            경매 등록하기
          </button>
        </div>
      )}
    </>
  );
}
