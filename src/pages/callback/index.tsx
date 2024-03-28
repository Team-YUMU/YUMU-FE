import { useEffect } from 'react';
import axios from 'axios';
// import { getToken } from '@/services/api';
// import { useRouter } from 'next/router';

export default function callback() {
  // const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const search = new URLSearchParams(window.location.search);
        const code = search.get('code');

        const res = await axios.get(`http://43.200.219.117:8080/api/v1/auth/kakao/callback?code=${code}`);

        const accessToken = res.headers['authorization'];
        const refreshToken = res.headers['refresh'];

        console.log(accessToken);
        console.log(refreshToken);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  // const handleGetToken = async () => {
  //   const { token_type, access_token, expires_in, refresh_token, refresh_token_expires_in } = await getToken();

  //   localStorage.setItem('access_token', access_token);
  //   localStorage.setItem('refresh', refresh_token);
  // };

  // router.push('/');
  return <>callback</>;
}
