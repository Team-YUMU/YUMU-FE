import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

type AuctionDetailHeaderProps = {
  artName: string | undefined;
  href: string;
  className?: string;
};

function AuctionDetailHeader({ artName, className, href }: AuctionDetailHeaderProps) {
  return (
    <div className={`mb-[4rem] flex items-center gap-[1.6rem] ${className}`}>
      <Link href={href} className='-ml-[1.2rem]'>
        <ChevronLeft color='#e0e0e0' width={36} height={36} />
      </Link>

      <h2 className=' font-TheJamsil text-36-400 text-black-2'>{artName}</h2>
    </div>
  );
}

export default AuctionDetailHeader;
