// import { useEffect } from 'react';
// import axios from 'axios';
// import { getToken } from '@/services/api';
// import { useRouter } from 'next/router';

export default function callback() {
  return <>callback</>;
}
// const router = useRouter();
// useEffect(() => {
//   const search = new URLSearchParams(window.location.search);
//   const code = search.get('code');

//   if (code) {
//     handleGetToken();
//   }
// }, []);

// const handleGetToken = async () => {
//   const { token_type, access_token, expires_in, refresh_token, refresh_token_expires_in } = await getToken();

//   localStorage.setItem('access_token', access_token);
//   localStorage.setItem('refresh', refresh_token);
// };

// router.push('/');
