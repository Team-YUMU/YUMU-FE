import { CircleAlert } from 'lucide-react';

type InfoBoxProps = {
  className?: string;
  notice: string;
};

export default function InfoBox({ className, notice }: InfoBoxProps) {
  // 경매 상세 불러오기
  return (
    <div>
      <div
        className={`flex h-[8rem] w-full flex-row items-center space-x-[1.3rem] rounded-xl bg-stone-50 px-[3.2rem] text-16-700 ${className}`}
      >
        <CircleAlert color='#bdbdbd' size={16} />
        <p className='text-16-700 text-stone-300'>{notice}</p>
      </div>
    </div>
  );
}
