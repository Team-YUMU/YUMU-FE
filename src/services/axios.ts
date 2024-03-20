import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://43.200.219.117:8080/',
});

export const authInstance = axios.create({
  baseURL: 'http://43.200.219.117:8080/',
  headers: {
    Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('accessToken')}` : '',
  },
});

// image 업로드 시 사용하는 instance
export const authInstanceWithMedia = axios.create({
  baseURL: 'http://43.200.219.117:8080/',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('accessToken')}` : '',
  },
});
