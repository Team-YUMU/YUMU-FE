import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { QueryClient, useInfiniteQuery, useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import { getWishHistory, postWishAuction } from '@/services/api';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function WishList() {
  const [ref, inView] = useInView();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: getWishList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['getWishList'],
    queryFn: ({ pageParam = 999999 }) => getWishHistory(pageParam, 6),
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

  const { mutate } = useMutation({
    mutationFn: (itemId: number) => postWishAuction(itemId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleButtonClick = (itemId: number) => {
    mutate(itemId);
  };

  return (
    <div className='grid h-[73rem] w-[90.8rem] grid-cols-3 gap-[1.72rem] overflow-scroll' onScroll={handleScroll}>
      {getWishList && getWishList?.pages[0]?.postList.length > 0 ? (
        <>
          {getWishList?.pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page?.postList.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className={`relative gap-[5rem]`}>
                    <Image
                      className='h-[20rem] w-[29.2rem] flex-shrink-0 rounded-[0.6rem]'
                      width={292}
                      height={200}
                      src={item.imageUrl}
                      alt='관심경매 이미지'
                    />
                    <Button
                      type='button'
                      variant='myPageWish'
                      size='myPageWish'
                      onClick={() => handleButtonClick(item.auctionId)}
                    >
                      <Image
                        width={35}
                        height={30}
                        className='absolute'
                        src={'/images/heart_on.png'}
                        alt='관심목록 찜 버튼'
                      />
                    </Button>
                    <Link href={`/auction/${item.auctionId}/detail`}>
                      <div className='pt-[1.5rem] text-20-700 text-black-0 '>
                        <p className='hover:border-b-[0.1rem] hover:border-b-black-2'>{item.artTitle}</p>
                        <p className='h-[5.4rem] w-[19.1rem] text-18-500 text-gray-9'>{item.artSubtitle}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
          {isFetching ? (
            <div className='grid grid-cols-3 gap-[1.72rem]'>
              <Skeleton className='h-[20rem] w-[29.2rem] flex-shrink-0 rounded-[0.6rem] bg-gray-7' />
              <Skeleton className='h-[20rem] w-[29.2rem] flex-shrink-0 rounded-[0.6rem] bg-gray-7' />
              <Skeleton className='h-[20rem] w-[29.2rem] flex-shrink-0 rounded-[0.6rem] bg-gray-7' />
            </div>
          ) : (
            <div ref={ref}></div>
          )}
        </>
      ) : (
        <div className='inline-flex h-[73rem] w-[90.8rem] flex-col items-center gap-[2rem]'>
          <div className='flex w-[15.2rem] flex-col items-center gap-[1rem]'>
            <Image
              alt='판매 목록 빈 목록 일 때 박스 이미지'
              width={152}
              height={100}
              src={'svgs/wish-history-null-icon.svg'}
            />
          </div>
          <p className='text-center font-TheJamsil text-20-400 text-gray-C'>관심 작품이 없습니다.</p>
          <p className='h-[4.3rem] w-[30.2rem] text-center text-16-500 leading-[2rem] text-gray-C'>
            유무는 작품의 가치를 높이는 사이트입니다! 유투메어 유일무이한 작품을 발견해보세요!
          </p>
          <button
            className='h-[4.8rem] w-[16rem] rounded-[0.6rem] border-[0.1rem] border-red-F text-16-700 leading-[2rem] text-red-F outline-red-F'
            onClick={() => router.push('/search?sort=$live')}
          >
            현재 Live 경매 보기
          </button>
        </div>
      )}
    </div>
  );
}
