import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const showCookies = (name: string) => {
  return cookies.get(name);
};

const refreshToken = showCookies('refreshToken');

export const instance = axios.create({
  baseURL: 'http://43.200.219.117:8080/',
});

export const authInstance = axios.create({
  baseURL: 'http://43.200.219.117:8080/',
  headers: {
    Authorization: refreshToken ? `${refreshToken}` : '',
  },
});

// image 업로드 시 사용하는 instance
export const authInstanceWithMedia = axios.create({
  baseURL: 'http://43.200.219.117:8080/',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: refreshToken ? `${refreshToken}` : '',
  },
});
