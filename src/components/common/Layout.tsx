import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  );
}
