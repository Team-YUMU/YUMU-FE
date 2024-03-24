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
        <button
          type='button'
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
          className='cursor p-4 text-14-500'
        >
          &lt;
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
                className='p-4 text-14-500 text-gray-7 aria-[current]:text-[#000]'
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
          className='cursor p-4 text-14-500'
        >
          &gt;
        </button>
      )}
    </div>
  );
}
