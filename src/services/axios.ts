import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://43.200.219.117:8080/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export const authInstance = axios.create({
  baseURL: 'http://43.200.219.117:8080/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: typeof window !== 'undefined' ? `Bearer ${sessionStorage.getItem('accessToken')}` : '',
    Refresh: typeof window !== 'undefined' ? `${sessionStorage.getItem('refreshToken')}` : '',
  },
});

// image 업로드 시 사용하는 instance
export const authInstanceWithMedia = axios.create({
  baseURL: 'http://43.200.219.117:8080/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: typeof window !== 'undefined' ? `Bearer ${sessionStorage.getItem('accessToken')}` : '',
    Refresh: typeof window !== 'undefined' ? `${sessionStorage.getItem('refreshToken')}` : '',
  },
});

// 경매글 등록
export const authInstanceForRegist = axios.create({
  baseURL: 'http://43.200.219.117:8080/',
  headers: {
    'Content-Type': 'multipart/form-data;',
    Authorization: typeof window !== 'undefined' ? `Bearer ${sessionStorage.getItem('accessToken')}` : '',
    Refresh: typeof window !== 'undefined' ? `${sessionStorage.getItem('refreshToken')}` : '',
  },
});
