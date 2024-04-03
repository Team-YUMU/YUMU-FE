import Image from 'next/image';
import Link from 'next/link';
import { AuctionDetail } from '@/components/common/AuctionDetail';
import { ExhibitionCarousel } from '@/components/common/ExhibitionCarousel';
import InfoBox from '@/components/common/InfoBox';
import LikeButton from '@/components/common/LikeButton';
import LiveTimer from '@/components/common/LiveTimer';
import ScrollButtons from '@/components/common/ScrollButtons';
import { Separator } from '@/components/ui/separator';
import { BestAuction } from '@/components/common/BestAuction';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getAuctionDetails } from '@/services/api';
import { ChevronLeft } from 'lucide-react';

/** TODO
 * 서버사이드 렌더링으로 리팩토링
 * NaN 초기값 이슈 해결 하기
 * 찜 하기 구현하기
 */

export default function AuctionDetailPage() {
  const router = useRouter();
  const { auctionid } = router.query;

  const { data: auctionDetailsData = [] } = useQuery({
    queryKey: ['auctionDetail'],
    queryFn: () => getAuctionDetails(Number(auctionid)),
    initialData: [],
  });

  const { artName, artSubTitle, artImage, artist, status } = auctionDetailsData?.artInfo ?? [];
  const { artDescription, auctionStartDate, auctionEndDate, notice } = auctionDetailsData;

  const formatDate = (dateString: string, type: string) => {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const date = String(dateObject.getDate()).padStart(2, '0');
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');

    if (type === 'YYYY년 MM월 DD일 HH:MM') {
      return `${year}년 ${month}월 ${date}일 ${hours}:${minutes}`;
    } else if (type === 'MM.DD') {
      return `${month}.${date} ${hours}:${minutes}`;
    }
  };

  let linkText = '';

  switch (status) {
    case 'ON':
      linkText = `${formatDate(auctionStartDate, 'MM.DD')} 오픈 예정`;
      break;
    case 'NOW':
      linkText = 'Live 경매 참가하기';
      break;
    case 'DONE':
      linkText = '종료';
      break;
    default:
      linkText = `${formatDate(auctionStartDate, 'MM.DD')} 오픈 예정`;
  }

  return (
    <div className='relative mx-auto my-0 flex w-[136.8rem] flex-col pb-[10.5rem]'>
      <div className='mb-[4rem] flex flex-row items-center gap-[0.4rem] font-TheJamsil text-36-400 text-black-2'>
        <button onClick={() => router.push('/search')}>
          <ChevronLeft color='#e0e0e0' width={36} height={36} />
        </button>
        {artName}
      </div>

      <div className='mb-[8rem] flex gap-[2rem]'>
        <section className='w-[91rem]'>
          <div className='relative mb-[1.8rem] h-[54rem] overflow-hidden rounded-[1rem] bg-gray-100'>
            <Image src={artImage} alt={artName} fill />
          </div>

          <InfoBox className='mb-[3rem]' notice={notice} />

          <AuctionDetail description={artDescription} {...auctionDetailsData} />
        </section>

        <section className='flex-1'>
          <div className='flex h-[63.8rem] flex-col rounded-[1rem] border px-[3.7rem] pb-[3.4rem] pt-[4.1rem]'>
            <div className='mb-[1.2rem] flex items-center justify-between'>
              <div className='flex gap-4 text-gray-99'>
                <span className='text-16-600'>아티스트</span>
                <span className='block text-16-500'>{artist}</span>
              </div>

              <LikeButton />
            </div>

            <div className='mb-[3rem] flex-1'>
              <h2 className='mb-[1.6rem] font-[TheJamsil] text-36-400 text-black-2'>{artSubTitle}</h2>
              <p className='text-18-500 text-gray-99'>{artDescription}</p>
            </div>

            <div>
              <div className='flex flex-col'>
                <span className='text-16-500 text-gray-99'>라이브 오픈까지 남은 시간</span>
                <span className='text-18-500 text-[#dcdcdc]'>라이브 {status}</span>
              </div>

              <Separator className='my-[2rem]' />

              <div className='flex flex-col gap-[0.6rem] '>
                <div className='flex min-w-[6.3rem] gap-12 text-gray-99'>
                  <span className='text-16-700'>경매 시작</span>
                  <span className='text-16-500'>{formatDate(auctionStartDate, 'YYYY년 MM월 DD일 HH:MM')}</span>
                </div>

                <div className='flex min-w-[6.3rem] gap-12 text-gray-99'>
                  <span className='text-16-700'>경매 마감</span>
                  <span className='text-16-500'>{formatDate(auctionEndDate, 'YYYY년 MM월 DD일 HH:MM')}</span>
                </div>
              </div>

              <div className='relative'>
                {status === 'NOW' && (
                  <div className='absolute left-[50%] top-[-50%] flex h-[3.5rem] w-[21.2rem] translate-x-[-50%] translate-y-[40%] items-center justify-center gap-[1.8rem] rounded-full border-4 border-red-F bg-white text-red-F'>
                    <span className='text-16-900'>LIVING</span>
                    <LiveTimer startTime={auctionStartDate} />
                  </div>
                )}

                <Link
                  href={`/auction/${auctionid}/live`}
                  className={`mt-[4.8rem] flex h-[6.4rem] w-full items-center justify-center rounded-[0.6rem] ${status === 'NOW' ? 'mt-[3rem] bg-red-F' : 'pointer-events-none bg-[#B3B3B3]'} font-TheJamsil text-[2.6rem] font-bold text-white`}
                >
                  {linkText}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <BestAuction className='mb-[8rem]' />

      <section>
        <h2 className='sr-only'>기획전</h2>
        <ExhibitionCarousel />
      </section>

      <ScrollButtons />
    </div>
  );
}
