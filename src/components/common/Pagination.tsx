type PaginationProps = {
  totalPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({ totalPage, currentPage, setCurrentPage }: PaginationProps) {
  return (
    <div className='flex'>
      <button
        type='button'
        onClick={() => {
          setCurrentPage((prev) => prev - 1);
        }}
        disabled={currentPage === 1}
        className='cursor p-4 text-14-500 disabled:text-gray-7'
      >
        &lt;
      </button>

      <ol className='flex'>
        {Array(totalPage)
          .fill(0)
          .map((_, i) => (
            <li key={i + 1}>
              <button
                type='button'
                onClick={() => setCurrentPage(i + 1)}
                aria-current={currentPage === i + 1 ? 'page' : undefined}
                className='p-4 text-14-500 text-gray-7 aria-[current]:text-[#000]'
              >
                {i + 1}
              </button>
            </li>
          ))}
      </ol>

      <button
        type='button'
        onClick={() => {
          setCurrentPage((prev) => prev + 1);
        }}
        disabled={currentPage === totalPage}
        className='cursor p-4 text-14-500 disabled:text-gray-7'
      >
        &gt;
      </button>
    </div>
  );
}
