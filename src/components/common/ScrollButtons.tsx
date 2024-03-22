import { useState, useEffect } from 'react';
import ScrollButton from './ScrollButton';

export default function ScrollButtons() {
  const [isUpAble, setIsUpAble] = useState<boolean>(false);
  const [isDownAble, setIsDownAble] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsUpAble(scrollPosition > 0); // 스크롤이 가장 위에 있는지 여부 확인
      setIsDownAble(scrollPosition < document.body.scrollHeight - window.innerHeight); // 스크롤이 가장 아래에 있는지 여부 확인
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleToBottom = () => {
    const pageHeight = document.body.scrollHeight;
    window.scrollTo({
      top: pageHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`absolute -right-[2rem] h-full translate-x-full gap-[1.7rem]`}>
      <div className='sticky top-1/2 flex -translate-y-1/2 flex-col gap-2'>
        <ScrollButton onClick={handleToTop} direction='up' isAble={isUpAble}></ScrollButton>
        <ScrollButton onClick={handleToBottom} direction='down' isAble={isDownAble}></ScrollButton>
      </div>
    </div>
  );
}
