import { CircleAlert } from 'lucide-react';

type InfoBoxProps = {
  className?: string;
};

export default function InfoBox({ className }: InfoBoxProps) {
  return (
    <div
      className={`flex h-[8rem] w-full flex-row items-center space-x-[1.3rem] rounded-xl bg-stone-50 px-[3.2rem] text-16-700 ${className}`}
    >
      <CircleAlert color='#bdbdbd' size={16} />
      <p className='text-16-700 text-stone-300'>제주도 및 도서 산간 지역은 배송이 불가합니다.</p>
    </div>
  );
}
