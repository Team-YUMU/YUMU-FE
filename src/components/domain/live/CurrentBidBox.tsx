export default function CurrentBidBox() {
  const currentBid = 100000;
  return (
    <div className='flex h-fit flex-col rounded-[1rem] border-2 border-[#f3f3f3] bg-white px-[3rem] py-[2.3rem] text-[#686868]'>
      <h1 className='mb-[0.5rem] text-18-500'>현재 입찰가</h1>
      <p className='flex h-[6.4rem] w-full flex-row items-center justify-center gap-1 rounded-[0.6rem] px-0 text-20-700'>
        {currentBid.toLocaleString()}원
      </p>
    </div>
  );
}
