import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  );
}
