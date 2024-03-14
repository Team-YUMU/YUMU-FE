import { useRouter } from 'next/router';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    <form onSubmit={handleSubmit} className='flex'>
      <Input
        name='keyword'
        value={keyword}
        onChange={handleKeywordChange}
        placeholder='작품명 또는 작가 이름을 검색해보세요'
        className='w-[20rem]'
      />
      <Button type='submit' variant={'secondary'}>
        검색
      </Button>
    </form>
  );
}

export default SearchForm;
