import Image from 'next/image';

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  startPage: number;
  endPage: number;
};

export default function Pagination({ totalPage, currentPage, setCurrentPage, startPage, endPage }: PaginationProps) {
  return (
    <div className='flex'>
      {currentPage !== 1 && (
        <button type='button' onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className='cursor p-4'>
          <Image src='/svgs/arrow_first.svg' alt='첫 페이지로 가기' width={17} height={12} />
        </button>
      )}

      {currentPage !== 1 && (
        <button
          type='button'
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
          className='cursor mr-4 p-4'
        >
          <Image src='/svgs/arrow_prev.svg' alt='이전 페이지로 가기' width={8} height={12} />
        </button>
      )}

      <ol className='flex'>
        {Array(endPage - startPage + 1)
          .fill(0)
          .map((_, i) => (
            <li key={startPage + i}>
              <button
                type='button'
                onClick={() => setCurrentPage(startPage + i)}
                aria-current={currentPage === startPage + i ? 'page' : undefined}
                className='p-4 text-18-500 text-gray-9 aria-[current]:text-red-F'
              >
                {startPage + i}
              </button>
            </li>
          ))}
      </ol>

      {currentPage !== totalPage && (
        <button
          type='button'
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
          className='cursor ml-4 p-4'
        >
          <Image src='/svgs/arrow_next.svg' alt='다음 페이지로 가기' width={8} height={12} />
        </button>
      )}

      {currentPage !== totalPage && (
        <button
          type='button'
          onClick={() => setCurrentPage(totalPage)}
          disabled={currentPage === totalPage}
          className='cursor p-4'
        >
          <Image src='/svgs/arrow_last.svg' alt='마지막 페이지로 가기' width={17} height={12} />
        </button>
      )}
    </div>
  );
}
