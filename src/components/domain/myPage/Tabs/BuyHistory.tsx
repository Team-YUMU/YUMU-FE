import PurchaseHistories from '@/mocks/PurchaseHistory';
import { useRouter } from 'next/router';

export default function BuyHistory() {
  const buyHistory = PurchaseHistories;
  const router = useRouter();
  const handleBuyListDetail = () => {
    router.push('mypage/detail');
  };
  const historyBoxStyles =
    ' flex h-[18rem] w-[90.8rem] flex-shrink-0 flex-row justify-around gap-[35rem] rounded-[1rem] border-[0.1rem] border-gray-C hover:border-2';
  return (
    <div className='inline-flex h-[73rem] flex-col gap-[1.6rem] overflow-scroll'>
      {buyHistory.map((item, id) => {
        return (
          <div className={`${historyBoxStyles} items-center`} key={id}>
            <div className='ml-[4.8rem]'>
              <span className='  h-[1.8333rem] w-[5rem] flex-shrink-0 text-18-700 text-gray-9'>배송중</span>
              <div className='flex flex-col gap-[2.48rem]'>
                <p className='h-[3.9rem] w-[24.9rem] flex-shrink-0 text-32-700 text-black-2'>{item.artName}</p>
                <p className='h-[1.8333rem] w-[18.3rem] flex-shrink-0 text-18-700 text-gray-9'>
                  아티스트 : {item.artist}
                </p>
              </div>
            </div>
            <div className='ml-[5rem] flex flex-col gap-[6.85rem]'>
              <p className='  h-[1.8rem] w-[16.5rem] flex-shrink-0 text-18-700 text-gray-9'>
                {item.purchaseDate.slice(0, 10) + ` 낙찰`}
              </p>
              <p
                className=' ml-[5rem]  h-[1.8333rem] w-[8.8rem] flex-shrink-0 text-right text-18-700 text-gray-9'
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
