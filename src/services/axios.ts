import axios from 'axios';

axios.defaults.withCredentials = true;
const REQUEST_URL = 'https://yumu-back.shop';

export const instance = axios.create({
  baseURL: REQUEST_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export const authInstance = axios.create({
  baseURL: REQUEST_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: typeof window !== 'undefined' ? `Bearer ${sessionStorage.getItem('accessToken')}` : '',
  },
});

// image 업로드 시 사용하는 instance
export const authInstanceWithMedia = axios.create({
  baseURL: REQUEST_URL,
  headers: {
    'Content-Type': 'multipart/form-data;',
    Authorization: typeof window !== 'undefined' ? `Bearer ${sessionStorage.getItem('accessToken')}` : '',
  },
});
export default function saveTokensLocally() {
  const accessToken = sessionStorage.getItem('accessToken');
  authInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  authInstanceWithMedia.defaults.headers.Authorization = `Bearer ${accessToken}`;
}
