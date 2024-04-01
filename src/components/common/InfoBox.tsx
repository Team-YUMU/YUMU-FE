import { getAuctionDetails } from '@/services/api';
import { CircleAlert } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type InfoBoxProps = {
  className?: string;
};

export default function InfoBox({ className }: InfoBoxProps) {
  const [auctionNotice, setAuctionNotice] = useState<string | null>('');
  // 경매 상세 불러오기
  const router = useRouter();
  const { auctionid } = router.query;
  const auctionId = Number(auctionid);

  const getAuctionNotice = async () => {
    try {
      const data = await getAuctionDetails(auctionId);
      console.log('경매 유의사항:', data.notice);
      setAuctionNotice(data.notice);
      // 필요한 처리 로직 추가
    } catch (error) {
      console.error('경매 유의사항을 가져오는 동안 오류 발생:', error);
    }
  };

  useEffect(() => {
    getAuctionNotice();
  }, [auctionid]);

  return (
    <div>
      {auctionNotice && (
        <div
          className={`flex h-[8rem] w-full flex-row items-center space-x-[1.3rem] rounded-xl bg-stone-50 px-[3.2rem] text-16-700 ${className}`}
        >
          <CircleAlert color='#bdbdbd' size={16} />
          <p className='text-16-700 text-stone-300'>{auctionNotice}</p>
        </div>
      )}
    </div>
  );
}
