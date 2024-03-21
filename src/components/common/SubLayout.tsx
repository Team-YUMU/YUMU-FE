import Header from '@/components/common/Header';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function SubLayout({ children }: LayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='grow'>{children}</main>
    </div>
  );
}
