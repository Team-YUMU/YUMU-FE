import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/common/Layout';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const exceptionPath = ['/_error', '/404', '/signin', '/signup', '/mypage'];

  if (exceptionPath.includes(router.pathname)) return <Component {...pageProps} />;
  console.log(router.pathname);
  return (
    <Layout>
      <Head>
        <title>YUMU 유무</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
