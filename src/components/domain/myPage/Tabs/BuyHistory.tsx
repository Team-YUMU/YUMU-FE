import { useRouter } from 'next/router';
import { getBuyHistory } from '@/services/api';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default function BuyHistory() {
  const router = useRouter();
  const handleBuyListDetail = () => {
    router.push('/detail');
  };
  const [ref, inView] = useInView();
  const historyBoxStyles =
    ' flex h-[18rem] w-[90.8rem] flex-shrink-0 flex-row justify-around gap-[35rem] rounded-[1rem] border-[0.1rem] border-gray-C hover:border-2';

  const {
    data: postInfoList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 999999 }) => getBuyHistory(pageParam, 5),
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
      {postInfoList && postInfoList?.pages[0]?.postList.length > 0 ? (
        <div className='inline-flex h-[73rem] flex-col gap-[1.6rem] overflow-scroll' onScroll={handleScroll}>
          {postInfoList?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.postList.map((item, itemIndex) => (
                <div className={`${historyBoxStyles} items-center`} key={itemIndex}>
                  <div className='ml-[4.8rem]'>
                    <span className='h-[1.8333rem] w-[5rem] flex-shrink-0 text-18-700 text-gray-9'>배송중</span>
                    <div className='flex flex-col gap-[2.48rem]'>
                      <p className='h-[3.9rem] w-[30rem] flex-shrink-0 text-32-700 text-black-2'>{item.artTitle}</p>
                      <p className='h-[1.8333rem] w-[18.3rem] flex-shrink-0 text-18-700 text-gray-9'>
                        아티스트 : {item.artist}
                      </p>
                    </div>
                  </div>
                  <div className='ml-[5rem] flex flex-col gap-[6.85rem]'>
                    <p className='h-[1.8rem] w-[16.5rem] flex-shrink-0 text-18-700 text-gray-9'>
                      {item.purchaseDate ? item.purchaseDate.slice(0, 10) + `낙찰` : '판매일자 없음'}
                    </p>
                    <p
                      className='ml-[5rem] h-[1.8333rem] w-[8.8rem] flex-shrink-0 text-right text-18-700 text-gray-9'
                      onClick={handleBuyListDetail}
                    >
                      자세히 보기
                    </p>
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
              src={'svgs/buy-history-null-icon.svg'}
            />
          </div>
          <p className='text-center font-TheJamsil text-20-400 text-gray-C'>낙찰된 작품이 없습니다.</p>
          <p className='h-[4.3rem] w-[30.2rem] text-center text-16-500 leading-[2rem] text-gray-C'>
            현재 라이브중인 제품중에 마음이 이끄는 예술품을 발견해봐요!
          </p>
          <button
            className='h-[4.8rem] w-[16rem] rounded-[0.6rem] border-[0.1rem] border-red-F text-16-700 leading-[2rem] text-red-F outline-red-F'
            onClick={() => router.push('/search?sort=$live')}
          >
            현재 Live 경매 보기
          </button>
        </div>
      )}
    </>
  );
}
