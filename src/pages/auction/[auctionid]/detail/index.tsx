import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuctionDetail } from '@/components/common/AuctionDetail';
import { ExhibitionCarousel } from '@/components/common/ExhibitionCarousel';
import { Separator } from '@/components/ui/separator';
import InfoBox from '@/components/common/InfoBox';
import LikeButton from '@/components/common/LikeButton';
import { BestAuction } from '@/components/common/BestAuction';
import testArts from '@/mocks/testArts.json';

export default function AuctionDetailPage() {
  const artData = testArts.results;
  const [arts, setArts] = useState(artData);

  return (
    <div className='mx-auto my-0 flex w-[136.8rem] flex-col gap-20'>
      <h2 className='font-[TheJamsil] text-36-400 text-black-2'>문은주 Moon Eunjoo 이불 밖은 위험해 2, 2023</h2>
      <div className='flex gap-5'>
        <section>
          <div className='relative mb-[1.8rem] h-[54rem] w-[91rem] overflow-hidden rounded-[1rem] bg-gray-100'>
            <Image src='https://ymkimstorage.s3.ap-northeast-2.amazonaws.com/art2.png' alt='작품 이미지' fill />
          </div>

          <InfoBox className='mb-[3rem]' />

          <AuctionDetail />
        </section>

        <section>
          <div className='w-[45.8rem] rounded-[1rem] border px-[3.7rem] pb-[3.4rem] pt-[4.1rem]'>
            <div className='mb-10'>
              <div className='flex items-center justify-between'>
                <div className='mb-3 flex gap-4 text-gray-99'>
                  <span className='text-16-600'>아티스트</span>
                  <span className='block text-16-500'>문은주 Moon Eunjoo</span>
                </div>

                <LikeButton />
              </div>

              <h2 className='mb-4 font-[TheJamsil] text-36-400 text-black-2'>이불 밖은 위험해 2, 2023</h2>
              <p className='min-h-[19.3rem] text-18-500 text-gray-99'>
                대중과 작가가 만날 수 있는 특별한 교류의 장, 프린트베이커리 문화기획 프로젝트 오픈 스튜디오가 10월 21일
                (토) 에 오픈합니다. 가나아뜰리에 입주 작가와 PBG 전속작가, 그리고 평범한 마법봉이 협업하여 기부 전시를
                진행하며 판매 수익금의 일부는 발달장애 예술 교육을 위해 기부됩니다. 온라인에서 전시될 작품의 일부를 먼저
                만나보세요!
              </p>
            </div>

            <div className='flex flex-col'>
              <span className='text-16-500 text-gray-99'>라이브 오픈까지 남은 시간</span>
              <span className='text-18-500 text-[#dcdcdc]'>라이브 진행 중</span>
            </div>

            <Separator className='my-5' />

            <div className='mb-[3rem] flex flex-col gap-[0.6rem] '>
              <div className='flex min-w-[6.3rem] gap-12 text-gray-99'>
                <span className='text-16-700'>경매 시작</span>
                <span className='text-16-500'>2024년 03월 18일 08:00</span>
              </div>

              <div className='flex min-w-[6.3rem] gap-12 text-gray-99'>
                <span className='text-16-700'>경매 마감</span>
                <span className='text-16-500'>2024년 03월 18일 23:00</span>
              </div>
            </div>

            <div className='relative'>
              <div className='absolute left-[50%] top-[-50%] flex h-[3.5rem] w-[21.2rem] translate-x-[-50%] translate-y-[45%] items-center justify-center gap-[1.8rem] rounded-full border-4 border-[#FF7752] border-[text-red-F] bg-white text-red-F'>
                <span className='text-16-900'>LIVE</span>
                <strong className='text-16-700'>00 : 30 : 59</strong>
              </div>

              <Link
                href={``}
                className='flex h-[6.4rem] w-full items-center justify-center rounded-[0.6rem] bg-red-F font-[TheJamsil] text-[2.6rem] font-bold text-white'
              >
                Live 경매 참가하기
              </Link>
            </div>
          </div>
        </section>
      </div>

      <BestAuction />

      <section>
        <h2 className='sr-only'>기획전</h2>

        <ExhibitionCarousel />
      </section>
    </div>
  );
}
