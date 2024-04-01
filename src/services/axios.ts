import axios from 'axios';

const REQUEST_URL = 'http://43.200.219.117:8080/';

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
    Refresh: typeof window !== 'undefined' ? `${sessionStorage.getItem('refreshToken')}` : '',
  },
});

// image 업로드 시 사용하는 instance
export const authInstanceWithMedia = axios.create({
  baseURL: REQUEST_URL,
  headers: {
    'Content-Type': 'multipart/form-data;',
    Authorization: typeof window !== 'undefined' ? `Bearer ${sessionStorage.getItem('accessToken')}` : '',
    Refresh: typeof window !== 'undefined' ? `${sessionStorage.getItem('refreshToken')}` : '',
  },
});
export default function saveTokensLocally() {
  const accessToken = sessionStorage.getItem('accessToken');
  const refreshToken = sessionStorage.getItem('refreshToken');
  authInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  authInstance.defaults.headers.Refresh = refreshToken;
  authInstanceWithMedia.defaults.headers.Authorization = `Bearer ${accessToken}`;
  authInstanceWithMedia.defaults.headers.Refresh = refreshToken;
}
