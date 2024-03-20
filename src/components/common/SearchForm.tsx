import { useRouter } from 'next/router';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
    return router.push(`/search?q=${keyword}`);
  };

  return (
    <form onSubmit={handleSubmit} className='relative'>
      <Input
        name='keyword'
        value={keyword}
        onChange={handleKeywordChange}
        placeholder='작품명 또는 작가 이름을 검색해보세요'
        className='header'
      />
      <Button type='submit' variant={null} size={null} className='absolute right-[1.6rem] top-[1.4rem]'>
        <Image src='/svgs/search-icon.svg' alt='돋보기 이미지' width={19} height={18} />
      </Button>
    </form>
  );
}

export default SearchForm;
