import { useRouter } from 'next/router';
import { getBuyHistory } from '@/services/api';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
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
      <div className='inline-flex h-[73rem] flex-col gap-[1.6rem] overflow-scroll' onScroll={handleScroll}>
        {postInfoList?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.postList.map((item, itemIndex) => (
              <div className={`${historyBoxStyles} items-center`} key={itemIndex}>
                <div className='ml-[4.8rem]'>
                  <span className='h-[1.8333rem] w-[5rem] flex-shrink-0 text-18-700 text-gray-9'>배송중</span>
                  <div className='flex flex-col gap-[2.48rem]'>
                    <p className='h-[3.9rem] w-[24.9rem] flex-shrink-0 text-32-700 text-black-2'>{item.artTitle}</p>
                    <p className='h-[1.8333rem] w-[18.3rem] flex-shrink-0 text-18-700 text-gray-9'>
                      아티스트 : {item.artist}
                    </p>
                  </div>
                </div>
                <div className='ml-[5rem] flex flex-col gap-[6.85rem]'>
                  <p className='h-[1.8rem] w-[16.5rem] flex-shrink-0 text-18-700 text-gray-9'>
                    {item.purchaseDate.slice(0, 10) + ` 낙찰`}
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
      </div>
      {isFetchingNextPage ? <div>Loading...</div> : <div ref={ref}></div>}
    </>
  );
}
