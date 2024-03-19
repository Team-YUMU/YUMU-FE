import PurchaseHistories from '@/mocks/PurchaseHistory';
import { useRouter } from 'next/router';

export default function BuyHistory() {
  const buyHistory = PurchaseHistories;
  const router = useRouter();
  const handleBuyListDetail = () => {
    router.push('mypage/detail');
  };
  const historyBoxStyles =
    ' flex h-[13.5rem] w-[56.875rem] flex-shrink-0 flex-row justify-around gap-[20rem] rounded-[0.8rem] border-[0.1rem] border-red-F hover:border-2';
  return (
    <div className='flex h-[40rem] w-full flex-col gap-3 overflow-scroll'>
      {buyHistory.map((item, id) => {
        return (
          <div className={`${historyBoxStyles} items-center`} key={id}>
            <div className='w-[15rem]'>
              <span className='text.11.1-400'>배송중</span>
              <p className='text-22.5-500'>{item.artTitle}</p>
              <p className='text.11.1-400'>아티스트 : {item.artist}</p>
            </div>
            <div className='flex flex-col gap-[5rem]'>
              <p className='text.11.1-400'>{item.purchaseDate.slice(0, 10) + ` 낙찰`}</p>
              <p
                className='text.11.1-400 flex flex-row items-center justify-center hover:border-b-[0.1rem] hover:border-red-F'
                onClick={handleBuyListDetail}
              >
                자세히 보기
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
