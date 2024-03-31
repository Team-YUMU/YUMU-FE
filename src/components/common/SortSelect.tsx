import Image from 'next/image';
import { useState } from 'react';

type SortSelectProps = {
  setOrder: React.Dispatch<React.SetStateAction<string>>;
};

export default function SortSelect({ setOrder }: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string, order: string) => {
    setSelectedOption(option);
    setOrder(order);
    toggleDropdown();
  };

  return (
    <div className='relative z-10 text-16-400 text-gray-9'>
      <button
        type='button'
        onClick={toggleDropdown}
        className={`relative flex w-[12rem] cursor-pointer  items-center border border-gray-9 bg-white px-4 py-2 ${isOpen ? 'rounded-t-[0.6rem] border-b-transparent ' : 'rounded-[0.6rem] border-b-gray-9'}`}
      >
        {selectedOption}
        <Image
          src='/svgs/chevron_down.svg'
          alt={`${isOpen ? '메뉴 닫기' : '메뉴 열기'}`}
          width={14}
          height={9}
          className={`absolute right-4 top-2/4 -translate-y-2/4`}
        />
      </button>

      <ul
        className={`absolute left-0 top-[3.4rem] w-[12rem] overflow-hidden rounded-b-[0.6rem] border-gray-9 bg-white px-4 ${isOpen ? 'h-auto border-b border-l border-r py-2' : 'h-0'}`}
      >
        <li className='py-2'>
          <button
            type='button'
            onClick={() => handleOptionClick('최신순', 'latest')}
            className='h-full w-full text-start'
          >
            최신순
          </button>
        </li>

        <li className='border-t border-gray-E py-2'>
          <button
            type='button'
            onClick={() => handleOptionClick('인기순', 'popular')}
            className='h-full w-full text-start'
          >
            인기순
          </button>
        </li>
      </ul>
    </div>
  );
}
