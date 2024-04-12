import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/common/Layout';
import SubLayout from '@/components/common/SubLayout';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const exceptionPath = ['/_error', '/404'];
  const exceptionPath2 = ['/mypage', '/signin', '/signup'];

  const LayoutFilter = exceptionPath2.includes(router.pathname) ? SubLayout : Layout;
  if (exceptionPath.includes(router.pathname)) return <Component {...pageProps} />;

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutFilter>
        <Head>
          <title>YUMU 유무</title>
          <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        </Head>
        <Component {...pageProps}></Component>
      </LayoutFilter>
    </QueryClientProvider>
  );
}
