import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/common/Layout';
import SubLayout from '@/components/common/SubLayout';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const exceptionPath = ['/_error', '/404', '/signin', '/signup'];

  if (exceptionPath.includes(router.pathname)) return <Component {...pageProps} />;

  if (router.pathname.startsWith('/mypage')) {
    return (
      <SubLayout>
        <Head>
          <title>YUMU 유무</title>
        </Head>
        <Component {...pageProps}></Component>
      </SubLayout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>YUMU 유무</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
