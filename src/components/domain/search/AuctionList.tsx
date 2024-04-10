import Link from 'next/link';
import { AuctionProps } from '@/types/types';
import AuctionCard from '@/components/common/AuctionCard';

type AuctionListProps = {
  auctions: AuctionProps[];
  isLogin: boolean;
};

export default function AuctionList({ auctions, isLogin }: AuctionListProps) {
  return (
    <ul className='grid w-full grid-cols-4 gap-x-[3rem] gap-y-[6rem]'>
      {auctions?.map((item) => (
        <li key={item.id}>
          <Link href={`/auction/${item.id}/detail`}>
            <AuctionCard {...item} isLogin={isLogin} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
