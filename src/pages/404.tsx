import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className='flex h-screen w-full items-center justify-center  bg-white'>
      <div className='flex w-[37.5rem] flex-col items-center justify-center gap-[4rem]'>
        <Image src='/images/not_found.png' alt='페이지를 찾을 수 없습니다' height={525} width={281} />

        <button
          className='h-[5.5rem] w-full rounded-[0.5rem] bg-red-F text-20-400 text-white'
          onClick={() => router.back()}
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
