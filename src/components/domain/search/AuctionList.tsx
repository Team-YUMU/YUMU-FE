import Link from 'next/link';
import { AuctionProps } from '@/types/types';
import AuctionCard from '@/components/common/AuctionCard';

export default function AuctionList({ auctions }: { auctions: AuctionProps[] }) {
  return (
    <ul className='grid w-full grid-cols-4 gap-x-[3rem] gap-y-[6rem]'>
      {auctions?.map((item) => (
        <li key={item.id}>
          <Link href={`/auction/${item.id}/detail`}>
            <AuctionCard {...item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
