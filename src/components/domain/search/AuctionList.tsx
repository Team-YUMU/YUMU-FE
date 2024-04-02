import Link from 'next/link';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function AuctionList({ todos }: { todos: Todo[] }) {
  return (
    <ul className='grid w-full grid-cols-4 gap-x-6 gap-y-8'>
      {todos?.map((item: Todo) => (
        <li key={item.id}>
          <Link href={`/auction/${item.id}/detail`} className='block h-[10rem] border p-4'>
            <h3 className='truncate text-16-500'>{item.title}</h3>
            {item.completed && <span className='text-12-400 text-[#787486]'>완료</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
