import Image from 'next/image';

type EmptyViewProps = {
  title: string;
  description: string;
  className?: string;
};

export default function EmptyView({ title, description, className }: EmptyViewProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-[2rem] whitespace-pre-line py-[8rem] text-center text-gray-C ${className}`}
    >
      <Image src='/svgs/empty_view.svg' alt='' width={112} height={152} />
      <h3 className='text-20-400'>{title}</h3>
      <p className='text-16-500'>{description}</p>
    </div>
  );
}
