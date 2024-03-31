import Image from 'next/image';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getWishHistory } from '@/services/api';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';

export default function WishList() {
  const [ref, inView] = useInView();
  const {
    data: postInfoList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 999999 }) => getWishHistory(pageParam, 9),
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

  const router = useRouter();
  const handleWishClick = () => {};
  return (
    <div className='grid h-[73rem] w-[90.8rem] grid-cols-3 gap-[1.72rem] overflow-scroll' onScroll={handleScroll}>
      {postInfoList?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.postList.map((item, itemIndex) => (
            <div key={itemIndex}>
              <form className={`relative gap-[5rem]`}>
                <Image
                  className='h-[20rem] w-[29.2rem] flex-shrink-0 rounded-[0.6rem]'
                  width={292}
                  height={200}
                  src={item.imageUrl}
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
                  <p>{item.artTitle}</p>
                  <p className='h-[5.4rem] w-[19.1rem] text-18-500 text-gray-9'>{item.artSubtitle}</p>
                </div>
              </form>
            </div>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage ? <div>Loading...</div> : <div ref={ref}></div>}
    </div>
  );
}
