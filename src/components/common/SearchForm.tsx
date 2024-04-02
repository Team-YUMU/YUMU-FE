import { useRouter } from 'next/router';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

function SearchForm() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) {
      return router.push('/');
    }

    setKeyword(''); // TODO : 검색 페이지 제외, 다른 페이지 이동시에 초기화 하기
    return router.push(`/search?keyword=${keyword}`);
  };

  return (
    <form onSubmit={handleSubmit} className='relative'>
      <Input
        name='keyword'
        value={keyword}
        onChange={handleKeywordChange}
        placeholder='작품명 또는 작가 이름을 검색해보세요'
        variant='header'
        className='pr-[4.7rem] text-15-400'
      />
      <button type='submit' className='absolute right-[1.6rem] top-[1.4rem]'>
        <Image src='/svgs/search-icon.svg' alt='검색하기' width={19} height={18} />
      </button>
    </form>
  );
}

export default SearchForm;
