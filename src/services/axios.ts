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

// 그 뭐냐 경매글 등록할 때 쓸 에이시오스 그거 이름 알아서 정해라 미래의 나
// 폼 데이터로 수정하기!
export const authInstanceForRegist = axios.create({
  baseURL: 'http://43.200.219.117:8080/',
  headers: {
    'Content-Type': 'multipart/form-data;',
    Authorization: typeof window !== 'undefined' && `Bearer ${localStorage.getItem('accessToken')}`,
    Refresh: typeof window !== 'undefined' ? `${localStorage.getItem('refreshToken')}` : '',
  },
});
