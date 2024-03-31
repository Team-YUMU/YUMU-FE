import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { QueryClient, useQuery, keepPreviousData } from '@tanstack/react-query';
import Pagination from '@/components/common/Pagination';
import AuctionList from '@/components/domain/search/AuctionList';
import EmptyView from '@/components/common/EmptyView';
import SelectBox from '@/components/common/SortSelect';
import { AuctionProps } from '@/types/types';
import { getAuction } from '@/services/api';
interface AuctionData {
  page: number;
  totalElements: number;
  totalPages: number;
  auctions: AuctionProps[];
}

function SearchPage() {
  const router = useRouter();
  const { keyword } = router.query;
  const searchKeyword = typeof keyword === 'string' ? keyword : '';

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;
  const indexSize = 10;
  // const totalCount = 18; // 서버에서 가져옴 totalCount = totalElements
  // const totalPage = Math.ceil(totalCount / pageSize); // 서버에서 가져옴 totalPage = totalPages
  const currentPageGroup = Math.ceil(currentPage / indexSize);

  const [order, setOrder] = useState('latest');

  const {
    data: auctionData,
    isPending,
    isError,
  } = useQuery<AuctionData>({
    queryKey: ['auctions', currentPage, order, searchKeyword],
    queryFn: () => getAuction(currentPage, pageSize, order, searchKeyword),
    placeholderData: keepPreviousData,
  });

  const queryClient = new QueryClient();

  const auctions = auctionData?.auctions ?? [];
  const totalPage = auctionData?.totalPages ?? 0;

  const startPage = (currentPageGroup - 1) * indexSize + 1;
  const endPage = Math.min(startPage + indexSize - 1, totalPage);

  // const sortedItems = auctions.sort( // 서버에서 정렬해 줌
  //   (a, b) => Number(b[order as keyof AuctionProps]) - Number(a[order as keyof AuctionProps]),
  // );

  useEffect(() => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;

      queryClient.prefetchQuery({
        queryKey: ['auctions', currentPage, order, searchKeyword],
        queryFn: () => getAuction(nextPage, pageSize, order, searchKeyword),
      });
    }
  }, [currentPage, queryClient]);

  if (isPending) return '로딩 중입니다...'; // TODO : skeleton ui 리팩토링

  if (isError) return '에러가 발생했습니다.';

  return (
    <div className='mx-auto my-0 w-[136.8rem]'>
      <Head>
        <title>{keyword} 검색 결과 - YUMU</title>
      </Head>

      <div className='mb-[6rem] flex items-center'>
        <h2 className='flex-1 text-18-500 text-gray-9'>
          &apos;<strong>{keyword}</strong>&apos;에 대한 검색 결과
        </h2>

        <SelectBox setOrder={setOrder} />
      </div>

      <div className='flex flex-col items-center gap-[9rem]'>
        {auctions && auctions.length !== 0 ? (
          <AuctionList auctions={auctions} />
        ) : (
          <EmptyView
            title='작품을 찾지 못했습니다.'
            description={`새로운 검색어로\n 당신에게 단 하나뿐인 작품을 찾아보세요!`}
          />
        )}

        {auctions && auctions.length !== 0 && (
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            startPage={startPage}
            endPage={endPage}
          />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
