import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from 'lucide-react';

interface ScrollButtonProps {
  direction: 'up' | 'down' | 'right' | 'left';
  onClick: () => void;
  isAble?: boolean;
}

export default function ScrollButton({ direction, onClick, isAble = true }: ScrollButtonProps) {
  let icon = null;

  switch (direction) {
    case 'up':
      icon = <ChevronUp color={isAble ? '#ff7752' : '#e0e0e0'} className={`size-[3.2rem] hover:size-[3.5rem]`} />;
      break;
    case 'down':
      icon = <ChevronDown color={isAble ? '#ff7752' : '#e0e0e0'} className={`size-[3.2rem] hover:size-[3.5rem]`} />;
      break;
    case 'right':
      icon = <ChevronRight color={isAble ? '#ff7752' : '#e0e0e0'} className={`size-[3.2rem] hover:size-[3.5rem]`} />;
      break;
    case 'left':
      icon = <ChevronLeft color={isAble ? '#ff7752' : '#e0e0e0'} className={`size-[3.2rem] hover:size-[3.5rem]`} />;
      break;
    default:
      icon = null;
  }

  return (
    <Button
      onClick={onClick}
      disabled={!isAble}
      className='size-[7.7rem] shrink-0 rounded-full border bg-white p-0 hover:bg-white focus:bg-white'
    >
      {icon}
    </Button>
  );
}
