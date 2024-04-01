import Image from 'next/image';
import { Separator } from '../ui/separator';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className='flex h-[36.8rem] w-full flex-row items-center justify-center gap-[78.7rem] text-nowrap border-t-[0.1rem] border-gray-DF bg-white py-[6rem] pt-[5.4rem] md:gap-[30rem]'>
      <div className='flex flex-col gap-[4rem]'>
        <div className='flex flex-col items-center gap-[1.3rem]'>
          <Link href='https://github.com/Team-YUMU' target='_blank'>
            <Image src='/svgs/yumu-logo.svg' alt='로고 이미지' width={241} height={47} />
          </Link>
          <div className='flex flex-row gap-[1.8rem]'>
            <Image src='/svgs/Y.svg' alt='로고 이미지' width={17} height={22} />
            <Image src='/svgs/U.svg' alt='로고 이미지' width={18} height={22} />
            <Image src='/svgs/M.svg' alt='로고 이미지' width={19} height={22} />
            <Image src='/svgs/U.svg' alt='로고 이미지' width={18} height={22} />
          </div>
        </div>
        <div className='flex h-[5.6rem] flex-row items-center gap-[1.8rem] text-18-500'>
          <Separator orientation='vertical' className='h-full w-[0.6rem] bg-gray-D' />
          <p className='text-gray-99'>
            당신의 과거가 오래동안
            <br />
            유의미할 수 있도록
          </p>
        </div>
      </div>
      <div className='flex flex-col items-end gap-[4rem] text-18-500'>
        <p className='text-gray-9'>함께한 사람들</p>
        <div className='flex h-[19rem] flex-row gap-[4rem]'>
          <div className='flex flex-col items-center gap-[0.5rem] text-gray-6'>
            <h1 className='text-20-700'>FE</h1>
            <Link href='https://github.com/00TaciTa00' target='_blank'>
              <p className='text-gray-99'>이서영</p>
            </Link>
            <Link href='https://github.com/Nebaisgood' target='_blank'>
              <p className='text-gray-99'>성은지</p>
            </Link>
            <Link href='https://github.com/ynmkim' target='_blank'>
              <p className='text-gray-99'>김윤미</p>
            </Link>
            <Link href='https://github.com/hyun522' target='_blank'>
              <p className='text-gray-99'>정현진</p>
            </Link>
            <Link href='https://github.com/PJW980921' target='_blank'>
              <p className='text-gray-99'>박지원</p>
            </Link>
          </div>
          <Separator orientation='vertical' className='h-full w-[0.1rem] bg-gray-D' />
          <div className='flex flex-col items-center gap-[0.5rem] text-gray-6'>
            <h1 className='text-20-700'>BE</h1>
            <Link href='https://github.com/quipu1' target='_blank'>
              <p className='text-gray-99'>성루비</p>
            </Link>
            <Link href='https://github.com/seominsu1' target='_blank'>
              <p className='text-gray-99'>서민수</p>
            </Link>
          </div>
          <Separator orientation='vertical' className='h-full w-[0.1rem] bg-gray-D' />
          <div className='flex flex-col items-center gap-[0.5rem] text-gray-6'>
            <h1 className='text-20-700'>DE</h1>
            <Link href='https://url.kr/zjhygq' target='_blank'>
              <p className='text-gray-99'>조효은</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
