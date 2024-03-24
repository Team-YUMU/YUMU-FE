import {
  RegistrationProps,
  UserInfoProps,
  AuctionCheckProps,
  PostAuthLoginProps,
  PostAuthSignUpProps,
  PutUserProps,
} from '@/types/types';
import { authInstance as authAxios, instance as axios } from './axios';
const BASE_URL = `/api/v1`;
const MY_PAGE_BASE_URL = `${BASE_URL}/mypage`;
const MY_PAGE_MEMBERS_URL = `${BASE_URL}/member`;
const AUCTION_BASE_URL = `${BASE_URL}/auction`;

// signIn-page API (로그인)
export async function postAuthLogin(loginData: PostAuthLoginProps) {
  const res = await axios.post(`${BASE_URL}/auth/login`, loginData);
  const accessToken = res.headers['authorization'];
  const refreshToken = res.headers['refresh'];
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('refreshToken', refreshToken);
  try {
    res.data;
  } catch (error) {
    console.log(error);
  }
}

// SNS signIn API (SNS 로그인)
export function KakaoUsers() {
  const res = `${BASE_URL}/auth/kakao/callback`;
  return res;
}

// signUp-page API (회원가입)
export async function postUsers(signUpData: PostAuthSignUpProps) {
  const res = await axios.post<UserInfoProps>(`${BASE_URL}/auth/signup`, signUpData);
  return res.data;
}

// Logout API (로그아웃)
export async function postAuthLogout() {
  const res = await authAxios.post<UserInfoProps>(`${BASE_URL}/auth/logout`);
  return res.data;
}

// my-page put API (회원 정보 수정)
export async function putMemberInfo(userInfo: PutUserProps) {
  const res = await authAxios.put<string>(`${MY_PAGE_MEMBERS_URL}`, userInfo);
  return res;
}
// my-page get API (내정보 조회)
export async function getMemberInfo() {
  const res = await authAxios.get(`${MY_PAGE_MEMBERS_URL}`);
  return res.data;
}

// 내 작품 조회
export async function getArts() {
  const res = await authAxios.get(`${MY_PAGE_BASE_URL}/arts`);
  return res.data;
}

// 판매내역 조회
export async function getSalesHistory() {
  const res = await authAxios.get(`${MY_PAGE_BASE_URL}/sold`);
  return res.data;
}
// 구매내역 조회
export async function getBuyHistory() {
  const res = await authAxios.get(`${MY_PAGE_BASE_URL}/buy`);
  return res.data;
}
// 관심목록 조회
export async function getWishHistory() {
  const res = await authAxios.get(`${MY_PAGE_BASE_URL}/wish`);
  return res.data;
}

// auction post API (경매글 등록)
export async function postAuction(auctionRegister: RegistrationProps) {
  const res = await authAxios.post(`${AUCTION_BASE_URL}`, auctionRegister);
  return res.data;
}

// auction Delete API (경매글 삭제)
export async function deleteAuction(auctionId: number) {
  const res = await authAxios.delete(`${AUCTION_BASE_URL}/${auctionId}`);
  return res.status;
}

// auction put API (경매글 수정)
export async function putAuction(auctionId: number, auctionRegister: RegistrationProps) {
  const res = await authAxios.put(`${AUCTION_BASE_URL}/${auctionId}`, auctionRegister);
  return res.data;
}

// auction get auctionNewData API (경매 조회(최신순))
export async function getAuctionHistory({ keyword, size, page }: AuctionCheckProps) {
  const res = await axios.get(`${AUCTION_BASE_URL}/paging?page=${page}&size=${size}&sort=latest&keyword=${keyword}`);
  return res.data;
}

// auction get auctionPopularData API (인기 경매 조회)
export async function getPopularAuction({ keyword, size, page }: AuctionCheckProps) {
  const res = await axios.get(`${AUCTION_BASE_URL}/paging?page=${page}&size=${size}&sort=popular&keyword=${keyword}`);
  return res.data;
}

// auction get auctionSearchData API (경매글 검색)
export async function getSearchAuction({ keyword, size, page }: AuctionCheckProps) {
  const res = await axios.get(`${AUCTION_BASE_URL}/paging?page=${page}&size=${size}&sort=&keyword="${keyword}"`);
  return res.data;
}

// auction get liveAuctionData API (라이브 경매 조회)
export async function getLiveAuction({ keyword, size, page }: AuctionCheckProps) {
  const res = await axios.get(`${AUCTION_BASE_URL}/paging?page=${page}&size=${size}&sort=live&keyword=${keyword}`);
  return res.data;
}

// auction get auctionDetails API (경매글 상세)
export async function getAuctionDetails(auctionId: number) {
  const res = await axios.get(`${AUCTION_BASE_URL}/${auctionId}`);
  return res.data;
}

// auction post wishAuction API (경매글 찜)
export async function postWishAuction(auctionId: number) {
  const res = await authAxios.post(`${AUCTION_BASE_URL}/wish/${auctionId}`);
  return res.data;
}

// auction get liveAuction API (라이브 경매)
export async function getLiveAuctionList() {
  const res = await authAxios.get(`${AUCTION_BASE_URL}/live`);
  return res.data;
}
